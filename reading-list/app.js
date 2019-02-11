
const bookList = document.querySelector("#book-list")


const parent = bookList.parentNode;
const parentEl = bookList.parentElement; //wrapper
const body = bookList.parentElement.parentElement //body

const childNodes = bookList.childNodes // all children, not only elements
const childEls = bookList.children //only element children

//Siblings

const nextSibling = bookList.nextSibling // will be text not an element
const nextSiblingEl = bookList.nextElementSibling // is <form>
const previousSiblingEl = bookList.previousElementSibling //is <header>

bookList.previousElementSibling.querySelector("p").innerHTML += '<br/> Too cool for everyone else'; 


//Event
var h2 = document.querySelector("#book-list h2")
h2.addEventListener("click", function(e){
    console.log(e.target);
    console.log(e);
})

/*
let btns = document.querySelectorAll("#book-list ul li span:last-child");

Array.from(btns).forEach(function(btn){
    btn.addEventListener('click', function(e){

        const li = e.target.parentElement;
        li.parentNode.removeChild(li)
    });
});
*/

//Event bubbling

//how to delete books
const list = document.querySelector("#book-list ul");
list.addEventListener("click", function(e){
    if(e.target.className == "delete"){
        const li = e.target.parentElement;
        list.removeChild(li);
    }
})

//Interacting with Forms

//document.forms to grab forms

//add book-list
const addForm = document.forms['add-book']
addForm.addEventListener('submit', function(e){
    e.preventDefault();
    const value = addForm.querySelector('input[type = "text"]').value;
    //create Elements
    const li = document.createElement("li");
    const bookName = document.createElement('span');
    const deleteBtn = document.createElement('span');


    //add content
    deleteBtn.textContent = "delete";
    bookName.textContent = value;


    //add classes

    bookName.classList.add("name");
    deleteBtn.classList.add("delete");

    //append to DOM

    li.appendChild(bookName);
    li.appendChild(deleteBtn);
    list.appendChild(li);

})

//hide books

const hideBox = document.querySelector("#hide");
hideBox.addEventListener("change", function(e){
    if(hideBox.checked){
        list.style.display = "none";
    } else{
        list.style.display = "initial"
    }
})


//Search filter
const searchBar = document.forms["search-books"].querySelector("input");
searchBar.addEventListener("keyup", function(e){
    const term = e.target.value.toLowerCase();
    const books = list.getElementsByTagName("li");
    Array.from(books).forEach(function(book){
        const title = book.firstElementChild.textContent;
        if(title.toLowerCase().indexOf(term) != -1){
            book.style.display = "block";
        }else{
            book.style.display = "none";
        }
    })
})


//tabbed content
const tabs = document.querySelector(".tabs");
const panels = document.querySelectorAll(".panel");


tabs.addEventListener("click", function(e){
    if(e.target.tagName == "LI"){
        const targetPanel = document.querySelector(e.target.dataset.target);
        panels.forEach(function(panel){
            if (panel == targetPanel){
                panel.classList.add("active");
                
            } else{
                panel.classList.remove("active");
               
            }
        })
    }
})

