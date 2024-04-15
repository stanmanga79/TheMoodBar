// Erase stored age from local storage
const eraseAge =document.getElementById('eraseAge');
eraseAge.addEventListener('click', function(){
    localStorage.removeItem('storedAge');
    location.reload();
    window.location.href = 'index.html';
});

//// CocktailDB API MANIPULATION////
let spiritInput = localStorage.getItem('userSpirit');

function spiritParameter(){
   
   //sets spirit category as blank, to be altered by user input 
    let spiritCategory = ''

    //TODO: collect user input
   
    
  // Here the user's chosen input is assigned to a Spirit 
  //We be adding this new value to the end of the URL in our ajax API call
  //TODO: We need to look at our options for spirits in the API and assign them accordingly
    if (spiritInput === 'gin') {
        spiritCategory = 'Gin'
} else if (spiritInput === 'rum') {
        spiritCategory = 'light_rum'
}  else if (spiritInput === 'vodka'){
        spiritCategory = 'Vodka'
} else if (spiritInput === 'tequila') {
        spiritCategory = 'Tequila'
}

//returns spiritCategory as output of function so we can use it later in the ajax api call
return spiritCategory
};

///assigns an ingredient based on the user's chosen mood
let moodInput = localStorage.getItem('userMood');

function ingredientParameter(){
    // sets category as blank
    let ingredientCategory = ''
  


    if (moodInput === 'Happy') {
        ingredientCategory = 'orange_juice'
    } else if (moodInput === 'Sad') {
        ingredientCategory = 'triple_sec'
    } else if (moodInput === 'Angry') {
        ingredientCategory = 'lemon_juice'
    } else if (moodInput === 'Exhausted') {
        let exhaustedArray = ['coca-cola', 'grenadine','powdered_sugar'] 
        let randomIndex = Math.floor(Math.random() * exhaustedArray.length)
        ingredientCategory = exhaustedArray[randomIndex]
    } else if (moodInput === 'In Love') {
        ingredientCategory = 'lime_juice'
    }
    return ingredientCategory
};
    
    //OLD CODE FOR FOR RANDOMIZED INGREDIENTS (FAILED)
    // let chosenIngredientArray;
    
    // //TODO: Collect user's input
    // //TODO: Look over ingredients available in the API and make decisoons on what to leverage. We will have to be careful to format the new value correctly for the URL
    // let moodInput = 'In Love'

//     let happyArray = ['lemon_juice','sweet_vermouth','grenadine']
//     let sadArray = ['lime_juice','angostura_bitters','mint'] 
//     let angryArray = ['Triple_Sec','orange_peel','lime',]
//     let exhaustedArray = ['sugar','orange_bitters','lemon']
//     let loveArray = ['orange_juice','cherry','sugar_cube']


//     if (moodInput === 'Happy') {
//        let randomIndex = Math.floor(Math.random() * happyArray.length)
//        chosenIngredientArray = happyArray[randomIndex]
//     } else if (moodInput === 'Sad') {
//         let randomIndex = Math.floor(Math.random() * sadArray.length)
//        chosenIngredientArray = sadArray[randomIndex]
//     } else if (moodInput === 'Angry') {
//         let randomIndex = Math.floor(Math.random() * angryArray.length )
//        chosenIngredientArray = angryArray[randomIndex]
//     } else if (moodInput === 'Exhausted') {
//         let randomIndex = Math.floor(Math.random() * exhaustedArray.length)
//         chosenIngredientArray = exhaustedArray[randomIndex]
//     } else if (moodInput === 'In Love') {
//         let randomIndex = Math.floor(Math.random() * loveArray.length)
//         chosenIngredientArray = loveArray[randomIndex]
//     }
    
//     return chosenIngredientArray     
// };


// Sets spiritCategory as the output of the spiritParameter function does likewise for the ingredientCategory ... or at least it should??
let chosenSpirit = spiritParameter();

function chooseRandomCocktailOne () {
    let chosenIngredient = ingredientParameter();
    ingredientParameter();
    fetch ('https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=' + chosenSpirit + ',' +  chosenIngredient)
    .then(response => {
        return response.json();
    })

    
    .then(result =>{
            let randomDrink = Math.floor(Math.random() * result.drinks.length);
                // sets drinkId as the id of the randomly chosen drink
                let drinkId = result.drinks[randomDrink].idDrink
                //just logs the name of the drink
                console.log(result.drinks[randomDrink].strDrink)
                //passes the Id of the chosen drink to the DrinkDetails function
                getDrinkDetails(drinkId);
                return drinkId
    })
}
    function getDrinkDetails(drinkId){
        fetch('https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + drinkId,)
        .then(response => {
            return response.json();
        })
        .then(result=> {
                        
            // let drinkName = (result.drinks[randomDrink].strDrink);
            // let drinkItructions = (result.drinks[randomDrink].strDrink)
            // let drinkIng1 = (result.drinks[0].strIngredient1)
            // let drinkIng2 = (result.drinks[0].strIngredient1)
            // let drinkIng3 = (result.drinks[0].strIngredient3)
            // let drinkIng4 = (result.drinks[0].strIngredient4)

                        console.log(result.drinks[0].strInstructions)
                        console.log(result.drinks[0].strIngredient1)
                        console.log(result.drinks[0].strIngredient2)
                        console.log(result.drinks[0].strIngredient3)
                        console.log(result.drinks[0].strIngredient4)

        // TODO: review the HTML to let it appear
        // const drinkInfoHTML = `
        //         <H2>${drinkName}</H2> 
        //         <p>${drinkInstructions}</p>
        //         <ul>
        //             <li>${drinkIng1}</li>
        //             <li>${drinkIng2}</li>
        //             <li>${drinkIng3}</li>
        //             <li>${drinkIng4}</li>
        //         </ul>`;
        // const drinkInfoElement = document.getElementById('drinkInfoHTML');
        // drinkInfoElement.innerHTML = drinkInfoHTML;
        })
    }


    //ATTEMPT AT AJAX INSTEAD OF FETCH (FAILED)
// function chooseRandomDrink(){
//     $.ajax({
//     method: 'GET',
//     url: 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=' + spiritCategory + ',' +  ingredientCategory,
//     success: function(result) {
//     // drink randomizer
//     let randomDrink = Math.floor(Math.random() * result.drinks.length);
//         // sets drinkId as the id of the randomly chosen drink
//         //TODO: update this code to randomly pick a drink from the array, rather than hard coding a specific one like i've done here
//         let drinkId = result.drinks[randomDrink].idDrink
//         //just logs the name of the drink
//         console.log(result.drinks[randomDrink].strDrink)
//         //passes the Id of the chosen drink to the DrinkDetails function
//         getDrinkDetails(drinkId)
//     },
//     error: function ajaxError(jqXHR) {
//         console.error('Error: ', jqXHR.responseText);
//     }
// });

// // }
// /// Study Promises in AJAX functions
// function getDrinkDetails(drinkId){
//     $.ajax({
//         method:' GET',
//         url: 'https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + drinkId,

//         success: function(result){
//             ///Display function goes here
//             console.log(result.drinks[0].strDrink)
//             console.log(result.drinks[0].strInstructions)
//             console.log(result.drinks[0].strIngredient1)
//             console.log(result.drinks[0].strIngredient2)
//             console.log(result.drinks[0].strIngredient3)
//             console.log(result.drinks[0].strIngredient4)
//         }
//     })

// }















/////////QUOTE API//////////////

// Decides what category the quote will be from based on which emotion
//is chosen on index.htmml 

function quoteParameter(){
    //sets category as blank and then alters it based on user input
   
   //sets category as blank
    let quoteCategory = ''
    //collcets chosen mood from index.html dropdown

    // let moodInput = document.getElementById('userMood').value;
    //TODO: Change this to the user input either my element Value or via local storage
    let moodInput = localStorage.getItem('userInput');
    // Here I have chosen various categories of quotes from the API and assigned them to our different moods
    //TODO: Look through available moods with group for final decisions on category assignment 
    // Happy = happiness, Sad = happiness, Angry=anger, Exhausted=future, In Love=love
    if (moodInput === 'Happy') {
        quoteCategory = 'happiness'
} else if (moodInput === 'Sad') {
    quoteCategory = 'inspirational'
} else if (moodInput === 'Angry') {
    quoteCategory = 'anger'
} else if (moodInput === 'Exhausted'){
    quoteCategory = 'success'
} else if (moodInput === 'In Love') {
    quoteCategory = 'love'
}

//returns quoteCategory as output so we can use it later in the ajax api call
return quoteCategory
}

// Sets quoteCategory as the output of the quoteParameter function... or at least it should??

// ajax api call to pull a quote from the api based on category
//TODO// 
//STYLE TEAM: create an HTML element to display the quote on the page.
//STYLE TEAM: add "bartender's advice" button to drinks.html
//CODE TEAM: event listener for quote button aaand a function that will display the quote on the page.. some kind of appendChild thing??


function fetchAndDisplayQuote() {
    let quoteCategory = quoteParameter(); // Ensure this is the updated category each time

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + encodeURIComponent(quoteCategory),
        headers: { 'X-Api-Key': 'lbuDF/d/4FN0Qtt3UdYKZw==0Y6n8GL3b39NEA5m'},
        contentType: 'application/json',
        success: function(result) {
            if (result && result.length > 0) {
                const adviceContent = document.querySelector(".advice-content");
                if (adviceContent) {
                    adviceContent.textContent = result[0].author + ' once said: "' + result[0].quote + '"';
                    adviceContent.style.display = "none"; // Hide the content initially
                }
            } else {
                console.log("No quotes found for this category.");
            }
        },
        error: function ajaxError(jqXHR) {
            console.error('Error :', jqXHR.responseText);
            const adviceContent = document.querySelector(".advice-content");
            if (adviceContent) {
                adviceContent.textContent = "Failed to load quote.";
            }
        }
    });
}

// Call this function when needed, e.g., after a user action or on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayQuote();
});


//bartnder image randomizer
const bartender = document.querySelector('.theBartender');

function bartenderRandomizer() {
    const bartenderImages = [
        './assets/images/Alex.png',
        './assets/images/Clarissa.png',
        './assets/images/Devon.png',
        './assets/images/Eddie.png',
        './assets/images/Roger.png'];

    let randomIndex = Math.floor(Math.random() * bartenderImages.length);
    return bartenderImages[randomIndex];
}

const RandomBartender = bartenderRandomizer();


