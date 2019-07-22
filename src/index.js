const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toys = document.getElementById('toy-collection')
const name = document.getElementById('new-toy-name')
const image = document.getElementById('new-toy-url')
const createToy = document.getElementById('create-toy')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

createToy.addEventListener("click", newToy)


function getToysData(){
  fetch("http://localhost:3000/toys")
  .then(function(response) {
    const json = response.json()
    return json
  })
  .then(renderAllToys)
}

function renderAllToys(json) {
  json.forEach(function(toy) {
    renderToy(toy)
  })
  assignLikeButtons()
}

function getToyData(id){
  fetch(`http://localhost:3000/toys/${id}`)
  .then(function(response){
    const json = response.json()
    return json
  })
  .then(renderToy)
} 
function renderToy(toy){
  let toyDiv = document.createElement('div');
  toyDiv.classList.add("card");
  toyDiv.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn" data-id=${toy.id}>Like <3</button>`
  toys.appendChild(toyDiv)
  assignLikeButtons()
}

function newToy(event){
  event.preventDefault();
  // debugger
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({name: name.value, image: image.value, likes: 1})
  })
  .then(function(response){
    const parsedJson = response.json();
    return parsedJson;
  })
  .then(function(parsedJson){
    renderToy(parsedJson)
  })
}

function assignLikeButtons() {
  const likeBtns = document.querySelectorAll('.like-btn')
  console.log(likeBtns)
  likeBtns.forEach(function (btn){
    addEventListener("click", increaseLikes)})
  // debugger
  function increaseLikes(event){
    event.preventDefault();
    let targetId = event.target.dataset.id
    let likes = parseInt(event.target.previousElementSibling.innerText.split(" ")[0])
    // debugger
    let up = likes + 1
    // debugger
    fetch(`http://localhost:3000/toys/${event.target}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes: up})
    })
    .then(function(response){
      const parsedJson = response.json()
      return parsedJson
    })
    .then(function(){
      event.target.previousElementSibling.innerText = `${up} likes`;
    })
  }
}

// getToyData(1)
getToysData()