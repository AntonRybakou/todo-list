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
    // Добавляем локальный стейт, для наблюдения ввода в поле input
    const [newTaskTitle, setNewTaskTitle] = React.useState<string>('');

    // Прорисовка элементов списка методом map из глобального стейта(в App)
    const tasksList = props.tasks.map(t => {
        // Кнопка для удаления элемента списка
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

    // Каждое введённое значение в поле input добавляем в стейт
    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    // При нажатии 'enter' добавляем новый элемент в начало списка и очищаем локальный стейт
    const onChangeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    // Функция добавления нового элемента в начало списка
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    // Функция изменения значения фильтра (отправка в глобальный стейт значения 'all')
    const onAllClickHandler = () => props.changeFilter('all')

    // Функция изменения значения фильтра (отправка в глобальный стейт значения 'active')
    const onActiveClickHandler = () => props.changeFilter('active')

    // Функция изменения значения фильтра (отправка в глобальный стейт значения 'completed')
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