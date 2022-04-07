import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    // Основной глобальный стейт (данные с начальным списком элементов)
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
        {id: v1(), title: "RestAPI", isDone: false},
    ]);

    // Функция установки значения фильтра в глобальный стейт
    function removeTasks(id: string) {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    // Функция добавления нового элемента списка в начало массива данных
    function addTask(title: string) {
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
        console.log(newTasks);
    }

    // Глобальный стейт для отслеживания фильтра
    const [filter, setFilter] = useState<FilterValuesType>('all');

    // Функция устанавливает значение фильтра
    function  changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    // Устанавливаем изначальный фильтр (значение)
    let tasksForToDoList;
    // Непосредственно фильтруем изначальный массив данных
    switch (filter) {
        case "completed":
            tasksForToDoList = tasks.filter(t => t.isDone)
            break
        case "active":
            tasksForToDoList = tasks.filter(t => !t.isDone)
            break
        default:
            tasksForToDoList = tasks;
    }

    return (
        <div className="App">
            <ToDoList title="What to learn"
                      tasks={tasksForToDoList}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
