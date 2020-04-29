let myLibrary = [];

function Book(title, author, numPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readStatus = readStatus;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function render(library) {
    const body = document.querySelector("body");
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("h4");
    const bookNumPages = document.createElement("p");
    const bookReadStatus = document.createElement("p");

    bookCard.classList.add("card");

    library.forEach((book) => {

        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookNumPages.textContent = book.numPages;
        bookReadStatus.textContent = book.readStatus;

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookNumPages);
        bookCard.appendChild(bookReadStatus);
        body.appendChild(bookCard.cloneNode(true));      
        bookCard.textContent = ""; 
    });
}