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

export const ToDoList: React.FC<PropsType> = React.memo(({
                                                             id,
                                                             title,
                                                             tasks,
                                                             removeTask,
                                                             changeFilter,
                                                             addTask,
                                                             changeTaskStatus,
                                                             removeTodolist,
                                                             filter,
                                                             editTodolist,
                                                             changeTaskTitle
                                                         }) => {

    // Function to remove todolist
    const removeTodolistHandler = () => removeTodolist(id)

    // Functions to change the filter values:
    const onAllClickHandler = useCallback(() => changeFilter(id, 'all'), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter(id, 'active'), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter(id, 'completed'), [changeFilter, id])

    // Function to add new task using title from the input
    const addTaskHandler = useCallback((newTitle: string) => {
        addTask(newTitle, id)
    }, [addTask, id])

    // Function to edit a title of ToDoList
    const editTodolistHandler = (newTitle: string) => {
        editTodolist(id, newTitle)
    }

    // Filtering tasks by filter value
    let tasksForToDoList;
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
        <div>
            <h3>
                <EditableSpan title={title} callBack={editTodolistHandler}/>
                <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
            <FullInput callBack={addTaskHandler}/>
            <div>
                {
                    tasksForToDoList.map(t =>
                        <Task key={t.id}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                              removeTask={removeTask}
                              task={t}
                              todolistId={id}
                        />
                    )}
            </div>
            <div style={{paddingTop: "10px"}}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'inherit'}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>
                    Completed
                </Button>
            </div>
        </div>
    );
});
