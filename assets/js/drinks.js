// For Happy Face
for (let i = 0; i <= 75; i++) {
  let happyFace = document.createElement("div");
  happyFace.classList.add("happy");
  let size = Math.random() * 15;
  happyFace.style.fontSize = 3 + size + "px";
  happyFace.style.right = Math.random() * +innerWidth + "px";
  happyFace.style.top = Math.random() * +innerHeight + "px";
  document.querySelector(".background-faces").appendChild(happyFace);
}

function animateHappy() {
  let allHappy = document.querySelectorAll(".happy");
  let num = Math.floor(Math.random() * allHappy.length);
  allHappy[num].classList.toggle("animate");
}

// For Sad Face
for (let i = 0; i <= 75; i++) {
  let sadFace = document.createElement("div");
  sadFace.classList.add("sad");
  let size = Math.random() * 15;
  sadFace.style.fontSize = 3 + size + "px";
  sadFace.style.right = Math.random() * +innerWidth + "px";
  sadFace.style.top = Math.random() * +innerHeight + "px";
  document.querySelector(".background-faces").appendChild(sadFace);
}

function animateSad() {
  let allSad = document.querySelectorAll(".sad");
  let num2 = Math.floor(Math.random() * allSad.length);
  allSad[num2].classList.toggle("animate");
}

// For Angry Face
for (let i = 0; i <= 75; i++) {
  let angryFace = document.createElement("div");
  angryFace.classList.add("angry");
  let size = Math.random() * 15;
  angryFace.style.fontSize = 3 + size + "px";
  angryFace.style.right = Math.random() * +innerWidth + "px";
  angryFace.style.top = Math.random() * +innerHeight + "px";
  document.querySelector(".background-faces").appendChild(angryFace);
}

function animateAngry() {
  let allAngry = document.querySelectorAll(".angry");
  let num3 = Math.floor(Math.random() * allAngry.length);
  allAngry[num3].classList.toggle("animate");
}

// For Exhausted Face
for (let i = 0; i <= 75; i++) {
  let exhaustedFace = document.createElement("div");
  exhaustedFace.classList.add("exhausted");
  let size = Math.random() * 15;
  exhaustedFace.style.fontSize = 3 + size + "px";
  exhaustedFace.style.right = Math.random() * +innerWidth + "px";
  exhaustedFace.style.top = Math.random() * +innerHeight + "px";
  document.querySelector(".background-faces").appendChild(exhaustedFace);
}

function animateExhausted() {
  let allExhausted = document.querySelectorAll(".exhausted");
  let num = Math.floor(Math.random() * allExhausted.length);
  allExhausted[num].classList.toggle("animate");
}

// For In Love Face
for (let i = 0; i <= 75; i++) {
  let inLoveFace = document.createElement("div");
  inLoveFace.classList.add("inLove");
  let size = Math.random() * 15;
  inLoveFace.style.fontSize = 3 + size + "px";
  inLoveFace.style.right = Math.random() * +innerWidth + "px";
  inLoveFace.style.top = Math.random() * +innerHeight + "px";
  document.querySelector(".background-faces").appendChild(inLoveFace);
}

function animateInLove() {
  let allInLove = document.querySelectorAll(".inLove");
  let num = Math.floor(Math.random() * allInLove.length);
  allInLove[num].classList.toggle("animate");
}

// Variable for current interval
let currentInterval;

// Clear the current interval to prevent multiple intervals
function clearCurrentInterval() {
  if (currentInterval) {
    clearInterval(currentInterval);
  }
}

// const moodSelection = document.querySelector('.background-faces');---- intervals within if/elseIf will cause animation to activate
const cardMood = document.querySelector(".cardMood");
const optionMood = document.querySelector(".optionEmotion");

function switchMood(mood) {
  localStorage.setItem("userMood", mood); // will select the mood from local storage
  // when functions pulls mood from local storage, it'll change the way its stored, i.e. "inLove = In Love"
  if (mood === "Happy") {
    setInterval(animateHappy, 50);
    // moodSelection.className = 'cardHappy';  ---intervals will activate background.
  } else if (mood === "Sad") {
    // moodSelection.className = 'cardSad';
    setInterval(animateSad, 50);
  } else if (mood === "Angry") {
    // moodSelection.className = 'cardAngry';
    setInterval(animateAngry, 50);
     } else if (mood === "Exhausted") {
    // moodSelection.className = 'cardExhausted';
    setInterval(animateExhausted, 50);
  } else if (mood === "In Love") {
    // moodSelection.className = 'cardInLove';
    setInterval(animateInLove, 50);
  }
}

// Call switchMood with the mood from local storage
switchMood(localStorage.getItem("userMood"));

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve stored inputs
  if (userMood && userSpirit) {
    // Fetch drink data and display card
    chooseRandomCocktail(userSpirit, userMood);
  } else {
    console.error("No mood or spirit data found.");
  }
});

//// CocktailDB API MANIPULATION////

let userMood = localStorage.getItem("userMood");
let userSpirit = localStorage.getItem("userSpirit");

function spiritParameter() {
  let spiritCategory = "";

  if (userSpirit === "gin") {
    spiritCategory = "Gin";
  } else if (userSpirit === "rum") {
    spiritCategory = "light_rum";
  } else if (userSpirit === "vodka") {
    spiritCategory = "Vodka";
  } else if (userSpirit === "tequila") {
    spiritCategory = "Tequila";
  }

  //returns spiritCategory as output of function so we can use it later in the ajax api call
  return spiritCategory;
}

function ingredientParameter() {
  let ingredientCategory = "";

  if (userMood === "Happy") {
    ingredientCategory = "orange_juice";
  } else if (userMood === "Sad") {
    ingredientCategory = "triple_sec";
  } else if (userMood === "Angry") {
    ingredientCategory = "lemon_juice";
  } else if (userMood === "Exhausted") {
    let exhaustedArray = ["coca-cola", "grenadine", "powdered_sugar"];
    let randomIndex = Math.floor(Math.random() * exhaustedArray.length);
    ingredientCategory = exhaustedArray[randomIndex];
  } else if (userMood === "In Love") {
    ingredientCategory = "lime_juice";
  }
  return ingredientCategory;
}

let chosenSpirit = spiritParameter();
let chosenIngredient = ingredientParameter();

function chooseRandomCocktail() {
  ingredientParameter();
  fetch(
    "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" +
      chosenSpirit +
      "," +
      chosenIngredient
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      let randomDrink = Math.floor(Math.random() * result.drinks.length);
      // sets drinkId as the id of the randomly chosen drink
      let drinkId = result.drinks[randomDrink].idDrink;
      //passes the Id of the chosen drink to the DrinkDetails function
     
      getDrinkDetails(drinkId);
    });
}

function getDrinkDetails(drinkId) {
  fetch(
    "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + drinkId
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      displayDrink(result.drinks[0]);
    });
}

// Main Drink Card
const displayDrink = function (drink) {

  // Check if drink data is provided
  if (!drink) {
    console.error("No drink data provided.");
    return;
  }
  // Create mainCard variable and check if main card element is available
  const mainCard = document.querySelector(".mainCard");
  if (!mainCard) {
    console.error("Main card element not found.");
    return;
  }

  // Store the drink data in session storage
  sessionStorage.setItem("drink", JSON.stringify(drink));

  // Clears previous content
  mainCard.innerHTML = "";

  // Create card elements
  const card = document.createElement("div");
  card.className = "card m-3";

  // Create card body elements
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

   //   Background color based on mood
   switch (localStorage.getItem("userMood")) {
    case "Happy":
      card.classList.add("cardHappy");
      break;
    case "Sad":
      card.classList.add("cardSad");
      break;
    case "Angry":
      card.classList.add("cardAngry");
      break;
    case "Exhausted":
      card.classList.add("cardExhausted");
      break;
    case "In Love":
      card.classList.add("cardInLove");
      break;
    default:
      // Default background color
      card.style.backgroundColor = "#0d0d0d";
  }

  // Create wrapper for photo and advice content
  const adviceContentWrapper = document.createElement("div");
  adviceContentWrapper.className = "advice-content-wrapper";

  // Create bartender image
  const bartenderImage = document.createElement("img");
  bartenderImage.src = bartenderRandomizer();
  bartenderImage.alt = "Bartender";
  bartenderImage.className = "bartender-image";
  bartenderImage.style.display = "none"; // Initially hide the bartender image
  adviceContentWrapper.appendChild(bartenderImage); // Append bartender image to advice content wrapper

  // Create advice/quote content
  const adviceContent = document.createElement("div");
  adviceContent.className = "advice-content";
  adviceContent.style.display = "none"; // Initially hide the advice content
  adviceContentWrapper.appendChild(adviceContent); // Append advice content to advice content wrapper

  // Create advice button
  const adviceButton = document.createElement("button");
  adviceButton.className = "btn mt-1 adviceBtn";
  adviceButton.textContent = "Bartender's Advice";

  //Create wrapper for photo and title
  const photoTitleWrapper = document.createElement("div");
  photoTitleWrapper.className = "photoTitleWrapper";

  // Create photo element
  const photo = document.createElement("img");  
  photo.src = drink.strDrinkThumb || "./assets/images/placeholder.jpg"; // Fallback to a placeholder image
  photo.className = "card-img-top mt-3";
  photoTitleWrapper.appendChild(photo);// Append photo to photo to photo title wrapper

  // Create card title/drink name
  const cardTitle = document.createElement("h1");
  cardTitle.className = "card-title mt-3";
  cardTitle.textContent = drink.strDrink || "No drink name available";
  photoTitleWrapper.appendChild(cardTitle); // Append card title to photo title wrapper

  // Create wrapper for ingredients and how to
  const ingredientHowToWrapper = document.createElement("div");
  ingredientHowToWrapper.className = "ingredientHowToWrapper"; 

  // Create card ingredients element
  const cardIngredients = document.createElement("ul"); // Create <ul> element
  cardIngredients.className = "ingredients mt-4";

  // Create header for ingredients
  const header = document.createElement("h3");
  header.textContent = "Ingredients:";
  cardIngredients.appendChild(header);

  // Create a for loop for ingredients and make it a list with <li> element
  for (let i = 0; i <= 20; i++) {
    const ingredient = drink["strIngredient" + i];
    if (ingredient) {
      const listItem = document.createElement("li");
      listItem.textContent = ingredient;
      cardIngredients.appendChild(listItem);
    }
  }

  // If no ingredients are present, display a placeholder message
  if (cardIngredients.children.length === 0) {
    const invalidListItem = document.createElement("li");
    invalidListItem.textContent = "No ingredients available";
    cardIngredients.appendChild(invalidListItem);
  }

  ingredientHowToWrapper.appendChild(cardIngredients);// Append card ingredients to ingredient how to wrapper

  // Create card how to element
  const cardHowTo = document.createElement("p");
  cardHowTo.className = "how-to";
  cardHowTo.textContent = drink.strInstructions || "No instructions available";
  ingredientHowToWrapper.appendChild(cardHowTo); // Append card how to to ingredient how to wrapper

  // Create instruction header
  const instructionHeader = document.createElement("h3");
  instructionHeader.className = "instructionHeader mt-4";
  instructionHeader.textContent = "Instructions:";
  cardHowTo.prepend(instructionHeader);// Prepend instruction header to card how to

  // Add event listener to advice button
  adviceButton.addEventListener("click", function () {
    card.classList.toggle("open");

    // Toggle the visibility of the bartender image and the advice content
    bartenderImage.style.display =
      bartenderImage.style.display === "none" ? "block" : "none";
    adviceContent.style.display =
      adviceContent.style.display === "none" ? "block" : "none";
  });

  // Create favorites button
  const favoritesButton = document.createElement("button");
  favoritesButton.className = "favoriteBtn btn mt-1";
  favoritesButton.innerHTML = '<i class="fa-regular fa-olive"></i>';

  // Create favorites container for button
  const favoritesContainer = document.createElement("div");
  favoritesContainer.className = "favoritesContainer";
  favoritesContainer.appendChild(favoritesButton);

  favoritesButton.addEventListener("click", function () {
    let favorites = JSON.parse(localStorage.getItem("savedDrinks")) || [];
    let newDrink = JSON.parse(sessionStorage.getItem("drink"));
    let duplicate = false;
    favorites.forEach(drink => {
      if (drink.idDrink === newDrink.idDrink){
        duplicate = true;
        return;
    }}); 

    if (duplicate){
      return;
    } else if (!duplicate) {
      favorites.push(newDrink);
      localStorage.setItem("savedDrinks", JSON.stringify(favorites));
}});


  // Append elements to cardBody
  cardBody.appendChild(adviceContentWrapper);
  cardBody.appendChild(adviceButton);
  cardBody.appendChild(photoTitleWrapper);
  cardBody.appendChild(ingredientHowToWrapper);
  cardBody.appendChild(favoritesContainer);
  card.appendChild(cardBody);
  mainCard.appendChild(card);

  // Fetch a random quote after displaying the drink
  fetchAndDisplayQuote();
};