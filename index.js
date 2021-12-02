const loadBooks = (filter) => {
  return fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((books) => {
      displayBooks(books, filter)
    })
    .catch((err) => {
      console.error(err)
    })
}

const displayBooks = (books, filter) => {
  const booksContainer = document.querySelector("#books-container")
  booksContainer.innerHTML = ""

  books
    .filter((book) => book.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach((book) => {
      let cardNode = document.createElement("div")
      cardNode.classList.add("col-3", "mb-3")
      cardNode.innerHTML = `<div class="card h-175 mb-3">
  <img src="${book.img}" class="card-img-top " style=" height:300px; object-fit:cover" alt="${book.title}">
  <div class="card-body">
    <h5 class="card-title text-truncate">${book.title}</h5>
    <p class="card-text">${book.category}</p>
    <p class="card-text">${book.price}</p>
    
    <a href="#" onclick="addToCart(this)" return false;" class="btn btn-primary ">Add to Cart</a>
    <a href="#" onclick="skip(this)" class="btn btn-warning ">Skip</a>
   
  </div>
</div>`
      booksContainer.appendChild(cardNode)
    })
}

const addToCart = (target) => {
  let bookCard = target.parentNode.parentNode

  let cartContainer = document.getElementById("cart-container")
  let bookCardClone = bookCard.cloneNode(true)
  let imgNode = bookCardClone.querySelector("img")
  imgNode.style.height = "100px"
  imgNode.style.width = "object-fit:cover"

  let deleteButton = bookCardClone.querySelector("a:first-of-type")
  deleteButton.innerText = "Delete"

  deleteButton.onclick = deleteFromCart
  let skipButton = bookCardClone.querySelector("a:last-of-type")
  skipButton.remove()
  cartContainer.appendChild(bookCardClone)

  bookCard.classList.add("in-cart")
}

const skip = (target) => {
  target.parentNode.parentNode.parentNode.classList.add("collapse")
}

const setupSearch = () => {
  let searchNode = document.getElementById("filter-books")
  searchNode.addEventListener("keyup", filterBooks)
}

const filterBooks = (eventData) => {
  let filter = eventData.target.value
  if (filter.length >= 3 || filter.length == 0) {
    loadBooks(eventData.target.value)
  }
}

const deleteFromCart = (eventData) => {
  eventData.target.parentNode.parentNode.remove()
}

window.onload = () => {
  loadBooks("")
  setupSearch()
}
