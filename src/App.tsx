import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
        {id: v1(), title: "RestAPI", isDone: false},
    ]);
    function removeTasks(id: string) {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }
    function addTask(title: string) {
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
        console.log(newTasks);
    }

    const [filter, setFilter] = useState<FilterValuesType>('all');
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }
    let tasksForToDoList;
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
            />
        </div>
    );
}

export default App;
