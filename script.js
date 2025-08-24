const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.querySelector("#inputValue");




//4/
const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("my to do list"));
}
//12 
const  addTodoListLocalStorage = (addItemInList) => {
    return localStorage.setItem("my to do list", JSON.stringify(addItemInList))
}




let addItemInList = getTodoListFromLocal() || [];    // global scope

//7//
const addTodoDynamicElement = (curEle) => {
    const div = document.createElement("div");
div.classList.add("main_todo_div");
div.innerHTML = `<li>${curEle}</li> 
<button class="deleteBtn"> Delete </button>`;
mainTodoElem.append(div);  // appen the child div
}



//1/ 
const addTodoList = (e) => {
e.preventDefault();   //! prevent the input property to submit data

//3
const todoListValue = inputValue.value.trim();   // it remove the whitespace (trim());
inputValue.value = "";  // empty the input feild after add the task

if(todoListValue != "" && !addItemInList.includes(todoListValue)){    // 1 empty nhi hona chahiye and  2// this inclue method check duplicate value and not add it again
addItemInList.push(todoListValue);
// to not to add  again repititive data
//! use when uniquness is priority and order does not metter (filtter array);
addItemInList = [...new Set(addItemInList)];    
console.log(addItemInList);
localStorage.setItem("my to do list", JSON.stringify(addItemInList));


//2
addTodoDynamicElement(todoListValue);
}
};

//6/  show to do list
const showTodoList =() => {
    console.log(addItemInList);
   
    addItemInList.forEach((curEle) => {
        addTodoDynamicElement(curEle);
    })
    

};
// call the function
showTodoList();


//9 remove the data
const removeTodoElem = (e) => {
    const todoToRemove = e.target;
    let todoListContent = todoToRemove.previousElementSibling.innerText;
    let parentEle = todoToRemove.parentElement;  // add the parent element 
    console.log(todoListContent);

//10/
    addItemInList =  addItemInList.filter((curTodo) => {
    return curTodo != todoListContent;

});
//11/ add in local stprage 
addTodoListLocalStorage (addItemInList);
//13
parentEle.remove();

console.log(addItemInList);
}
//8
mainTodoElem.addEventListener("click", (e) => {
    e.preventDefault();

    //14 
    console.log(e.target);
    if(e.target.classList.contains("deleteBtn")){
    removeTodoElem(e);
}
})

//
document.querySelector(".btn").addEventListener("click", (e) => {
    
    addTodoList(e);
})

