export const PRIORITY = {
    LOW: {
        value: 'low',
        label: 'Low'
    },
    NORMAL: {
        value: 'normal',
        label: 'Normal'
    },
    HIGH: {
        value: 'high',
        label: 'High'
    }
}

export const PRIORITY_LIST = [{
    value: 'low',
    label: 'Low'
}, {
    value: 'normal',
    label: 'Normal'
},{
    value: 'high',
    label: 'High'
}]

export interface TODO_ITEM {
    id: string;
    taskName: string;
    taskDescription: string;
    priority: object;
    dueDate: string;
}

export interface RenderItem {
    value: string;
    label: string;
  }

export const TODO_STORAGE = 'todo_storage';