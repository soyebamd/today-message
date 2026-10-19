// hide the form .fact-form

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

console.log(factMessge(1947));

const myArray = [1, 2, 3, 4, 5, 6, 7];

const addNewNum = [...myArray, 8, 9];

console.log(addNewNum);

const [first, sec] = myArray;

console.log(sec);

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

console.log(Book.allInfo());
