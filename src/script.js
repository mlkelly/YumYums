// helper functions
function qs(selector){
    return document.querySelector(selector)
}

function ce(element){
    return document.createElement(element)
}

// variables
const signUpForm = qs("form#signup-form")

const p = qs("p")
const login = qs("u#login")
const loginForm = qs("form#login-form")

const loginHeaderToggle = qs("button#login-header-toggle")

const loginBtn = qs("input#login-btn")
const loginError = ce("p")

const headerDiv = qs("div.header")
const mainBodyDiv = qs("div.main-body")
const logoutBtn = ce("button")
const profileInfo = ce("p")
const profileInfo2 = ce("p")
const editProfileToggle = ce("button")
const editProfileForm = ce("form")
const deleteUserBtn = ce("button")
const editUsernameInput = ce("input")
const editBioInput = ce("input")
const editProfileSubmit = ce("input")
let current_user = {}
const userRecipes = ce("p")
const underline = ce("u")

const pageTitle = ce("h1")
const recipeBtnToggle = ce("button")
const recipeForm = ce("form")
const titleInput = ce("input")
const abtInput = ce("input")
const imgInput = ce("input")
const userInput = ce("input")
const createRecipeBtn = ce("button")
const noRecipeError = ce("p")
const br = ce("br")

const recipeCard = ce("div")
const recipeCardContainer = ce("div")
const recipeImg = ce("img")
const recipeTitle = ce("h2")
const recipeAbt = ce("h3")
const recipeMoreBtn = ce("button")
// const recipeRI = ce("p")

const recIngredList = ce("ul")

let loginBoolean = false
let newRecipeBoolean = false
let editProfileBoolean = false

// Sign Up fetch
signUpForm.addEventListener("submit", ()=>{
    event.preventDefault()

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username: event.target[0].value,
            password: event.target[1].value
        })
    }
    // debugger
    fetch("http://localhost:3000/api/v1/signup", configObj)
    .then(res => res.json())
    // .then(console.log)
    .then(userInfo => {
        // debugger
        if(userInfo.token){
            localStorage.token = userInfo.token
            console.log(localStorage)
        } 
        // else {
        //     console.log("account not created")
        //     const signUpError = ce("p")
        //     // signUpError.innerText="that username is already taken, try another"
        //     // have errors report errors from validation
        //     signUpError.innerText=""
        //     mainBodyDiv.append(signUpError)
        // }
    })

})

// login button toggle inside signup form
login.addEventListener("click", ()=> loginToggleHelper())

// login button toggle inside header
loginHeaderToggle.addEventListener("click", ()=> loginToggleHelper())

// helper method for login toggles
function loginToggleHelper(){
    console.log("login header toggle clicked")
    loginBoolean = !loginBoolean;
    if (loginBoolean) {
        loginForm.style.display="block"
        loginHeaderToggle.innerText="Hide Login Form"
    } else {
        loginForm.style.display="none"
        loginHeaderToggle.innerText="Login"
    }
}

// fetch request for login
loginForm.addEventListener("submit", ()=>{
    event.preventDefault()
    // console.log("login submited")

    let configObj ={
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username: event.target[0].value,
            password: event.target[1].value
        })
    }

    fetch("http://localhost:3000/api/v1/login", configObj)
    .then(res => res.json())
    // .then(console.log)
    .then(userInfo => {
        if(userInfo.token){
            localStorage.token = userInfo.token
            console.log(localStorage)
            console.log("login submited")

            // hide login toggle and reset form 
            // loginBoolean = false
            loginBoolean = !loginBoolean;
            if (loginBoolean) {
                loginForm.style.display="block"
                loginHeaderToggle.innerText="Hide Login"
                // headerDiv.removeChild(loginError)
            } else {
                loginForm.style.display="none"
                loginHeaderToggle.innerText="Login"
            }

            if(headerDiv.lastChild === loginError){headerDiv.removeChild(loginError)} // if no error occurs, nothing to delete
            headerDiv.removeChild(loginHeaderToggle)
            mainBodyDiv.innerHTML=""

            profileInfo.innerText= `username: ${userInfo.user.username}`
            if (userInfo.user.bio){
                profileInfo2.innerText = "bio: " + `${userInfo.user.bio}`
            } else {
                profileInfo2.innerText = "bio: *no current bio*"
            }
            current_user = userInfo.user
            editProfileToggle.innerText = "Edit Profile"

            editUsernameInput.value = current_user.username
            editUsernameInput.placeholder = "Username..."
            editBioInput.value = current_user.bio
            editBioInput.placeholder = "Bio..."
            editProfileSubmit.type="submit"
            editProfileForm.style.display="none"
            editProfileForm.append(editUsernameInput, editBioInput, editProfileSubmit)
            deleteUserBtn.type="button"
            deleteUserBtn.innerText ="Delete Account"

            userRecipes.innerText ="My Recipes"
            logoutBtn.innerText="Log Out"
    
            headerDiv.append(logoutBtn)
            underline.append(userRecipes)
            mainBodyDiv.append(profileInfo, profileInfo2, editProfileForm, editProfileToggle, deleteUserBtn, underline)
        } else { 
            console.log("login submit failed")
            loginError.innerText = "Incorrect username or password"
            headerDiv.append(loginError)
        }
    })
})

logoutBtn.addEventListener("click", ()=>{
    localStorage.clear()
    mainBodyDiv.innerHTML=""
    // debugger
    // loginForm.style.display="block"
    loginForm.reset()
    headerDiv.append(loginHeaderToggle)
})

// loging into page takes to you user profile
// loginBtn.addEventListener("click", ()=>{
//     event.preventDefault()
//     console.log("login submited")
//     console.log(localStorage)

//     mainBodyDiv.innerHTML=""

//     profileInfo.innerText= "username: "
//     userRecipes.innerText = "My Recipes"
    
//     underline.append(userRecipes)
//     mainBodyDiv.append(logoutBtn, profileInfo,underline)
// })

// show My Recipes
userRecipes.addEventListener("click", ()=>{
    console.log("recipes link clicked")
    mainBodyDiv.innerHTML=""

    pageTitle.innerText="My Recipes"
    recipeBtnToggle.innerText="Create Recipe"
    recipeBtnToggle.type="button"

    titleInput.placeholder="Title..."
    abtInput.placeholder="Description..."
    imgInput.placeholder="Image Url"
    createRecipeBtn.innerText="Create Recipe"
    // create default userInput input to loged in user

    userInput.type="hidden"
    recipeForm.append(titleInput, abtInput, imgInput, userInput, createRecipeBtn)
    recipeForm.style.display="none"

    mainBodyDiv.append(pageTitle, recipeForm, br, recipeBtnToggle)
    // debugger
    fetch(`http://localhost:3000/api/v1/users/${current_user.id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}` //sending auth token 
        }
    }) 
    .then(res => res.json())
    // .then(user => {
    //     debugger //lets me look into user which is essentially http://localhost:3000/api/v1/users/${current_user.id} since browser throws error bc no headers are passed (aka not logged in)
    // })
    .then(user => {
        if(user.recipes.length > 0){
            user.recipes.forEach(recipe => addRecipe(recipe))
        } else {
            noRecipeError.innerText="You have no recipes. Click on the 'Create Recipe' button to get started"
            mainBodyDiv.append(noRecipeError)
            console.log("this user has no recipes")
        }
    })
})

// refactored in userRecipes event listener
// function showRecipes(recipes){
//     recipes.forEach(recipe => addRecipe(recipe))
// }

recipeBtnToggle.addEventListener("click", ()=>{
    console.log("new recipe toggled")

    newRecipeBoolean = !newRecipeBoolean;
    if (newRecipeBoolean) {
        recipeForm.style.display="block"
        recipeBtnToggle.innerText="Hide Recipe Form"
    } else {
        recipeForm.style.display="none"
        recipeBtnToggle.innerText="Create Recipe"
    }
})

function addRecipe(recipe){
    recipeCard.className="card"
    recipeCardContainer.className="container"

    if(recipe.img){
        recipeImg.src=recipe.img
    }
    recipeTitle.innerText = recipe.title
    recipeAbt.innerText = recipe.abt 
    recipeMoreBtn.type="button"
    recipeMoreBtn.innerText="show more info"

    // want a new eventListener for each recipeCard, so creating it here inside addRecipe()
    recipeMoreBtn.addEventListener("click", ()=>{
        console.log("more info toggled")
        // recipe.rec_ingreds.forEach(rec_ingred => displayRI(rec_ingred))
        // recipeCard.append(recIngredList)
    })

    recipeCard.append(recipeImg, recipeTitle, recipeAbt, recipeMoreBtn)
    mainBodyDiv.append(recipeCard)
    // mainBodyDiv.append(recipeTitle, recipeAbt)

}

// display each rec_ingred 
// function displayRI(){
//     fetch("http://localhost:3000/api/v1/recipes")
//     .then(res => res.json())
//     .then(recipes => recipes.forEach(recipe=> {
//         if recipe.id === 
//     }))

//     const 
//     recIngredList.append()
// }

// edit profile toggle
editProfileToggle.addEventListener("click", ()=> editProfileToggleHelper())

// edit profile toggle helper function
function editProfileToggleHelper(){
    console.log("Edit profile toggle clicked")
    editProfileBoolean = !editProfileBoolean;
    if (editProfileBoolean) {
        editProfileForm.style.display="block"
        // remove the p tags with the username and bio from DOM
        mainBodyDiv.removeChild(profileInfo)
        mainBodyDiv.removeChild(profileInfo2)
        editProfileToggle.innerText="Cancel Edits"
    } else {
        editProfileForm.style.display="none"
        // add the p tags with the username and bio from DOM back
        mainBodyDiv.insertBefore(profileInfo, mainBodyDiv.children[0])
        mainBodyDiv.insertBefore(profileInfo2, mainBodyDiv.children[1])
        editProfileToggle.innerText="Edit Profile"
    }
}

// Edit Profile
editProfileForm.addEventListener("submit", ()=>{
    event.preventDefault()

    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json", //throws [object Object] error?
            Authorization: `Bearer ${localStorage.token}` //sending auth token 
        },
        body: JSON.stringify({
            username: event.target[0].value,
            bio: event.target[1].value
        })
    }
    // debugger
    fetch(`http://localhost:3000/api/v1/users/${current_user.id}`, configObj) 
    .then(res => res.json())
    .then(userInfo => {
        console.log(userInfo)
        console.log("showing updated info")
        profileInfo.innerText = `username: ${userInfo.username}`
        if (userInfo.bio){
            profileInfo2.innerText = "bio: " + `${userInfo.bio}`
        } else {
            profileInfo2.innerText = "bio: *no current bio*"
        }
        editProfileToggleHelper()
        // editProfileBoolean = !editProfileBoolean
        // if (editProfileBoolean){
        //     editProfileForm.style.display="none"
        //     mainBodyDiv.insertBefore(profileInfo, mainBodyDiv.children[0])
        //     mainBodyDiv.insertBefore(profileInfo2, mainBodyDiv.children[1])
        //     editProfileToggle.innerText="Edit Profile"
        //     console.log("edit form should be gone now")
        // }
    })
    // .then(user => {
    //     debugger //lets me look into user which is essentially http://localhost:3000/api/v1/users/${current_user.id} since browser throws error bc no headers are passed (aka not logged in)
    // })
  
})

// Delete User Account
deleteUserBtn.addEventListener("click", ()=>{

    let configObj = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.token}` //sending auth token
        }
    }
    // debugger
    fetch(`http://localhost:3000/api/v1/users/${current_user.id}`, configObj)
    .then(res => {
        // console.log(res)
        mainBodyDiv.innerHTML=""
        mainBodyDiv.append(loginForm, loginHeaderToggle)
    })
})
