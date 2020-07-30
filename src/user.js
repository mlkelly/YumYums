// -------- relating to user abilities --------------

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

// login toggle helper/callback
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

            loggedinPage(userInfo)
        } else { 
            console.log("login submit failed")
            loginError.innerText = "Incorrect username or password"
            headerDiv.append(loginError)
        }
    })
})

function loggedinPage(userInfo){
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

    // deletes loginError from DOM once login validated
    if(headerDiv.lastChild === loginError){headerDiv.removeChild(loginError)} // if no error occurs, nothing to delete
    headerDiv.removeChild(loginHeaderToggle)

    // removes login form, fresh canvas
    mainBodyDiv.innerHTML=""
    current_user = userInfo.user //passing userInfo for reference elsewhere
    displayProfile(current_user) //still works even if signed out

    // appending buttons to DOM
    userRecipes.innerText ="My Recipes"
    underline.append(userRecipes)
    mainBodyDiv.prepend(underline) //only way to have 'My Recipes' not move when profileBtn clicked

    profileBtn.innerText="Profile"
    logoutBtn.innerText="Log Out"
    headerDiv.append(profileBtn, logoutBtn)

}

// helper method to display only profile info 
function displayProfile(current_user){
    // filling/appending profile info to DOM
    profileAvatar.src = current_user.img
    profileInfo.innerText= `username: ${current_user.username}`
    if (current_user.bio){
        profileInfo2.innerText = "bio: " + `${current_user.bio}`
    } else {
        profileInfo2.innerText = "bio: *no current bio*"
    }
    // current_user = userInfo.user //passing userInfo for reference elsewhere
    editProfileToggle.innerText = "Edit Profile" 
    editUsernameInput.value = current_user.username
    editUsernameInput.placeholder = "Username..."
    editBioInput.value = current_user.bio
    editBioInput.placeholder = "Bio..."
    editAvatarInput.value = current_user.img
    editAvatarInput.placeholder = "Image URL"
    editProfileSubmit.type="submit"
    editProfileForm.style.display="none"
    // editProfileForm.append(editUsernameInput, editBioInput, editProfileSubmit)
    editProfileForm.append(editUsernameInput, editBioInput, editAvatarInput, editProfileSubmit)
    deleteUserBtn.type="button"
    deleteUserBtn.innerText ="Delete Account"
    
    mainBodyDiv.append(profileAvatar, profileInfo, profileInfo2, editProfileForm, editProfileToggle, deleteUserBtn)
}

// logoutBtn functionality
logoutBtn.addEventListener("click", ()=>{
    localStorage.clear()
    mainBodyDiv.innerHTML=""
    // debugger
    // loginForm.style.display="block"
    loginForm.reset()
    headerDiv.removeChild(logoutBtn)
    mainBodyDiv.append(signUpForm)
    headerDiv.removeChild(profileBtn) //removes bc profileBtn works even when logged out bc of current_user variable
    headerDiv.append(loginHeaderToggle)
})

// profileBtn functionality
profileBtn.addEventListener("click", ()=>{
    console.log("clicked profileBtn, now on profile view")
    displayProfile(current_user)
})

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

    // userInput.value= current_user.id
    // userInput.id="user-id"
    userInput.type="hidden"
    recipeForm.append(titleInput, abtInput, imgInput, userInput, createRecipeBtn)
    recipeForm.style.display="none"

    mainBodyDiv.append(pageTitle, recipeForm, br, recipeBtnToggle)
    fetchRecipes()
})

// grabs current_user's recipes and displays them
function fetchRecipes(){
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
        // debugger
        if(user.recipes.length >0){
            user.recipes.forEach(recipe => addRecipe(recipe))
        } else {
            noRecipeError.innerText="You have no recipes. Click on the 'Create Recipe' button to get started"
            mainBodyDiv.append(noRecipeError)
            console.log("this user has no recipes")
        }
    })
}

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

// displays single recipe to DOM
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
    // debugger
    console.log("Edit profile toggle clicked")
    editProfileBoolean = !editProfileBoolean;
    if (editProfileBoolean) {
        editProfileForm.style.display="block"
        // remove the p tags with the username and bio from DOM
        // profileInfo=""
        // profileInfo2=""
        mainBodyDiv.removeChild(profileInfo)
        mainBodyDiv.removeChild(profileInfo2)
        mainBodyDiv.removeChild(profileAvatar)
        editProfileToggle.innerText="Cancel Edits"
    } else {
        editProfileForm.style.display="none"
        // add the p tags with the username and bio from DOM back
        // profileInfo.innerText = `username: ${userInfo.username}`
        // if (userInfo.bio){
        //     profileInfo2.innerText = "bio: " + `${userInfo.bio}`
        // } else {
        //     profileInfo2.innerText = "bio: *no current bio*"
        // }
        mainBodyDiv.insertBefore(profileAvatar, editProfileForm)
        mainBodyDiv.insertBefore(profileInfo, editProfileForm)
        mainBodyDiv.insertBefore(profileInfo2, editProfileForm)
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
            bio: event.target[1].value,
            img: event.target[2].value
        })
    }
    debugger
    fetch(`http://localhost:3000/api/v1/users/${current_user.id}`, configObj) 
    .then(res => res.json())
    .then(userInfo => {
        console.log(userInfo)
        console.log("showing updated info")
        // mainBodyDiv.innerHTML=""
        profileAvatar.src = userInfo.img
        profileInfo.innerText = `username: ${userInfo.username}`
        if (userInfo.bio){
            profileInfo2.innerText = "bio: " + `${userInfo.bio}`
        } else {
            profileInfo2.innerText = "bio: *no current bio*"
        }
        // let current_userFluff = userInfo
        current_user.bio = userInfo.bio
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

        // resets mainBody to intro page (login/signup)
        mainBodyDiv.innerHTML=""
        mainBodyDiv.append(loginForm, loginHeaderToggle)
    })
})


// recipeForm manipulations 
recipeForm.addEventListener("submit",()=>{
    event.preventDefault()
    console.log("inside recipe form")

    // post request to http://localhost:3000/api/v1/recipes
    let configObj ={ 
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.token}` //sending auth token
        },
        body: JSON.stringify({
            title: recipeForm[0].value,
            abt: recipeForm[1].value,
            img: recipeForm[2].value,
            user_id: current_user.id
        })
    }
    debugger
    fetch("http://localhost:3000/api/v1/recipes", configObj)
    .then(console.log)
})