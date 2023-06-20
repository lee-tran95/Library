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

    info(){
        let haveRead = this.read ? "have read" : "not read yet"
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${haveRead}`)
    }
}

let book1 = new Book("Lee", "Tran", 28, true)
let book2 = new Book("Lee", "Tran", 28, false)
myLibrary.push(book1, book2)

document.body.onload = displayBooks

function displayBooks(all = true){
    if(all){
        for(let book of myLibrary){
            const article = document.createElement('article')
            const title = document.createElement('h3')
            const author= document.createElement('h4')
            const pages = document.createElement('p')
            const read = document.createElement('p')

            title.textContent = book.title
            author.textContent = book.author
            pages.textContent = book.pages
            read.textContent = book.read
            article.append(title, author, pages, read)

            cardContainer.append(article)
        }
    }else{
            const book = myLibrary[myLibrary.length-1]
            const article = document.createElement('article')
            const title = document.createElement('h3')
            const author= document.createElement('h4')
            const pages = document.createElement('p')
            const read = document.createElement('p')

            title.textContent = book.title
            author.textContent = book.author
            pages.textContent = book.pages
            read.textContent = book.read
            article.append(title, author, pages, read)

            cardContainer.append(article)
    }
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