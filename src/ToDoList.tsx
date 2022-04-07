import React from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTasks: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
}

export const ToDoList: React.FC<PropsType> = (props) => {

    const [newTaskTitle, setNewTaskTitle] = React.useState<string>('');

    const tasksList = props.tasks.map(t => {
        const onClickRemoveTask = () => {
            props.removeTasks(t.id)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title} </span>
                <button onClick={onClickRemoveTask}>-</button>
            </li>
        )
    });

    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onChangeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onChangeHandler}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};