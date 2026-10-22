import { useEffect, useState } from "react";
import "./style.css";

import validator from "validator";

// supabase database connection - https://supabase.com/dashboard/project/ncwbioodaktvrvtdkgmp/integrations/data_api/docs
//https://ncwbioodaktvrvtdkgmp.supabase.co/rest/v1/
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// console.log(supabaseUrl);
// console.log(supabaseKey ? "API key loaded" : "API key missing");

const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  const [formStatus, setFormStatus] = useState(false);
  const [fact, newFact] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [isuploading, setIsUploading] = useState(false);

  //add loading state

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function ddata() {
      setLoading(true);

      let query = supabase.from("facts").select("*");

      if (filterCategory !== "all") {
        query = query.eq("category", filterCategory);
      }

      let { data: fact, error } = await query.order("created_at", {
        ascending: false,
      }); // the latest post should be first

      setLoading(false);

      if (!error) newFact(fact);
      else throw new Error("Error: ", error.message);

      //  newFact(fact);
    }

    ddata();
  }, [filterCategory]);

  return (
    <>
      <Header formStatus={formStatus} setFormStatus={setFormStatus} />
      {formStatus && (
        <FormFact
          addNewFact={newFact}
          resetForm={setFormStatus}
          setIsUploading={setIsUploading}
          isuploading={isuploading}
        />
      )}
      <main className="main">
        <Aside
          setFilterCategory={setFilterCategory}
          filterCategory={filterCategory}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <FactList FactListUpdated={fact} filterCategory={filterCategory} />
        )}
      </main>
    </>
  );
}

function Header({ formStatus, setFormStatus }) {
  return (
    <header className="header">
      <div className="logo">
        <img
          src="./logo.png"
          height="68"
          width="68"
          alt="Today I Learned Logo"
        />
        <h1>Today I Learned</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        id=""
        onClick={() => setFormStatus((prev) => !prev)}
      >
        {formStatus ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

function FormFact({ addNewFact, resetForm, isuploading, setIsUploading }) {
  const [shareFact, UpdateShareFact] = useState("");
  const [source, UpdateSource] = useState("");
  const [cat, catUpdate] = useState("");
  async function formSubmit(e) {
    e.preventDefault();
    console.log(shareFact, source, cat);

    //validation
    //  validator.isURL(source) &&
    if (
      shareFact &&
      validator.isURL(source) &&
      cat &&
      shareFact.length <= 200
    ) {
      console.log("Form sucess");

      // adding a new fact

      const newFact = {
        text: shareFact,
        source: source,
        category: cat.toLowerCase(),
      };

      setIsUploading(true);

      const { data: NewFact, error } = await supabase
        .from("facts")
        .insert(newFact)
        .select();

      console.log(NewFact);

      if (error) {
        console.error("error to insert", error);
      }

      // const { error } = supabase.from("facts").insert(newFact).select;
      // if (error) console.error(error);

      addNewFact((item) => [newFact, ...item]);

      setIsUploading(false);

      UpdateShareFact("");
      UpdateSource("");
      catUpdate("");
      resetForm(false);
    } else {
      console.log("please fill all data");
    }
  }
  return (
    <form className="fact-form" onSubmit={formSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        maxLength={200}
        value={shareFact}
        onChange={(e) => UpdateShareFact(e.target.value)}
      />
      <span>{200 - shareFact.length}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => UpdateSource(e.target.value)}
      />

      <select value={cat} onChange={(e) => catUpdate(e.target.value)}>
        <option value="">Choose category:</option>
        {categories.map((cat) => (
          <option key={cat.name} name={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isuploading}>
        Post
      </button>
    </form>
  );
}

function Aside({ setFilterCategory, filterCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setFilterCategory("all")}
          >
            All
          </button>
        </li>

        {categories.map((cat) => (
          <AsideCategories
            setFilterCategory={setFilterCategory}
            filterCategory={filterCategory}
            key={cat.name}
            cat={cat}

            // filterData={setFilterCategory(cat.name)}
          />
        ))}
      </ul>
    </aside>
  );
}

function FactList({ FactListUpdated, filterCategory }) {
  return (
    <section>
      <ul className="facts-list">
        {FactListUpdated.map((fact) => (
          <Fact key={fact.id} factObj={fact} />
        ))}
      </ul>
      <p>
        There is {FactListUpdated.length}{" "}
        {filterCategory && `in ${filterCategory} `}{" "}
        {FactListUpdated.length > 1 ? "categories" : "category"} fact. Add your
        own!{" "}
      </p>
    </section>
  );
}

function Fact({ factObj }) {
  // console.log(factObj);
  return (
    <li className="fact">
      <p>
        {factObj.text}
        <a
          className="source"
          href={factObj.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: categories.find(
            (cat) => cat.name.toUpperCase() === factObj.category.toUpperCase(),
          )?.color,
        }}
      >
        {factObj.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {factObj.votesInteresting}</button>
        <button>🤯 {factObj.votesMindblowing}</button>
        <button>⛔️ {factObj.votesFalse}</button>
      </div>
    </li>
  );
}

function AsideCategories({ cat, filterCategory, setFilterCategory }) {
  return (
    <li className="category" key={cat.name}>
      <button
        className="btn btn-category"
        style={{
          backgroundColor: cat.color,

          transform:
            filterCategory.toLowerCase() === cat.name.toLowerCase() &&
            "scale(110%) rotate(-2deg)",
        }}
        onClick={() => {
          setFilterCategory(cat.name);
        }}
      >
        {cat.name}
      </button>
    </li>
  );
}

function Loading() {
  return <h2>Loading...</h2>;
}

export default App;
