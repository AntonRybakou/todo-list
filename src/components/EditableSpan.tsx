import React from 'react';

type EditableSpanPropsType = {
    title: string,
    callBack: (newTitle: string) => void,
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    let [edit, setEdit] = React.useState(false);
    let [newTitle, setNewtitle] = React.useState(props.title);
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewtitle(e.target.value)
    }
    const onDoubleClickHandler = () => {
        setEdit(!edit);
        props.callBack(newTitle)
    }

    return (
        edit
            ? <input
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={onDoubleClickHandler}
                autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>

    );
}