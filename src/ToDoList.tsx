import React, {useCallback} from 'react';
import {FilterValuesType} from "./App";
import {EditableSpan} from "./components/EditableSpan";
import {FullInput} from "./components/FullInput";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Task from "./Task";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    editTodolist: (todolistId: string, newTitle: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const ToDoList: React.FC<PropsType> = React.memo((props) => {

    // Function to remove todolist
    const removeTodolistHandler = () => props.removeTodolist(props.id)

    // Functions to change the filter values:
    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])

    // Function to add new task using title from the input
    const addTaskHandler = useCallback((newTitle: string) => {
        props.addTask(newTitle, props.id)
    }, [props.addTask, props.id])

    // Function to edit a title of ToDoList
    const editTodolistHandler = (newTitle: string) => {
        props.editTodolist(props.id, newTitle)
    }

    // Filtering tasks by filter value
    let tasksForToDoList;
    switch (props.filter) {
        case "completed":
            tasksForToDoList = props.tasks.filter(t => t.isDone)
            break
        case "active":
            tasksForToDoList = props.tasks.filter(t => !t.isDone)
            break
        default:
            tasksForToDoList = props.tasks;
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={editTodolistHandler}/>
                <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
            <FullInput callBack={addTaskHandler}/>
            <div>
                {
                    tasksForToDoList.map(t =>
                        <Task key={t.id}
                              changeTaskStatus={props.changeTaskStatus}
                              changeTaskTitle={props.changeTaskTitle}
                              removeTask={props.removeTask}
                              task={t}
                              todolistId={props.id}
                        />
                    )}
            </div>
            <div style={{paddingTop: "10px"}}>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'inherit'}>
                    All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>
                    Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>
                    Completed
                </Button>
            </div>
        </div>
    );
});
