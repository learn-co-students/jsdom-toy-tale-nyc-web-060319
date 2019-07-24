const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector("#toy-collection")

// YOUR CODE HERE

addBtn.addEventListener("click", addNewToy)

//get request(index)
function getAndysToys(){
  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json();
  })
  .then(function(toys){
    toys.forEach(function(toy){
    const andysToys = document.createElement("div")
    andysToys.classList.add("card")
    andysToys.innerHTML = toy.name
    andysToys.dataset.id = toy.id// <...data-id = 1>
    andysToys.dataset.likes = toy.likes
    toyCollection.appendChild(andysToys)
    showToyInfo(andysToys)
    })
  })
} //end of function getAndyToys

getAndysToys();

//get request (show)
function showToyInfo(andysToys){
  fetch(`http://localhost:3000/toys/${andysToys.dataset.id}`)
  // console.log(andysToys.dataset.id)
  .then(function(response){
    return response.json()
  })
  .then(function(json){
    //adding toy name
    let toyName = document.createElement("h2")
    toyName.innerHTML = json.name
    andysToys.appendChild(toyName)
    toyName.dataset.name = json.name
    //adding toy image
    let toyImage = document.createElement("img")
    toyImage.src = json.image
    toyImage.dataset.image = json.image
    andysToys.appendChild(toyImage)

    // adding likes
    let toyLikes = document.createElement("p")
    toyLikes.id = `toy-likes-id-${andysToys.dataset.id}`
    toyLikes.innerHTML = json.likes
    andysToys.appendChild(toyLikes)

    //add button
    let toyButton = document.createElement("button")
    toyButton.innerHTML = "Like <3"
    toyButton.classList.add("like-btn")
    toyButton.id = `toy-button-id-${andysToys.dataset.id}`
    toyButton.addEventListener("click", addLikeToToy)
    andysToys.appendChild(toyButton)
    // addNewToy(toyName, toyImage)
  })
} // end of function showToyInfo





function addNewToy(){
  let name = prompt("Enter a name!")
  let image = prompt("Please enter a image url! :)")
  console.log(name)
  console.log(image)
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
       name: name,
      image: image,
      likes: 0
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(function(json){
      const andysToys = document.createElement("div")

      const newAndyToyName = document.createElement("p")
      newAndyToyName.innerText = json.name
      andysToys.appendChild(newAndyToyName)




      toyCollection.appendChild(andysToys)
    // console.log("This is the json")
    // console.log(json)
    // console.log("This is the json.name")
    // console.log(json.name)
    // console.log("This is the json.img_url")
    // console.log(json.image)

  })
}

//we want to udpate the # of likes
function addLikeToToy(e){
// console.log(e.target.id.slice(14))
// console.log(e.target.parentElement.dataset.id)
  //
  console.log(toyCollection)
  let toyDiv = e.target.parentElement
  fetch(`http://localhost:3000/toys/${toyDiv.dataset.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: ++(e.target.parentElement.dataset.likes)
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(toyJSON => {
    document.querySelector(`#toy-likes-id-${toyDiv.dataset.id}`).innerText = toyJSON.likes
  } )
}


//
// addBtn.addEventListener('click', () => {
//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//   } else {
//     toyForm.style.display = 'none'
//   }
// })
