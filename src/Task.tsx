import React, {ChangeEvent, useCallback} from 'react';
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./components/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {TaskType} from "./ToDoList";

export type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}

export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             changeTaskStatus,
                                                             changeTaskTitle,
                                                             removeTask,
                                                             task,
                                                             todolistId
                                                         }) => {
    // Function to remove task from initial state by ID
    const onClickHandler = () => removeTask(task.id, todolistId)
    // Function to change task status
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistId);
    }
    // Function to change task title
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
    }, [changeTaskTitle, todolistId, task.id]);

    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />
        <EditableSpan title={task.title} callBack={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
});

export default Task;
