const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
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


// OR HERE!
const toysContainer = document.querySelector('#toy-collection');
document.addEventListener('DOMContentLoaded', function(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(jsonRes => {
    jsonRes.forEach(toy =>{
      let toyContainer = document.createElement('div');
      toyContainer.className = 'card';
      toyContainer.innerHTML = `<h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar"><p>${toy.likes} Likes</p>`
      + `<button class = "like-btn" data-id=${toy.id}>Like \<3</button>`;
      toysContainer.appendChild(toyContainer);
    })
  })

  const addNewToyBtn = document.querySelector('.add-toy-form');
  addNewToyBtn.addEventListener('submit', function(e){
    e.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        
        name: document.querySelector('.add-toy-form .input-text').value,
        image: document.querySelector('#input-image').value,
        likes: 0
      })
    })
  })
  const likeButtons = document.querySelectorAll('.like-btn')
  document.addEventListener('click', function(e){

    if(e.target.className == "like-btn") {
         let reqBtn = e.target;
      fetch(`http://localhost:3000/toys/${reqBtn.dataset.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify({
          likes : parseInt(reqBtn.previousSibling.innerHTML.split(" ")[0]) + 1
        })
      }) 
    } 
  })

})

