//stores the tasks for each category
//contents of these lists will be "printed out" in HTML in the "#task-list" div

//these will be stored on a local session in the browser
// so that when the window is closed and re-opened, the tasks are still there
var incomplete_list = [];
var completed_list = [];

//load the task data stored in the local session
//incomplete_list[]
//completed_list[]
//incomplete_list = localStorage.getItem('incomplete_list');
//completed_list = localStorage.getItem('completed_list');

//tracks which option (Incomplete or Completed) is currently selected
// by tracking if Incomplete is currently selected
var incomplete_selected = true;

//called when the "Incomplete" tab/option is clicked
function incomplete() {
    console.log("incomplete clicked");

    updateOptions();

    updateIncompleteTaskDiv();
}

//called when the "Completed" tab/option is clicked
function completed() {
    console.log("completed clicked");

    updateOptions();

    updateCompletedTaskDiv();
}

//update the appearance for the two selectable <th> options for Incomplete and Completed tasks
//the currently selected option will be highlighted with a thick cyan outline
function updateOptions() {
    if (incomplete_selected) {
        let completed_square = document.getElementById("todo-table-header-completed");

        completed_square.setAttribute('style', 'border: 3px solid #00e5ff; border-width: 10px;');

        let incomplete_square = document.getElementById('todo-table-header-incomplete');

        incomplete_square.setAttribute('style', 'border: 3px solid rgb(148, 0, 0); border-width: 3px;');

        incomplete_selected = false;

    } else {
        let completed_square = document.getElementById("todo-table-header-completed");

        completed_square.setAttribute('style', 'border: 3px solid #73AD21; border-width: 3px;');

        let incomplete_square = document.getElementById('todo-table-header-incomplete');

        incomplete_square.setAttribute('style', 'border: 3px solid #00e5ff; border-width: 10px;');

        incomplete_selected = true;
    }
}

//function that updates the "#incomplete-task-list" div with the actual contents of the task lists
function updateIncompleteTaskDiv() {
    //first clear the divs
    document.getElementById('completed-task-list').innerHTML = '';
    document.getElementById('incomplete-task-list').innerHTML = '';

    let div = document.getElementById('incomplete-task-list');

    //loop through the incomplete_list[] array and print out each task
    //each task will have its own box, as well as a "Mark as Complete" button, and a "Delete" button
    for (let i = incomplete_list.length - 1; i >= 0; i--) {

        let mark_as_done = document.createElement('button');
        mark_as_done.setAttribute('id', 'markAsDone_' + incomplete_list[i]);
        mark_as_done.setAttribute('onclick', 'markAsDone(this.id)');
        mark_as_done.innerHTML = 'Mark as Done';

        let delete_task = document.createElement('button');
        delete_task.setAttribute('id', 'deleteTask_' + incomplete_list[i]);
        delete_task.setAttribute('onclick', 'deleteTask(this.id)');
        delete_task.innerHTML = 'Delete';

        //string format for the box and buttons to be copy-pasted for each task

        let task_format = document.createElement('div');

        task_format.setAttribute('class', 'incomplete-task');
        task_format.setAttribute('id', 'div_' + incomplete_list[i]);

        task_format.innerHTML = incomplete_list[i];

        let line_break = document.createElement('br');
        let line_break2 = document.createElement('br');

        task_format.append(line_break);
        task_format.append(line_break2);

        task_format.append(mark_as_done);
        task_format.append(delete_task);

        div.appendChild(task_format);
    }
}

//called when the "Add Task" button is clicked
//add a new task to the incomplete_list[] task array if the entered value is not blank
function updateIncompleteTaskList() {
    let task = document.getElementById("todo-input").value;

    if (task != '') {
        incomplete_list.push(task);
        console.log("Stored task: " + incomplete_list);

        //store incomplete task in local session
        localStorage.setItem('incomplete_list', incomplete_list);

        console.log("localstorage = " + localStorage.getItem('incomplete_list'));

        document.getElementById("todo-input").value = "";

        //update the currently displayed div IF the Incomplete option is selected
        //otherwise do nothing
        if (incomplete_selected) {
            updateIncompleteTaskDiv();
        }

    } else {
        window.alert("Please enter a task into the text field");
    }
}

//function that updates the "#completed-task-list" div with the actual contents of the task lists
function updateCompletedTaskDiv() {
    //first clear the divs
    document.getElementById('incomplete-task-list').innerHTML = '';
    document.getElementById('completed-task-list').innerHTML = '';

    let div = document.getElementById('completed-task-list');

    //loop through the incomplete_list[] array and print out each task
    //each task will have its own box, as well as a "Mark as Complete" button, and a "Delete" button
    for (let i = completed_list.length - 1; i >= 0; i--) {

        let delete_task = document.createElement('button');
        delete_task.setAttribute('id', 'deleteCompletedTask_' + completed_list[i]);
        delete_task.setAttribute('onclick', 'deleteTask(this.id)');
        delete_task.innerHTML = 'Delete';

        //string format for the box and buttons to be copy-pasted for each task

        let task_format = document.createElement('div');

        task_format.setAttribute('class', 'completed-task');
        task_format.setAttribute('id', 'div_' + completed_list[i]);

        task_format.innerHTML = completed_list[i];

        let line_break = document.createElement('br');
        let line_break2 = document.createElement('br');

        task_format.append(line_break);
        task_format.append(line_break2);

        task_format.append(delete_task);

        div.appendChild(task_format);
    }
}

//called when a task's "Mark as Complete" button is clicked
//moves the given task from incomplete_list[] to completed_list[]
//removes the task's div element in the "#incomplete-task-list" div

//this is the only way to update completed_list[]
function markAsDone(markAsDone_id) {
    let task_id = markAsDone_id.slice(11, markAsDone_id.length);

    console.log("clicked mark as done");
    console.log(task_id);

    //loop through incomplete_list[] to find and delete the correct task
    for (let i = 0; i < incomplete_list.length; i++) {
        if (incomplete_list[i] === task_id) {
            incomplete_list.splice(i, 1);

            //update incomplete task list in local session
            localStorage.setItem('incomplete_list', incomplete_list);

            console.log("deleted a task from incomplete_list[]");
            break;
        }
    }

    //add it to completed_list[]
    completed_list.push(task_id);

    //update completed task list in local session
    localStorage.setItem('completed_list', completed_list);

    console.log("completed_list[] =");
    console.log(completed_list);

    //remove the DOM div element
    document.getElementById('div_' + task_id).remove();
}

//called when a task's "Delete" button is clicked
//removes the task from its corresponding global array
//removes the task's corresponding div element from the DOM
function deleteTask(deleteTask_id) {
    let task_type = deleteTask_id.slice(0, 10);
    console.log(task_type);
    
    //check which type of delete was called
    //deleting a task in the Complete div 
    // VS
    //deleting a task in the Incomplete div

    if (task_type === "deleteTask") {
        //delete incomplete task
        let task_id = deleteTask_id.slice(11, deleteTask_id.length);

        console.log("Deleting INCOMPLETE task " + task_id);

        //loop through incomplete_list[] to find and delete the correct task
        for (let i = 0; i < incomplete_list.length; i++) {
            if (incomplete_list[i] === task_id) {
                incomplete_list.splice(i, 1);

                //update incomplete task list in local session
                localStorage.setItem('incomplete_list', incomplete_list);

                console.log("deleted a task from incomplete_list[]");
                break;
            }
        }

        console.log(incomplete_list);

        //remove the DOM div element
        document.getElementById('div_' + task_id).remove();

    } else {
        //delete completed task
        let task_id = deleteTask_id.slice(20, deleteTask_id.length);

        console.log("Deleting COMPLETED task " + task_id);

        //loop through complete_list[] to find and delete the correct task
        for (let i = 0; i < completed_list.length; i++) {
            if (completed_list[i] === task_id) {
                completed_list.splice(i, 1);

                //update completed task list in local session
                localStorage.setItem('completed_list', completed_list);

                console.log("deleted a task from complete_list[]");
                break;
            }
        }

        //remove the DOM div element
        document.getElementById('div_' + task_id).remove();
    }
}