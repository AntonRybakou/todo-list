import {TasksStateType} from '../App';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type Action2Type = {
    type: '2'
    id: string
}

type ActionType = RemoveTaskActionType | Action2Type;

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const newState = {...state};
            newState[action.todolistId] = state[action.todolistId].filter(t => t.id !== action.taskId);
            return newState;
        }
        case '2': {
            return {...state};
        }
        default:
            throw new Error('I dont know such type of action')
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

export const addTaskAC = (id: string): Action2Type => {
    return {type: '', id: id}
}
