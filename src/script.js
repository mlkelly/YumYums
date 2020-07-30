// --------- script foundation ------------

function qs(selector){
    return document.querySelector(selector)
}

function ce(element){
    return document.createElement(element)
}


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