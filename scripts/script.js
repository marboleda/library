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

function openNewBookForm() {
    const form = document.querySelector(".popup-form")
    form.style.display = "flex";
    form.style["flex-direction"] = "column";
}

function closeNewBookForm() {
    const form = document.querySelector(".popup-form")
    form.style.display = "none";
    form.style.removeProperty("flex-direction");

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

function createNewBook() {
    const newBookForm = document.forms["new-book"];
    const newBook = new Book(newBookForm.elements["title"].value,
                             newBookForm.elements["author"].value,
                             newBookForm.elements["num-pages"].value,
                             newBookForm.elements["read-status"].value);
    myLibrary.push(newBook);
    render([newBook]);
}

document.querySelector(".popup-form").addEventListener("submit", e => e.preventDefault());