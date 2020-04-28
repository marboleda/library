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