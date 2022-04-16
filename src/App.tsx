import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    // Global state (data with an initial list of elements)
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
        {id: v1(), title: "RestAPI", isDone: false},
    ]);
    // Function for setting the filter value in the global state
    function removeTasks(id: string) {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }
    // Function for adding a new list item to the beginning of a data array
    function addTask(title: string) {
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
        console.log(newTasks);
    }
    // Function to change status of the list item ("active" or "completed")
    function changeStatus(taskID: string, isDone: boolean) {
        let task = tasks.find ( t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }
    // Global state for filter
    const [filter, setFilter] = useState<FilterValuesType>('all');
    // The function sets the filter value
    function  changeFilter(value: FilterValuesType) {
        setFilter(value);
    }
    // Set the initial filter (value)
    let tasksForToDoList;
    // Filter the original state (depending on the filter value)
    switch (filter) {
        case "completed":
            tasksForToDoList = tasks.filter(t => t.isDone)
            break
        case "active":
            tasksForToDoList = tasks.filter(t => !t.isDone)
            break
        default:
            tasksForToDoList = tasks;
    }

    return (
        <div className="App">
            <ToDoList title="What to learn"
                      tasks={tasksForToDoList}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
