window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const new_task_input = document.querySelector("#new-task-text");

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const new_task_text = new_task_input.value;
        if(!new_task_text) {
            alert("Please type some task...");
            return;
        }
        
        // get new task unique id
        var task_id = getUniqueTaskID(0);

        // create task checkbox element
        var task_checkbox = document.createElement("input");
        task_checkbox.setAttribute("type", "checkbox");
        task_checkbox.setAttribute("id", "checkbox"+task_id);
        task_checkbox.setAttribute("class", "task_checkbox");
        task_checkbox.addEventListener("change", function() {
            ID = this.id.slice(-1);
            if (this.checked){
                task_text = document.getElementById("task-text"+ID).style.textDecoration = "line-through";
            }else{
                task_text = document.getElementById("task-text"+ID).style.textDecoration = "none";
            }
        })

        // create input | task on list
        var task = document.createElement("input");
        task.setAttribute("type", "text");
        task.setAttribute("id", "task-text"+task_id);
        task.setAttribute("class", "task_from_list");
        task.setAttribute("value", new_task_text);

        // create task delete button
        var delete_button = document.createElement("input");
        delete_button.setAttribute("type", "button");
        delete_button.setAttribute("id", "delete-button"+task_id);
        delete_button.setAttribute("class", "delete-button")
        delete_button.setAttribute("onclick", "delete_script(this)")
        
        //element <br>
        var next_line = document.createElement("br");
        next_line.setAttribute("id", "br"+task_id)

        //append to form
        var tasks_form = document.getElementById("tasks");
        tasks_form.append(task_checkbox, delete_button, task, next_line);

        // clear new task input
        new_task_input.value = "";
    })
})

function delete_script(delete_button) {
    ID = delete_button.id.slice(-1);
    elements = ["checkbox", "task-text", "delete-button", "br"]; 
    for (let i = 0; i<4; i++) {
        document.getElementById(elements[i] + ID).remove();
    }
}

function getUniqueTaskID(task_id) {

    if (!document.getElementById("br" + task_id)) {
        return task_id;
    }else{
        return getUniqueTaskID(task_id + 1);
    }

}