import React, {useCallback} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {FullInput} from "./components/FullInput";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    // Function to remove task from initial state by ID
    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, [dispatch]);

    // Function to add task
    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, [dispatch]);

    // Function to change status of the task
    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, [dispatch]);

    // Function to change filter
    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    // Function to remove ToDoList
    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id);
        dispatch(action)
    }, [dispatch]);

    // Function to add ToDoList
    const addTodolist = useCallback((newTitle: string) => {
        const action = addTodolistAC(newTitle);
        dispatch(action);
    }, [dispatch]);

    // Function to change ToDoList title
    const editTodolist = useCallback((todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle);
        dispatch(action);
    }, [dispatch]);

    // Function to change task title in ToDoList
    const changeTaskTitle = useCallback((todolistId: string, taskID: string, newTitle: string) => {
        const action = changeTaskTitleAC(todolistId, taskID, newTitle);
        dispatch(action)
    }, [dispatch]);

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
                        const tasksForToDoList = tasks[el.id];

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
                                    changeTaskTitle={changeTaskTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
