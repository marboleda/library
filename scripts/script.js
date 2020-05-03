// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAag4T9nkpW5CPGvrAjHI8UEUeaf7y2FSo",
  authDomain: "library-3dd00.firebaseapp.com",
  databaseURL: "https://library-3dd00.firebaseio.com",
  projectId: "library-3dd00",
  storageBucket: "library-3dd00.appspot.com",
  messagingSenderId: "1095291408969",
  appId: "1:1095291408969:web:7fc147311d5a0d26986598"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let currentBookNum;
let myLibrary = [];

var dbLibraryRef = firebase.database().ref().child('library');
dbLibraryRef.on('value', snapshot => {
  currentBookNum = snapshot.numChildren();
});


function Book(title, author, numPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readStatus = readStatus;
    
    Book.prototype.toggleReadStatus = function(bookIndex) {
        this.readStatus = (this.readStatus == "read") ? "unread" : "read";
        dbLibraryRef.child("book" + bookIndex).update(
            {readStatus : this.readStatus}
        );
    }
}

//Add books from Firebase DB to array upon initial page load
dbLibraryRef.once("value", snapshot => {
    snapshot.forEach(childSnapshot => {
        myLibrary.push(new Book(childSnapshot.child("title").val(), childSnapshot.child("author").val(),
                                childSnapshot.child("numPages").val(), childSnapshot.child("readStatus").val()));
    });
    render(myLibrary);
})

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
    const libraryElement = document.getElementById("library");
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("h4");
    const bookNumPages = document.createElement("p");
    const bookReadStatus = document.createElement("p");
    const deleteBookButton = document.createElement("button");
    const toggleReadStatusButton = document.createElement("button");
    bookCard.classList.add("card");

    library.forEach((book, index) => {
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookNumPages.textContent = book.numPages;

        bookReadStatus.textContent = book.readStatus;
        bookReadStatus.classList.add("read-status");

        deleteBookButton.textContent = "Delete Book";
        deleteBookButton.classList.add("delete-book");

        toggleReadStatusButton.textContent = "Toggle Read\\Unread";
        toggleReadStatusButton.classList.add("toggle-read-status");

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookNumPages);
        bookCard.appendChild(bookReadStatus);
        bookCard.appendChild(deleteBookButton);
        bookCard.appendChild(toggleReadStatusButton);

        libraryElement.appendChild(bookCard.cloneNode(true));      
        bookCard.textContent = ""; 
    });

    recalibrateBookNumbers();
}

function recalibrateBookNumbers() {
    document.querySelectorAll(".card").forEach((card, index) => {
        let indexTracker = document.createAttribute("data-booknum");
        indexTracker.value = index;
        card.setAttributeNode(indexTracker);
    });

    document.querySelectorAll(".delete-book").forEach(b => b.onclick = function() {
        let bookIndex = b.parentElement.getAttribute("data-booknum");
        myLibrary.splice(bookIndex,1);
        document.querySelector(`[data-booknum='${bookIndex}'`).remove();
        dbLibraryRef.child("book" + bookIndex).remove();
    });

    document.querySelectorAll(".toggle-read-status").forEach(b => b.onclick = function() {
        let bookIndex = b.parentElement.getAttribute("data-booknum");
        myLibrary[bookIndex].toggleReadStatus(bookIndex);
        b.parentElement.querySelector(".read-status").textContent = myLibrary[bookIndex].readStatus;
    });
}

function writeNewBook() {
    let keyOfLastChild;
    const newBookForm = document.forms["new-book"];
    const newBook = new Book(newBookForm.elements["title"].value,
                             newBookForm.elements["author"].value,
                             newBookForm.elements["num-pages"].value,
                             newBookForm.elements["read-status"].value);
    closeNewBookForm();
    firebase.database().ref("/library").limitToLast(1).on("child_added", snapshot => {
        keyOfLastChild = snapshot.key;
    })
    firebase.database().ref("library/book" + (Number(keyOfLastChild.slice(-1)) + 1)).set(newBook);
    myLibrary.push(newBook);
    document.getElementById("library").innerHTML = "";
    render(myLibrary);
}

document.querySelector(".popup-form").addEventListener("submit", e => e.preventDefault());