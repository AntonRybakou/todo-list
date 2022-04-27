import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();
    // Global state (data with an initial list of todolists)
    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    // Global state (data with an initial list of elements)
    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Eggs", isDone: false},
            {id: v1(), title: "Apples", isDone: false},
            {id: v1(), title: "Bananas", isDone: false},
        ]
    });

    // Function change filter for todolist
    function removeTasks(todolistID: string, taskID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
    }

    // Function for adding a new list item to the beginning of the todolist
    function addTask(todolistID: string, title: string) {
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    // Function to change status of the list item ("active" or "completed")
    function changeStatus(todolistID: string, taskID: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone: isDone} : el)
        });
    }

    // The function sets the filter value
    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    // Function to remove todolist
    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(el => el.id !== todolistID));
        delete tasks[todolistID];
        console.log(tasks)
    }

    return (
        <div className="App">
            {todolists.map((el) => {
                let tasksForToDoList;
                switch (el.filter) {
                    case "completed":
                        tasksForToDoList = tasks[el.id].filter(t => t.isDone)
                        break
                    case "active":
                        tasksForToDoList = tasks[el.id].filter(t => !t.isDone)
                        break
                    default:
                        tasksForToDoList = tasks[el.id];
                }
                return (
                    <ToDoList
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForToDoList}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
