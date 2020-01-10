let addToy = false

// General Approach 
// 1. Fetch data from a server
// 2. Generate elements for the data
// 3. Slap that on the DOM
// 4. Add event listeners to make the page interactive
// 5. Make changes that persist on the server without having to refresh the page

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})
