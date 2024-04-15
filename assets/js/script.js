// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    var i = 0;
    return function() {
        return i++;
    };
}

// Todo: create a function to create a task card
//puts card object into main website
function createTaskCard(task) {
    var card = document.createElement('div');
    card.classList.add('task-card');
    card.innerHTML = `
        <div class="cardTitle">
            <h3>${task.title}</h3>
        </div>
        <div class="cardDueDate">
            <p>${task.dueDate}</p>
        </div>
        <div class="cardDescription">
            By ${task.description}</p>
        </div>` 
        ;
    
        document.getElementById('todo-cards').appendChild(card);
}

// Todo: create a function to render the task list and make cards draggable
// loop through divs. if 
function renderTaskList() {

}

/*if status is todo
    put in first column
        if date is
            make white
        if date is 
            make yellow
        if date is 
            make red
 if status is active
    put in second column
        if date is
            make white
        if date is 
            make yellow
        if date is 
            make red
if status is done
    put in third column
        make white

*/

// Todo: create a function to handle adding a new task
//div for popup box
function handleAddTask(event){
    event.preventDefault(); // Prevent form submission refresh

    // Get form values
    var title = document.getElementById('title').value;
    var dueDate = document.getElementById('dueDate').value;
    var description = document.getElementById('description').value;

    const formItems = {
        "title": title,
        "dueDate": dueDate,
        "description": description
    }

    //attach specific number to each form created
    localStorage.setItem(`formItems_${localStorage.length}`, JSON.stringify(formItems));

    // Clear the form fields
    document.getElementById('title').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('description').value = '';

    //close form box
    document.getElementById("myModal").style.display = "none";

    console.log(localStorage);
}

document.addEventListener("DOMContentLoaded",function(event){
// Get the modal
    var modal = document.getElementById("myModal");

    //takes form entries and writes to local memory
    document.getElementById('myForm').addEventListener('submit', function(event) {
        handleAddTask(event)
    });

    // $('.datepicker').datepicker({
    //     clearBtn: true,
    //     format: "dd/mm/yyyy"
    // });

    // $("#dueDate").click(function(){
    //     $(".datepicker").show();
    // });

    $( function() {
        $( "#dueDate" ).datepicker();
      } );

    // Get the button that opens the modal
    // When the user clicks on the button, open the modal
    document.getElementById("myBtn").onclick = function() {
        modal.style.display = "block";
        };

    // Get the <span> element that closes the modal
    // When the user clicks on <span> (x), close the modal
    document.getElementsByClassName("close")[0].onclick = function() {
        modal.style.display = "none";
        };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
});

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
