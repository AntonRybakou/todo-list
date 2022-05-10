import React from 'react';
import {FilterValuesType} from "./App";
import {EditableSpan} from "./components/EditableSpan";
import {Fullinput} from "./components/Fullinput";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from "@mui/material";

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
    // CallBack Function to edit a title of TODOlist
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
                <Button onClick={removeTodolistHandler}
                        variant="contained"
                        size="small"
                        style={{
                            maxWidth: '25px',
                            maxHeight: '25px',
                            minWidth: '25px',
                            minHeight: '25px'
                        }}
                >
                    -
                </Button>
            </h3>
            <Fullinput callBack={addTaskHandler}/>
            <ul>
                {
                    props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                            }

                            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                                <EditableSpan title={t.title} callBack={(newTitle) => editTaskHandler(t.id, newTitle)}/>
                                <IconButton aria-label="delete" size="small">
                                    <DeleteIcon onClick={onClickHandler} fontSize="inherit" />
                                </IconButton>
                            </li>
                        }
                    )}
            </ul>
            <div className={'active-filter'}>
                <Button variant="contained"
                        color={(props.filter === 'all') ? 'success' : 'inherit'}
                        onClick={onAllClickHandler}>
                    All
                </Button>
                <Button variant="contained"
                        color={(props.filter === 'active') ? 'success' : 'inherit'}
                        onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button variant="contained"
                        color={(props.filter === 'completed') ? 'success' : 'inherit'}
                        onClick={onCompletedClickHandler}>
                    Completed
                </Button>


                {/*<button className={(props.filter === 'all') ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>*/}
                {/*<button className={(props.filter === 'active') ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>*/}
                {/*<button className={(props.filter === 'completed') ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>*/}
            </div>
        </div>
    );
};