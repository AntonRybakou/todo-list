import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ]);

    function removeTasks(id: number) {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
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

    /*if (filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }*/


    return (
        <div className="App">
            <ToDoList title="What to learn"
                      tasks={tasksForToDoList}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
