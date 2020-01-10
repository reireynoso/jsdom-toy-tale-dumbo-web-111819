let addToy = false
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollectionDiv = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
const toysURL = `http://localhost:3000/toys`

// General Approach 
// 1. Fetch data from a server
// 2. Generate elements for the data
// 3. Slap that on the DOM
// 4. Add event listeners to make the page interactive
// 5. Make changes that persist on the server without having to refresh the page

 addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

fetchToys()

toyCollectionDiv.addEventListener('click', function(e){
  if(e.target.className === "like-btn"){
    // debugger
    let numberElement = e.target.parentElement.querySelector("span")
    let currentLikes = parseInt(numberElement.innerText)
    let toyId = e.target.dataset.id
    increaseLikes(numberElement, currentLikes, toyId)
  }
})

function increaseLikes(element, likes, id){
  fetch(`${toysURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likes + 1
    })
  })
  .then(resp => resp.json())
  .then(updatedLike => {
    element.innerText = updatedLike.likes
  })
}

function fetchToys(){
  fetch(toysURL)
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => createToyElements(toy))
  })
}

function createToyElements(toy){
  // console.log(toyCollectionDiv)
  toyCollectionDiv.innerHTML += `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p><span>${toy.likes}</span> Likes </p>
    <button data-id=${toy.id} class="like-btn">Like <3</button>
  </div>
  `
}

addToyForm.addEventListener('submit', function(e){
  e.preventDefault()
  // console.log('hello')
  let toyName = e.target.name.value
  let toyImage = e.target.image.value
  // console.log(toyName, toyImage)
  fetch(`${toysURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(newToy => createToyElements(newToy))
})

