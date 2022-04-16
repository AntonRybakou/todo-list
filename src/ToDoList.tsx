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
    changeTaskStatus: (taskID: string, isDone: boolean) => void,
    filter: FilterValuesType,
}

export const ToDoList: React.FC<PropsType> = (props) => {
    // Добавляем локальный стейт, для наблюдения ввода в поле input
    const [newTaskTitle, setNewTaskTitle] = React.useState<string>('');
    const [error, setError] = React.useState<string | null>(null);

    // Прорисовка элементов списка методом map из глобального стейта(в App)
    const tasksList = props.tasks.map(t => {
        // Кнопка для удаления элемента списка
        const onClickRemoveTask = () => {
            props.removeTasks(t.id)
        };
        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        };
        return (
            <li key={t.id}
            className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeHandler}
                />
                <span>{t.title}</span>
                <button onClick={onClickRemoveTask}>-</button>
            </li>
        )
    });

    // Каждое введённое значение в поле input добавляем в стейт
    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
        setError(null);
    }

    // При нажатии 'enter' добавляем новый элемент в начало списка и очищаем локальный стейт
    const onChangeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            if (newTaskTitle.trim() === '') {
                setError('Title is required');
                setNewTaskTitle('');
                return;
            }
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    // Функция добавления нового элемента в начало списка
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required');
            setNewTaskTitle('');
            return;
        }
        props.addTask(newTaskTitle.trim());
        setNewTaskTitle('');
        setError(null);
    }

    // Functions to change the filter value
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
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button className={(props.filter === 'all') ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={(props.filter === 'active') ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={(props.filter === 'completed') ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};