import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

export type FullInputPropsType = {
    callBack: (newTitle: string) => void,
}

export const FullInput: React.FC<FullInputPropsType> = React.memo((props) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.callBack(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return (
        <div>
            <TextField variant="outlined"
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       label="Title"
                       helperText={error}
            />

            <IconButton color="primary" onClick={addTask}>
                <AddBox/>
            </IconButton>
        </div>
    );
})
