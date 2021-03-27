let addPokemon = false;
let pokemonCollectionDiv = document.querySelector("div#pokemon-collection")
let pokemonForm = document.querySelector(".add-pokemon-form")


// Allows drop down menu (Browser event)
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-pokemon-btn");
    const pokemonFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addPokemon = !addPokemon;
      if (addPokemon) {
        pokemonFormContainer.style.display = "block";
      } else {
        pokemonFormContainer.style.display = "none";
      }
    });
});

fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(function(pokemonArr){
    pokemonArr.forEach(function(pokemonObj){
        addPokemonCard(pokemonObj);
    });
});
    
function addPokemonCard(pokemonObj){
    let pokemonCardDiv = document.createElement("div");
        pokemonCardDiv.className = "card";

    let pokemonNameH2 = document.createElement("h2");
        pokemonNameH2.innerText = pokemonObj.name;

    let pokemonImage = document.createElement("img");
        pokemonImage.src = pokemonObj.image;
        pokemonImage.className = "pokemon-avatar";
        pokemonImage.alt = pokemonObj.name;

    let likesP = document.createElement("p");
        likesP.innerText = `${pokemonObj.likes} Likes`;

    let likeButton = document.createElement("button");
        likeButton.className = "like-btn";
        likeButton.innerText = "Like <3";


    pokemonCardDiv.append(pokemonNameH2, pokemonImage, likesP, likeButton);
    pokemonCollectionDiv.append(pokemonCardDiv)

  // Unstable elements get their evt listener in the place they are created
  likeButton.addEventListener("click", function(evt){
    
    fetch(`http://localhost:3000/pokemon/${pokemonObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        likes: pokemonObj.likes + 1
      })
    })
      .then(res => res.json())
      .then(function(updatedPokemonObj){
        pokemonObj.likes = updatedPokemonObj.likes
        pokemonObj = updatedPokemonObj
        likesP.innerText = `${updatedPokemonObj.likes} Likes`
      })
  }) //LikeButton EvtListener ends here
}    // addPokemonToCard ends here









// Stable Element Evt Listener on global level
  // Rare for you to do this inside of another event listener
  
pokemonForm.addEventListener("submit", function(e){
  e.preventDefault()
  let newName = e.target.name.value
  let newImage = e.target.image.value
  // e.target.querySelectorAll("input") <- NodeList of all inputs
  // e.target.querySelector("[name='name']")

  fetch("http://localhost:3000/pokemon", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newName,
      image: newImage, 
      likes: 0 
    })
  })
    .then(res => res.json())
    .then(function(newPokemon){
      addPokemonCard(newPokemon)
    })


})
