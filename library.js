const myLibrary = [];
const books = document.querySelector(".books");
const submit = document.querySelector("#submitBtn");
const add = document.querySelector("#addBtn");
const cancel = document.querySelector("#cancelBtn");
const form = document.querySelector("#form");

function Book(title, author, pages, read, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const newBook = new Book(title, author, pages, read, id);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks(){
        const bookcard = document.createElement("div");
        bookcard.classList.add("bookcard");
        bookcard.innerHTML
        books.appendChild(bookcard);
}

add.addEventListener('click', () => dialog.showModal());

cancel.addEventListener('click', () => {
    dialog.close();
    form.reset();
});


dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
        dialog.close();
        form.reset();
    }
});

submit.addEventListener('click', () => {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");
    dialog.close();
    form.reset();
    addBookToLibrary(title, author, pages, read);

});

