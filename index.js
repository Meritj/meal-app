const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input"); // on recup l'input
let meals = [];


// le fetch
async function fetchMeals(search) {
    await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + search)
        .then((res) => res.json())
        .then((data) => (meals = data.meals));
    console.log(meals)
}

// afficher
function mealsDisplay() {

    if (meals === null) {
        result.innerHTML = ` <h2> Aucun résultat </h2> `
    } else {
        meals.length = 12; // ici on limite le nombre de plats à 12.

        result.innerHTML = meals.map(
            (meal) => { // si ont mes des acolades dans un map, il faut écrire un return, grâce à eux on peut mettre une logique
                let ingredients = [];
                for (i = 1; i < 21; i++){
                   if (meal[`strIngredient${i}`]){ // ici on va tester les strIngredients (true de base)
                    let ingredient = meal[`strIngredient${i}`];
                    let measure = meal[`strMeasure${i}`];

                    ingredients.push("<li>"+ ingredient + " - " + measure + "</li>");
                   }
               }

                return `
        <li class="card">
        <h2>${meal.strMeal}</h2>
        <p>${meal.strArea}</p>
        <img src=${meal.strMealThumb} alt=" photo ${meal.strMeal}">
        <ul>${ingredients.join("")}</ul>
        </li>
        `
            }
        ).join("");
    }
}

//event listener

input.addEventListener("input", (e) => {
    fetchMeals(e.target.value);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    mealsDisplay();
});


