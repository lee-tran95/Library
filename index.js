const cardContainer = document.querySelector(".card-section")
const showDialog = document.getElementById('show-dialog')
const closeDialog = document.getElementById('close-dialog')
const bookDialog = document.getElementById('add-book-dialog')
const form = document.querySelector("form")


let myLibrary = []

class Book{
    constructor(title, author, pages, read){
        this.title = title
        this.author = author
        this.pages= pages
        this.read = read
    }

    toggleRead() {
        this.read === 'true' ? this.read = 'false' : this.read = 'true'
    }
}

let book1 = new Book("Lee", "Tran", 28, 'true')
let book2 = new Book("Lee", "Tran", 28, 'false')
myLibrary.push(book1, book2)

document.body.onload = displayBooks

function displayBooks(all = true){
    let start = all ? 0 : myLibrary.length - 1
        for(let i = start; i < myLibrary.length; i++){
            const book = myLibrary[i]
            const article = document.createElement('article')
            const title = document.createElement('h3')
            const author= document.createElement('h4')
            const pages = document.createElement('p')
            const read = document.createElement('p')
            const removeButton = document.createElement('button')
            const toggleReadBtn = document.createElement('button')

            title.textContent = book.title
            author.textContent = book.author
            pages.textContent = book.pages
            read.textContent = book.read
            read.classList = "status"
            removeButton.textContent = 'Delete'
            removeButton.onclick = remove
            removeButton.classList = 'remove'
            removeButton.dataset.index = i
            toggleReadBtn.textContent = 'toggle read status'
            toggleReadBtn.onclick = readToggle
            toggleReadBtn.classList = 'read-toggle'
            toggleReadBtn.dataset.index = i
            article.append(title, author, pages, read, removeButton, toggleReadBtn)
            article.dataset.index = i;

            cardContainer.append(article)
        }
}

function remove(){
    const indexToRemove = this.dataset.index
    myLibrary.splice(indexToRemove, 1)
    const bookToRemove = document.querySelector(`[data-index ='${indexToRemove}']`)
    bookToRemove.remove()
}
 function readToggle(){
    const toggleIndex = this.dataset.index
    myLibrary[toggleIndex].toggleRead()
    const statusToggle = document.querySelector(`[data-index ='${toggleIndex}']`)
    statusToggle.querySelector('.status').textContent = myLibrary[toggleIndex].read
    
 }


showDialog.addEventListener('click', () => {
    bookDialog.showModal()  
})

closeDialog.addEventListener('click', () =>{
    bookDialog.close()
})

form.addEventListener("submit", ()=>{
    const data = new FormData(form)
    const book = new Book(data.get('title'),data.get('author'),data.get('pages'),data.get('haveRead'))
    myLibrary.push(book)
    displayBooks(false)
})