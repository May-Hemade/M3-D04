const loadBooks = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((books) => {
      displayBooks(books)
    })
    .catch((err) => {
      console.error(err)
    })
}

const displayBooks = (books) => {
  const booksContainer = document.querySelector("#books-container")

  books.forEach((book) => {
    let cardNode = document.createElement("div")
    cardNode.classList.add("col-3")
    cardNode.innerHTML = `<div class="card">
  <img src="${book.img}" class="card-img-top" alt="${book.title}">
  <div class="card-body">
    <h5 class="card-title">${book.title}</h5>
    <p class="card-text">${book.category}</p>
    <p class="card-text">${book.price}</p>
    <a href="#" onclick="addToCart(this)" return false;" class="btn btn-primary">Add to Cart</a>
    <a href="#" onclick="skip(this)" class="btn btn-primary">Skip</a>
  </div>
</div>`
    booksContainer.appendChild(cardNode)
  })
}

const addToCart = (target) => {
  target.parentNode.parentNode.classList.toggle("bg-success")
}

const skip = (target) => {
  target.parentNode.parentNode.parentNode.classList.add("collapse")
}

window.onload = () => {
  loadBooks()
}
