// hide the form .fact-form

const APIDatabaseUrl = "https://ncwbioodaktvrvtdkgmp.supabase.co/rest/v1/";

const factForm = document.querySelector(".fact-form");

factForm.classList.add("hidden");

const btn = document.querySelector(".btn-open");

btn.addEventListener("click", function () {
  if (factForm.classList.contains("hidden")) {
    this.innerText = "CLOSE";

    factForm.classList.remove("hidden");
  } else {
    factForm.classList.add("hidden");
    this.innerText = "Share a fact";
  }

  /* or

   console.log(factForm.classList.toggle("hidden"));
   */

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //   console.log(new Date().getFullYear());

  //   console.log(new Date().getMonth() + 1);

  //   console.log(new Date().getDate());

  //   console.log(new Date().getDay());

  //   console.log("Current Month: ", months[new Date().getMonth()]);

  //   console.log("Today: ", days[new Date().getDay()]);

  //console.log(new Date().getFullMonth());

  // change the button text

  // truthy and false values
});

// console.log(false == 0); // true
// console.log(false == null); // false
// console.log(false == ""); // true
// console.log(false == undefined); // false

// calculate age

// function calAge(year) {
//   const currentYear = new Date().getFullYear();
//   const age = currentYear - year;
//   const maxYear = 100;
//   const minYear = 0;
//   if (age >= minYear && age <= maxYear) return age;
//   else return `System not supported this age ${age} year`;
// }

// console.log(calAge(1980));

// vote counting

let votesIntersting = 0;
let votesMindlowing = 0;
let totalUpvoted = 0;
let voteFalse = 0;

const text = "some text";

/*
const factMessge =
  totalUpvoted > voteFalse
    ? "This is right fact!"
    : totalUpvoted == voteFalse
      ? "Both are true"
      : "Might be false check right source...";

console.log(factMessge);
*/

const currentYear = new Date().getFullYear();
const maxYear = 100;
const minYear = 0;

const factMessge = (year) =>
  currentYear - year >= minYear && currentYear - year <= maxYear
    ? currentYear - year
    : "System not supported this age ${age} year";

//console.log(factMessge(1947));

const myArray = [1, 2, 3, 4, 5, 6, 7];

const addNewNum = [...myArray, 8, 9];

//console.log(addNewNum);

const [first, sec] = myArray;

//console.log(sec);

// Object

const Book = {
  id: 1,
  title: "Atomic Habits",
  author: "James Clear",
  price: 15,
  genre: "Self-help",
  allInfo: function () {
    return `The book title is ${this.title}, Author ${this.author}, Price ${this.price}, Genre ${this.genre}`;
  },
};

Book.title = "The Atomic Habits";

//console.log(Book.allInfo());

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

// foreach loop
//console.log("categories: ");
categories.forEach(function (cat) {
  // console.log(cat);
});

//map
const testReturnwithMap = categories.map(function (wiw) {
  return wiw.name;
});

//console.log("width no map", testReturnwithMap);

//map
const arrowtestReturnwithMap = categories.map((wiw) => {
  return { name: wiw.name, color: wiw.color };
});

//console.log("width map", arrowtestReturnwithMap);

function age(age) {
  // return must in a function to work.
  if (age >= 18) {
    return "Adult";
  } else {
    return "Minor";
  }
}

// get data from api
async function getData() {
  try {
    const data = await fetch(
      "https://ncwbioodaktvrvtdkgmp.supabase.co/rest/v1/facts",
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jd2Jpb29kYWt0dnJ2dGRrZ21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzNzMxOTIsImV4cCI6MjEwNzk0OTE5Mn0.U-DtGiJAA_K3S6m0EmRTOZ0Pz2IKWI-cYynrCSi67nc",
        },
      },
    );

    if (!data.ok) {
      throw new Error(`HTTP Error: ${data.status}`);
    }

    const response = await data.json();

    // // filter data

    // const filteredData = response.filter((item) => item.category === "history");

    // if (filteredData) {
    //   return filteredData;
    // }

    return response;
  } catch (err) {
    console.error("Error displaying facts:", err);
  }
}

// find return first elements of the array
console.log([1, 2, 3, 4, 5, 6, 7, 8].find((item) => item <= 5));
// async function mm() {
//   const ss = await getData();

//   console.log(ss);
// }
printResult();
async function printResult() {
  const initialFacts = await getData();

  console.log(initialFacts);

  const factListContainer = document.querySelector(".facts-list");

  factListContainer.innerHTML = "";

  //console.log(categories.find((item) => item.name === "society").color);

  // add cynamic category button

  const addMemnu = initialFacts
    .filter((item, index) => {
      return (
        initialFacts.findIndex((fact) => fact.category === item.category) ===
        index
      );
    })
    .map((item) => {
      const getColor = categories.find((color) => color.name === item.category);

      return `<li class="category">
      <button
        class="btn btn-category"
        style="background-color:${getColor?.color ?? "gray"}"
      >
        ${item.category}
      </button>
    </li>`;
    })
    .join("");

  document
    .querySelector(".cate-container")
    .insertAdjacentHTML("beforeend", addMemnu);

  const contentHtml = initialFacts
    .map((item) => {
      const {
        text,
        source,
        category,
        votesInteresting,
        votesMindBlowing,
        votesFalse,
      } = item;

      {
        return `

  
  <li class="fact">
              <p>
               
              ${text}

                <a
                  class="source"
                  href="${source}"
                  target="_blank"
                  >(Source)</a
                >
              </p>

             
${(() => {
  const foundCategory = categories.find((item) => {
    return item.name === category;
  });

  return foundCategory
    ? `<span class="tag" style="background-color:${foundCategory.color}">
    ${category}
  </span>`
    : " ";
})()}
       <div class="vote-buttons">
                <button>👍 ${votesInteresting}</button>
                <button>🤯 ${votesMindBlowing}</button>
                <button>⛔️ ${votesFalse}</button>
              </div>
            </li>
            
            `;
      }
    })
    .join("");

  factListContainer.insertAdjacentHTML("afterbegin", contentHtml);
}
