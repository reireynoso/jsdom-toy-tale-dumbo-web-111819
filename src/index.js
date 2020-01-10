let addToy = false
const toysUrl = `http://localhost:3000/toys`

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

const toyCollectionDiv = document.querySelector("#toy-collection")

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})  

// General Approach 
// 1. Fetch data from a server (toys) *
// 2. Generate elements for the data (div, h2, img, p, button) *
// 3. Slap that on the DOM *
// 4. Add event listeners to make the page interactive
// 5. Make changes that persist on the server without having to refresh the page


loadToys()

function loadToys(){
  fetch(toysUrl)
  .then(r => r.json())
  .then(toysData => toysData.forEach(toy => generateElementsForToy(toy)))
}

function generateElementsForToy(toy){
  toyCollectionDiv.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button data-id=${toy.id} class="like-btn">Like <3</button>
  </div>`
}

toyCollectionDiv.addEventListener("click", function(e){
  if(e.target.className === "like-btn"){
    // console.log("button")
    // debugger
    let newLikes = parseInt(e.target.previousElementSibling.innerText.split(" ")[0]) + 1
    let pElement = e.target.previousElementSibling
    fetch(`${toysUrl}/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
      .then(resp => resp.json())
      .then(toy => pElement.innerText = newLikes)
  }
})

// const toyForm = document.querySelector(".toy-form")

// toyForm.addEventListener("submit", function(e){
//   e.preventDefault()
//   // debugger
//   const toyName = e.target.name.value
//   const toyImage = e.target.image.value

//   fetch(toysUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       name: toyName,
//       image: toyImage,
//       likes: 0
//     })
//   })
//   .then(resp => resp.json())
//   .then(newToy => generateElementsForToy(newToy))
// })

// function generateElementsForToy(toy){
//   // console.log(toy)
//   const div = document.createElement("div")
//   div.className = "card"

//     const h2 = document.createElement("h2")
//     h2.innerText = toy.name
//     const img = document.createElement("img")
//     img.src = toy.image
//     img.className = "toy-avatar"
//     const p = document.createElement("p")
//     p.innerText = toy.likes
//     const button = document.createElement("button")
//     button.className = "like-btn"
//     button.innerText = "Like <3"
//     button.addEventListener("click", function(){
//       // 1. Likes to increase
//       // 2. Find the number of likes and increase
//       // 3. PATCH request to the backend
      // 4. Display that stuff
    //   increaseLikes(toy, p)
    // })

  //   div.append(h2,img,p,button)
  // toyCollectionDiv.append(div)
  // createElemement
// }

// function increaseLikes(toy, elementToUpdate){
//     const newLikes = toy.likes += 1
//     fetch(`${toysUrl}/${toy.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         likes: newLikes
//       })
//     })
//     .then(resp => resp.json())
//     .then(toy => {
//       elementToUpdate.innerText = toy.likes
//     })
// }

