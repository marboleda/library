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

    for (let i = 0; i < library.length; i++) {
        let bookCard = document.createElement("div");
        let bookTitle = document.createElement("h3");
        let bookAuthor = document.createElement("h4");
        let bookNumPages = document.createElement("p");
        let bookReadStatus = document.createElement("p");

        bookCard.classList.add("card");
    
        bookTitle.textContent = library[i].title;
        bookAuthor.textContent = library[i].author;
        bookNumPages.textContent = library[i].numPages;
        bookReadStatus.textContent = library[i].readStatus

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookNumPages);
        bookCard.appendChild(bookReadStatus);
        body.appendChild(bookCard);
    }
}