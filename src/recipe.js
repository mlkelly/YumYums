// -------- relating to recipe abilities --------------

// create Recipes
console.log(recipeForm)

// recipeBtnToggle.addEventListener("click", ()=>{
//     console.log("new recipe toggled")

//     newRecipeBoolean = !newRecipeBoolean;
//     if (newRecipeBoolean) {
//         recipeForm.style.display="block"
//         recipeBtnToggle.innerText="Hide Recipe Form"
//     } else {
//         recipeForm.style.display="none"
//         recipeBtnToggle.innerText="Create Recipe"
//     }
// })

// recipeForm manipulations 
recipeForm.addEventListener("submit",()=>{
    event.preventDefault()
    console.log("inside recipe form")

    // post request to http://localhost:3000/api/v1/recipes
    let configObj ={ 
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${localStorage.token}` //sending auth token
        },
        body: JSON.stringify({
            title: recipeForm[0].value,
            abt: recipeForm[1].value,
            img: recipeForm[2].value,
            user_id: current_user.id
        })
    }
    // debugger
    fetch("http://localhost:3000/api/v1/recipes", configObj)
    .then(res => res.json())
    // .then(console.log)
    .then(newRecipe => { 
        // append the recipe card to the screen
        addRecipe(newRecipe)
        recipeForm.reset()
        console.log("appended new Recipe to DOM")
    })
})

// // edit recipe form 
// editRecipeForm.addEventListener("submit", ()=>{
//     event.preventDefault()
    
//     let configObj={
//         method:"PATCH",
//         headers: {
//             "Content-Type":"application/json",
//             Authorization: `Bearer ${localStorage.token}` //sending auth token
//         },
//         body: JSON.stringify({
//             title: editRecipeForm[0].value,
//             abt: editRecipeForm[1].value,
//             img: editRecipeForm[2].value
//         })
//     }
//     // debugger
//     fetch(`http://localhost:3000/api/v1/recipes/${this_recipe.id}`, configObj)
//     .then(console.log)
// })

// all recipes page
feedBtn.addEventListener("click", ()=>{
    // clears all info for recipe cards
    mainBodyDiv.innerHTML=""
    let configObj={
        method:"GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}` //sending auth token 
        }
    }
    // debugger
    fetch("http://localhost:3000/api/v1/recipes", configObj)
    .then(res => res.json())
    .then(recipes => recipes.forEach(recipe => {
        // addRecipe(recipe)
        // debugger
        // need to create const inside of addRecipe so theres new tags for recipe not replacing existing ones
        const recipeCard = ce("div")
        const recipeCardContainer = ce("div")
        const recipeImg = ce("img")
        const recipeTitle = ce("h2")
        const recipeAbt = ce("h3")
        const recipeMoreBtn = ce("button")
        const recipeDeleteBtn = ce("button")
        const editRecipeBtn = ce("button")
        const username = ce("p")
        const avatar = ce("img")
        let recipeMoreToggle = false 

        // debugger

        recipeCard.className="card"
        recipeCardContainer.className="container"
        avatar.src = recipe.user.img
        avatar.className = "mini-icon"
        username.innerText = recipe.user.username
        recipeImg.className="card-cover-img"
        recipeImg.src=recipe.img
        recipeTitle.innerText = recipe.title
        recipeAbt.innerText = recipe.abt 
        recipeMoreBtn.className="more-button"
        recipeMoreBtn.type="button"
        recipeMoreBtn.innerText="Show More"

        // want a new eventListener for each recipeCard, so creating it here inside addRecipe()
        recipeMoreBtn.addEventListener("click", ()=>{
            console.log("more info toggled")
            // recipe.rec_ingreds.forEach(rec_ingred => displayRI(rec_ingred))
            // recipeCard.append(recIngredList)
            recipeMoreToggle = !recipeMoreToggle
            if (recipeMoreToggle){
                recipeMoreBtn.innerText= "Show Less"
                // editRecipeBtn.innerText="Edit Recipe"
                // recipeDeleteBtn.innerText="Delete Recipe"
                // recipeCard.insertBefore(editRecipeBtn, recipeMoreBtn)
                // recipeCard.insertBefore(recipeDeleteBtn, recipeMoreBtn)
            } else {
                // opposite of if to revert
                recipeMoreBtn.innerText="Show More"
                // recipeCard.removeChild(editRecipeBtn)
                // recipeCard.removeChild(recipeDeleteBtn)
            }
        })

        recipeCard.append(avatar, username, recipeImg, recipeTitle, recipeAbt, recipeMoreBtn)
        mainBodyDiv.prepend(recipeCard)
        // mainBodyDiv.append(recipeTitle, recipeAbt)

        // // CAREFUL!!!
        // recipeDeleteBtn.addEventListener("click", ()=>{
        //     console.log("going to delete recipe")

        //     let configObj = {
        //         method: "DELETE",
        //         headers: {
        //             Authorization: `Bearer ${localStorage.token}` //sending auth token
        //         }
        //     }
        //     // debugger
        //     fetch(`http://localhost:3000/api/v1/recipes/${recipe.id}`, configObj) //says theres a 500 error, but it still deletes from the server and manipulates the DOM
        //     .then(mainBodyDiv.removeChild(recipeCard))
        // //     .then(res => {
        // //         console.log("successful deleted")

        // //         // delete card from DOM
        // //         mainBodyDiv.removeChild(recipeCard)
        // //     })
        // })

        // // CAREFUL!!! // edit recipes form
        // editRecipeBtn.addEventListener("click", ()=>{
            
        //     // debugger
        //     // make form pop appear on DOM
        //     editRecipeTitleInput.placeholder = "Title..."
        //     editRecipeTitleInput.value = recipe.title
        //     editRecipeAbtInput.placeholder = "Description..."
        //     editRecipeAbtInput.value = recipe.abt
        //     editRecipeImgInput.placeholder = "Image URL..."
        //     editRecipeImgInput.value = recipe.img
        //     editRecipeSub.type="submit"
        //     editRecipeSub.innerText="Edit Recipe"

        //     editRecipeForm.append(editRecipeTitleInput, editRecipeAbtInput, editRecipeImgInput, editRecipeSub)
        //     recipeCard.insertBefore(editRecipeForm, editRecipeBtn)
        //     recipeCard.removeChild(editRecipeBtn)
        //     this_recipe = recipe
        // })
    })
    )
})

