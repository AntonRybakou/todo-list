import React, {ChangeEvent, useCallback} from 'react';
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./components/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {TaskType} from "./ToDoList";

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.changeTaskTitle, props.todolistId, props.task.id]);

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan title={props.task.title} callBack={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>

});

export default Task;