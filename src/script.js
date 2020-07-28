// helper functions
function qs(selector){
    return document.querySelector(selector)
}

function ce(element){
    return document.createElement(element)
}

// variables
const p = qs("p")
const signin = qs("u#signin")
const signinForm = qs("form#signin-form")

const signinBtn = qs("input#signin-btn")

const mainBodyDiv = qs("div.main-body")
const profileInfo = ce("p")
const userRecipes = ce("p")
const underline = ce("u")


let signinboolean = false;

// signin button toggle
signin.addEventListener("click", ()=>{
    console.log("signin toggle clicked")
    signinboolean = !signinboolean;
    if (signinboolean) {
        signinForm.style.display="block"
    } else {
        signinForm.style.display="none"
    }
})

// signing into page takes to you user profile
signinBtn.addEventListener("click", ()=>{
    event.preventDefault()
    console.log("signin submited")

    mainBodyDiv.innerHTML=""

    profileInfo.innerText= "username: mlk1000"
    userRecipes.innerText = "My Recipes"

    underline.append(userRecipes)
    mainBodyDiv.append(profileInfo,underline)
})

userRecipes.addEventListener("click", ()=>{
    console.log("recipes link clicked")
    mainBodyDiv.innerHTML=""

    fetch('http://localhost:3000/api/v1/users') //change request so it goes to users and then takes the users recipes
    .then(res => res.json())
    .then(data => data.forEach(user => user.recipes.forEach(recipe => addRecipe(recipe))))
})

// function showRecipes(recipes){
//     recipes.forEach(recipe => addRecipe(recipe))
// }

function addRecipe(recipe){
    const recipeTitle = ce("h2")
    const recipeAbt = ce("h3")
    const recipeRI = ce("p")
    
    recipeTitle.innerText = recipe.title
    recipeAbt.innerText = recipe.abt 

    mainBodyDiv.append(recipeTitle, recipeAbt)

}


