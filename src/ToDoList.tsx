import React from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

export type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTasks: (id: number) => void,
    changeFilter: (value: FilterValuesType) => void,
}

export const ToDoList: React.FC<PropsType> = (props) => {

    const tasksList = props.tasks.map(t => {
            const onClickRemoveTask = () => {
                props.removeTasks(t.id)
            }
            return (
                <li><input type="checkbox" checked={t.isDone}/>
                    <span>{t.title} </span>
                    <button onClick={onClickRemoveTask}>-</button>
                </li>
            )
        }
    );

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};