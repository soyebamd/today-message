import { useState } from "react";
import "./style.css";

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

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [formStatus, setFormStatus] = useState(false);

  return (
    <>
      <Header formStatus={formStatus} setFormStatus={setFormStatus} />
      {formStatus && <FormFact />}
      <main className="main">
        <Aside />
        <FactList />
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

function FormFact() {
  const [shareFact, UpdateShareFact] = useState("");
  const [source, UpdateSource] = useState("");
  const [cat, catUpdate] = useState("");
  function formSubmit(e) {
    e.preventDefault();
    console.log(shareFact, source, cat);
    console.log(e);

    //validation
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
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function Aside() {
  const [count, setCount] = useState(0);
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>

        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCount(count + 1)}
          >
            {count} - Increase count
          </button>
        </li>

        {categories.map((cat) => (
          <AsideCategories key={cat.name} cat={cat} />
        ))}
      </ul>
    </aside>
  );
}

function FactList() {
  return (
    <section>
      <ul className="facts-list">
        {initialFacts.map((fact) => (
          <Fact key={fact.id} factObj={fact} />
        ))}
      </ul>
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
            (cat) => cat.name === factObj.category,
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

function AsideCategories({ cat }) {
  return (
    <li className="category" key={cat.name}>
      <button
        className="btn btn-category"
        style={{ backgroundColor: cat.color }}
      >
        {cat.name}
      </button>
    </li>
  );
}

export default App;
