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

    library.forEach((book) => {
        let bookCard = document.createElement("div");
        let bookTitle = document.createElement("h3");
        let bookAuthor = document.createElement("h4");
        let bookNumPages = document.createElement("p");
        let bookReadStatus = document.createElement("p");

        bookCard.classList.add("card");
    
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookNumPages.textContent = book.numPages;
        bookReadStatus.textContent = book.readStatus;

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookNumPages);
        bookCard.appendChild(bookReadStatus);
        body.appendChild(bookCard);       
    })
}