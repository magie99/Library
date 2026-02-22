const myLibrary = [];
const books = document.querySelector(".books");
const add = document.querySelector("#addBtn");
const cancel = document.querySelector("#cancelBtn");
const form = document.querySelector("#form");
const checkMarkEmpty = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-blank-outline</title><path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" /></svg>`;
const checkMarkChecked = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-outline</title><path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,5V19H5V5H19M10,17L6,13L7.41,11.58L10,14.17L16.59,7.58L18,9" /></svg>`;
const closeButton = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>';

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
    const book = myLibrary.at(-1);
    const bookcard = document.createElement("div");
    bookcard.classList.add("bookcard");
    bookcard.dataset.id = book.id;
    bookcard.innerHTML = `
        <div class="deleteBtn">${closeButton}</div>
        <h2>${book.title}</h2>
        <p>by ${book.author}</p>
        <p>${book.pages} pages</p>
    `;
    if(book.read === true){
        bookcard.innerHTML += `
            <div>
                <p>read</p>
                <div class="readStatus checked">${checkMarkChecked}</div>
            </div>
        `;
    }
    else{
        bookcard.innerHTML += `
            <div>
                <p>read</p>
                <div class="readStatus unchecked">${checkMarkEmpty}</div>
            </div>
        `;
    }
    books.appendChild(bookcard);
}

books.addEventListener('click', (e) => {
    const statusBox = e.target.closest(".readStatus");
    const deleteBtn = e.target.closest(".deleteBtn");
    const bookcard = e.target.closest(".bookcard");
    const book = myLibrary.find(item => item.id == bookcard.dataset.id);
    if(statusBox){
        if(statusBox.classList.contains("unchecked")){
            statusBox.innerHTML = checkMarkChecked;
            statusBox.classList.remove("unchecked");
            statusBox.classList.add("checked");
            book.read = true;
        }
        else{
            statusBox.innerHTML = checkMarkEmpty;
            statusBox.classList.remove("checked");
            statusBox.classList.add("unchecked");
            book.read = false;
        }
    }
    if(deleteBtn){
        const index = myLibrary.findIndex(item => item.id === book.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
            bookcard.remove();
        }
    }
});

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

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    dialog.close();
    form.reset();
    addBookToLibrary(title, author, pages, read);
});



