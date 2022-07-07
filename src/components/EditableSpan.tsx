import React, {useCallback} from 'react';

export type EditableSpanPropsType = {
    title: string,
    callBack: (newTitle: string) => void,
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({
                                                                             title,
                                                                             callBack
                                                                         }) => {
    // State for editing mode
    let [edit, setEdit] = React.useState(false);
    // State for title
    let [newTitle, setNewTitle] = React.useState(title);
    // Function to change title
    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
    }, [setNewTitle]);
    // Function to enter edit mode on double click
    const onDoubleClickHandler = useCallback(() => {
        setEdit(true);
        setNewTitle(title);
    }, [title]);
    // Function to exit edit mode and save new title (on blur)
    const onBlurHandler = useCallback(() => {
        setEdit(false);
        callBack(newTitle);
    }, [newTitle, callBack]);
    // Function to exit edit mode and save new title (on enter)
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
            : <span onDoubleClick={onDoubleClickHandler}>{title}</span>

    );
})
