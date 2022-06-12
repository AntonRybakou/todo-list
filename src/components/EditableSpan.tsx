import React from 'react';

type EditableSpanPropsType = {
    title: string,
    callBack: (newTitle: string) => void,
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    let [edit, setEdit] = React.useState(false);
    let [newTitle, setNewTitle] = React.useState(props.title);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
    }

    const onDoubleClickHandler = () => {
        setEdit(true);
        setNewTitle(props.title);
    }

    const onBlurHandler = () => {
        setEdit(false);
        props.callBack(newTitle);
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlurHandler()
        }
    }

    return (
        edit
            ? <input
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onKeyDown={onKeyDownHandler}
                autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>

    );
}