let myLibrary = [];

function Book(title, author, numPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readStatus = readStatus;
    
    Book.prototype.toggleReadStatus = function() {
        this.readStatus = (this.readStatus == "read") ? "unread" : "read";
    }
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
    const deleteBookButton = document.createElement("button");
    const toggleReadStatusButton = document.createElement("button");
    const indexTracker = document.createAttribute("data-booknum");

    bookCard.classList.add("card");

    library.forEach((book, index) => {
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookNumPages.textContent = book.numPages;

        bookReadStatus.textContent = book.readStatus;
        bookReadStatus.classList.add("read-status");

        indexTracker.value = myLibrary.length + index;
        deleteBookButton.textContent = `Delete Book ${indexTracker.value}`;
        deleteBookButton.classList.add("delete-book");

        toggleReadStatusButton.textContent = "Toggle Read\\Unread";
        toggleReadStatusButton.classList.add("toggle-read-status");

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookNumPages);
        bookCard.appendChild(bookReadStatus);
        bookCard.setAttributeNode(indexTracker);
        bookCard.appendChild(deleteBookButton);
        bookCard.appendChild(toggleReadStatusButton);

        body.appendChild(bookCard.cloneNode(true));      
        bookCard.textContent = ""; 
    });

    document.querySelectorAll(".delete-book").forEach(b => b.onclick = function() {
        let bookIndex = b.parentElement.getAttribute("data-booknum");
        myLibrary.splice(bookIndex,1);
        document.querySelector(`[data-booknum='${bookIndex}'`).remove();
    });

    document.querySelectorAll(".toggle-read-status").forEach(b => b.onclick = function() {
        let bookIndex = b.parentElement.getAttribute("data-booknum");
        myLibrary[bookIndex].toggleReadStatus();
        b.parentElement.querySelector(".read-status").textContent = myLibrary[bookIndex].readStatus;
    });

}

function createNewBook() {
    const newBookForm = document.forms["new-book"];
    const newBook = new Book(newBookForm.elements["title"].value,
                             newBookForm.elements["author"].value,
                             newBookForm.elements["num-pages"].value,
                             newBookForm.elements["read-status"].value);
    closeNewBookForm();
    render([newBook]);
    myLibrary.push(newBook);
}

document.querySelector(".popup-form").addEventListener("submit", e => e.preventDefault());