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
//adds single task card to the DOM from one local storage item
function createTaskCard(key, task) {
    var cardEl = document.createElement('div');
    cardEl.id = key;
    cardEl.innerHTML = `
        <button id=closeButton class="close">X</button>    
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
        cardEl.classList.add('task-card');
        cardEl.style.cssText="width:fit-content";
        $('#closeButton').on('click', handleDeleteTask);
        return cardEl;
}

// Todo: create a function to render the task list and make cards draggable
// loop through divs. if 
// adds each card to the DOM
function renderTaskList() {
    const entries = Object.entries(localStorage)
        for(const [key, value] of entries){ 
        var cardData = JSON.parse(value)
        var cardEl = createTaskCard(key, cardData);
        if(cardData.status == "todo"){
            $('#todo-cards').css({top: 0,left: 0}).append(cardEl);
            if(dayjs(cardData.dueDate).diff(dayjs(), 'day') > 1){
                console.log("cardEl" , cardEl);
                console.log("cardData" , cardData);
                cardEl.style.backgroundColor = "#ffffff"; //white
            }else if(dayjs(cardData.dueDate).diff(dayjs(), 'day') < 0){
                cardEl.style.backgroundColor = "#ff0000"; //red
            }else{
                cardEl.style.backgroundColor = "#FFFF00"; //yellow
            }
        }else if(cardData.status == "inProgress"){
            document.getElementById('in-progress-cards').appendChild(cardEl);
            if(dayjs(cardData.dueDate).diff(dayjs(), 'day') > 1){
                cardEl.style.backgroundColor = "#ffffff"; //white
            }else if(dayjs(cardData.dueDate).diff(dayjs(), 'day') < 0){
                cardEl.style.backgroundColor = "#ff0000"; //red
            }else{
                cardEl.style.backgroundColor = "#FFFF00"; //yellow
            }
        }else{
            document.getElementById('done-cards').appendChild(cardEl);
            cardEl.style.backgroundColor = "#ffffff"; //white
        }
    };
}

// Todo: create a function to handle adding a new task
//div for popup box
// this is just data in local storage
function handleAddTask(event){
    event.preventDefault(); // Prevent form submission refresh

    // Get form values
    var title = document.getElementById('title').value;
    var dueDate = document.getElementById('dueDate').value;
    var description = document.getElementById('description').value;

    const formItems = {
        "title": title,
        "dueDate": dueDate,
        "description": description,
        "status": "todo"
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

    //allows popup for date picker in when clicking into the date entry line
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
function handleDeleteTask(event, ui){
    var cardKey = $(this).parent('.task-card')
    var cardId = cardKey[0].attributes[0].value
        localStorage.removeItem(cardId);
        cardKey.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    $( ".dragArea" ).droppable({
        
        scope: 'tasks',
        //based on where card was dropped, run through date logic if not in done,if you are in done, set status to done.
        drop: function( event, ui ) {
            var cardKey = $(ui.draggable)[0].attributes["id"].value
            const task = JSON.parse(localStorage.getItem(cardKey))
            console.log("task", task)
            console.log("this", this)
            var area = $(this).find(".area")
            const areaid = area[0].attributes["id"].value
            console.log("area", areaid)
            
            if(areaid === "todo-cards"){
                task.status = "todo"
            } else if(areaid === "in-progress-cards"){
                task.status = "inProgress"
            } else
                task.status = "done"

            localStorage.setItem(cardKey, JSON.stringify(task));    
            var box = $(ui.draggable).html()     
            $( ".box" ).draggable( "option", "revert", false );
            

            //Realign item
            $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
        }
    })
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $( ".task-card" ).draggable({
        scope: 'tasks',
        revertDuration: 100,
        start: function( event, ui ) {
            //Reset
            $( ".task-card" ).draggable( "option", "revert", true );
            $('.result').html('-');
        }
    });
    
    handleDrop();

});
