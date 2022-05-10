import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "@mui/material";

type FullinputPropsType = {
    callBack: (newTitle: string) => void,
}

export const Fullinput: React.FC<FullinputPropsType> = (props) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
                   placeholder="text..."
            />
            <Button onClick={addTask}
                    variant="contained"
                    size="small"
                    style={{
                        maxWidth: '25px',
                        maxHeight: '25px',
                        minWidth: '25px',
                        minHeight: '25px'
                    }}
            >
                +
            </Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}