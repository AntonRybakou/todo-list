import React from 'react';
import {FilterValuesType} from "./App";
import {EditableSpan} from "./components/EditableSpan";
import {FullInput} from "./components/FullInput";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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
    editTask: (todolistId: string, taskID: string, newTitle: string) => void
}

export const ToDoList: React.FC<PropsType> = (props) => {

    // Callback FN to remove todolist
    const removeTodolistHandler = () => props.removeTodolist(props.id)
    // Functions to change the filter values:
    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')
    // CallBack Function to add new task using title from the input
    const addTaskHandler = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }
    // CallBack Function to edit a title of ToDoList
    const editTodolistHandler = (newTitle: string) => {
        props.editTodolist(props.id, newTitle)
    }
    // CallBack Function to edit a task title
    const editTaskHandler = (tID: string, newTitle: string) => {
        props.editTask(props.id, tID, newTitle);
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
                    props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                            }

                            return <div key={t.id}
                                        className={t.isDone ? "is-done" : ""}>
                                <Checkbox
                                    checked={t.isDone}
                                    color="primary"
                                    onChange={onChangeHandler}
                                />

                                <EditableSpan title={t.title}
                                              callBack={(newTitle) => editTaskHandler(t.id, newTitle)}/>

                                <IconButton aria-label="delete"
                                            size="small"
                                            onClick={onClickHandler}>
                                    <DeleteIcon fontSize="inherit"/>
                                </IconButton>
                            </div>
                        }
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
                        color={'success'}>
                    Completed
                </Button>
            </div>
        </div>
    );
};