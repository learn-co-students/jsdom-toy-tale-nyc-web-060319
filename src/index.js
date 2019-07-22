const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form');
const toyCollection = document.querySelector('#toy-collection');
const submitButton = document.querySelector('.submit');
let addToy = false
let toys = []

// YOUR CODE HERE

fetchToys();

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// fetch toys
function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => {
    json.forEach(toy => {
      // toys.push(toy);
      createToyCard(toy);
    })
  })
}

function createToyCard(toy){
  const newToy = document.createElement('div');
  newToy.class = "card"
  newToy.innerHTML = 
  `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `
  toyCollection.appendChild(newToy);

  newToy.querySelector('.like-btn').addEventListener('click', e => {
    fetch('http://localhost:3000/toys/${toy.id}', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({"likes": toy.likes++})
    })
    newToy.querySelector('p').innerText = `${toy.likes} likes`
  })
  
}

// add new toy to DB
addToyForm.addEventListener('submit', e => {
  // console.log(e);
  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    })
  }).then(resp => resp.json())
  .then(json => {
    toys.push(json);
    createToyCard(json);
  })
})

// likes button
toyCollection.addEventListener('click', e => {
  // console.log(e.target); // all toys
})



