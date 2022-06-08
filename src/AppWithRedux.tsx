import React, {useReducer} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {FullInput} from "./components/FullInput";
import {v1} from "uuid";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType, TodolistType} from "./App";


export type FilterValuesType = "all" | "completed" | "active";

function AppWithRedux() {
    // v1() function to make ID for the first two ToDoList
    let todolistID1 = v1();
    let todolistID2 = v1();
    // // Global state (data with an initial list of ToDoList)
    // let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
    // // Global state (data with an initial list of elements in ToDoList)
    // let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todolistID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS/TS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: "Milk", isDone: false},
    //         {id: v1(), title: "Bread", isDone: false},
    //         {id: v1(), title: "Eggs", isDone: false},
    //         {id: v1(), title: "Apples", isDone: false},
    //         {id: v1(), title: "Bananas", isDone: false},
    //     ]
    // });

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    // Function to remove task from initial state by ID
    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }

    // Function to add task
    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }

    // Function to change status of the task
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }

    // Function to change filter
    function changeFilter(todolistId: string, value: FilterValuesType) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }

    // Function to remove ToDoList
    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatch(action)
    }

    // Function to add ToDoList
    function addTodolist(newTitle: string) {
        const action = addTodolistAC(newTitle);
        dispatch(action);
    }

    // Function to edit ToDoList title
    function editTodolist(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(todolistId, newTitle);
        dispatch(action);
    }

    // Function to edit task title in ToDoList
    function editTask(todolistId: string, taskID: string, newTitle: string) {
        const action = changeTaskTitleAC(todolistId, taskID, newTitle);
        dispatch(action)
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <FullInput callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>

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
                        return <Grid item key={el.id}>
                            <Paper style={{padding: "10px"}}>
                                <ToDoList
                                    key={el.id}
                                    id={el.id}
                                    title={el.title}
                                    tasks={tasksForToDoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={el.filter}
                                    removeTodolist={removeTodolist}
                                    editTodolist={editTodolist}
                                    editTask={editTask}
                                />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
