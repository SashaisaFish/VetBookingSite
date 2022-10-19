import {cat, dog, largeCat, reptile, bird, smallAnimal} from './petData'

// QQ CONSTANTS

const calendar = document.getElementById("calendar-container");
const form = document.getElementById("your-pet");

// create x button with x-button id
const xButton = document.createElement("button");
xButton.setAttribute("class", "x-button");

// QQ EVENT LISTENER

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const date = data.get("ap-date");
  const dd = `${date[8]}${date[9]}`;

  createSlot(dd);
});

// QQ MAIN FUNCTIONS

createDays(31);

function createDays(monthlength) {
  for (let i = 1; i <= monthlength; i++) {
    // create day element
    const day = document.createElement("div");
    day.setAttribute("id", `day-${i < 10 ? `0${i}` : i}`);
    day.classList.add("day", "mali", "border-thin", "entry");
    // create number element
    const num = document.createElement("p");
    num.classList.add("number");
    num.innerText = i;
    // append
    day.append(num);
    calendar.append(day);
  }
}

function createSlot(dd) {
  const data = new FormData(form);

  // get data from form
  const petName = data.get("pet-name");
  const apTime = data.get("ap-time");
  const petId = data.get("pet-id");
  const petSpecies = data.get("species");

  const dayDD = document.getElementById(`day-${dd}`);

  // create elements
  const bookedSlot = document.createElement("div");
  const petNameText = document.createElement("p");
  const timeText = document.createElement("p");
  const petDetailsDiv = document.createElement("div");
  const petIdText = document.createElement("p");
  const petSpeciesText = document.createElement("p");

  // set attribute IDs
  petDetailsDiv.setAttribute("class", `details-${petId}-${petSpecies}`);
  bookedSlot.setAttribute("onclick", "openSlot(this)");

  // set classes
  bookedSlot.classList.add(
    "booked-slot",
    "mali",
    "border-thin",
    "dark",
    "light-font"
  );
  petDetailsDiv.classList.add("details", "hidden");

  // give inner text
  petNameText.innerText = petName;
  timeText.innerText = apTime;
  petIdText.innerText = `ID: ${petId}`;
  petSpeciesText.innerText = petSpecies;

  // append
  dayDD.append(bookedSlot);
  bookedSlot.append(petNameText, timeText, petDetailsDiv);
  petDetailsDiv.append(petIdText, petSpeciesText);

  // get image source and price from object based on id and species
  getInfo(petSpecies, petId);
}

function getInfo(petSpecies, petId) {
  // get correct array based on petSpecies
  if (petSpecies === "cat") {
    species = cat;
  } else if (petSpecies === "dog") {
    species = dog;
  } else if (petSpecies === "reptile") {
    species = reptile;
  } else if (petSpecies === "bird") {
    species = bird;
  } else if (petSpecies === "largeCat") {
    species = largeCat;
  } else if (petSpecies === "smallAnimal") {
    species = smallAnimal;
  }

  // find correct object (petid in correct array)
  const pet = species.find(({ ID }) => ID === petId);
  const price = pet.Price;
  const image = pet.Image;

  // create price element
  const priceText = document.createElement("p");
  priceText.innerText = price;

  // create image element
  const petImage = document.createElement("img");
  setupImage(petImage, image, petSpecies);

  // find details div and append
  const petDetailsDiv = document.querySelector(
    `.details-${petId}-${petSpecies}`
  );
  petDetailsDiv.append(priceText, petImage);
}

function openSlot(element) {
  // get elements
  const petDetailsDiv = element.querySelector(":scope > div");
  // toggle classes
  element.classList.toggle("booked-slot-big");
  petDetailsDiv.classList.toggle("hidden");
}

// QQ HELPER FUNCTIONS

function setupImage(imgElem, url, alt) {
  imgElem.src = url;
  imgElem.setAttribute("alt", alt);
}
