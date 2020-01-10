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

// toyCollectionDiv.addEventListener('click', function(e){
//   if(e.target.className === "like-btn"){
//     // debugger
//     let numberElement = e.target.parentElement.querySelector("span")
//     let currentLikes = parseInt(numberElement.innerText)
//     let toyId = e.target.dataset.id
//     increaseLikes(numberElement, currentLikes, toyId)
//   }
// })

function increaseLikes(element, toy){
  fetch(`${toysURL}/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes
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
  const div = document.createElement("div")
  div.className = "card"
    const h2 = document.createElement("h2")
    h2.innerText = toy.name
    const img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"
    const p = document.createElement("p")
    p.innerText = toy.likes
    const button = document.createElement("button")
    button.className = "like-btn"
    button.innerText = "Like <3"
    button.addEventListener("click", function(){
      toy.likes = toy.likes + 1
      increaseLikes(p, toy)
    })
  div.append(h2,img,p,button)
  toyCollectionDiv.append(div)
}

// function createToyElements(toy){
//   // console.log(toyCollectionDiv)
//   toyCollectionDiv.innerHTML += `
//   <div class="card">
//     <h2>${toy.name}</h2>
//     <img src=${toy.image} class="toy-avatar" />
//     <p><span>${toy.likes}</span> Likes </p>
//     <button data-id=${toy.id} class="like-btn">Like <3</button>
//   </div>
//   `
// }

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

