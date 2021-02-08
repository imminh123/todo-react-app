import React, { useEffect, useState } from 'react';
import { Dropdown } from '../../components/dropdown/index'
import { Calendar } from '../../components/calendar/index'
import { Button } from '../../components/button/index'
import { Input } from '../../components/input/index'
import { Alert } from '../../components/alert/index'
import './style.scss';
import { PRIORITY, PRIORITY_LIST, TODO_STORAGE, TODO_ITEM } from '../../const'
import { save, get, removeBulk } from '../../services/storage'
import { TodoItem } from './todo-item';
import { v4 as uuidv4 } from 'uuid';
import { type } from 'os';

export const ListTodo = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState(PRIORITY.NORMAL);
    const [searchValue, setSearchValue] = useState('');
    const [currentStorage, setCurrentStorage] = useState(Array<TODO_ITEM>());
    const [displayTodos, setDisplayTodos] = useState(Array<TODO_ITEM>());
    const [selectedItem, setSelectedItem] = useState(Array<string>());
    const [alertType, setAlertType] = useState<'update' | 'delete'>('update');
    const [alertMessage, setAlertMessage] = useState('');
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [isShowingBulkActions, setIsShowingBulkActions] = useState(false);

    const handleAddTodo = () => {
        const id = uuidv4();
        const todoItem = { id, taskName, taskDescription, dueDate, priority };
        save(TODO_STORAGE, [...currentStorage, todoItem]);
        setCurrentStorage([...currentStorage, todoItem]);

        setTaskName('');
        setTaskDescription('');
    }

    const handleOnTodoUpdate = (type: string) => {
        if (type === 'update') {
            setAlertType('update');
            setAlertMessage("Todo Updated :')");
        } else if (type === 'delete') {
            setAlertType('delete');
            setAlertMessage("Todo Removed :'(");
        }
        getCurrentStorage();

        setIsShowAlert(true);
        setTimeout(() => {
            setIsShowAlert(false);
        }, 1500);
    }

    const handleOnCheckedTodo = (id: string, checked: boolean) => {
        if(checked) {
            setSelectedItem([...selectedItem, id]);
        }else {
            const filteredSeletedItem = selectedItem.filter(item => item !== id);
            setSelectedItem(filteredSeletedItem);
        }
    }

    useEffect(() => {
        //check selected item list to show bulk action action bar
        if(selectedItem.length > 0) {
            setIsShowingBulkActions(true)
        }else {
            setIsShowingBulkActions(false)
        }
    })

    useEffect(() => {

        getCurrentStorage();

        //set default due date
        const date = new Date;
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let parsedMonth = '';
        let parsedDate = '';

        if (month < 10) {
            parsedMonth = '0' + month;
        } else {
            parsedMonth = month + '';
        }

        if (day < 10) {
            parsedDate = '0' + day;
        } else {
            parsedDate = day + '';
        }

        setDueDate(`${year}-${parsedMonth}-${parsedDate}`);
    }, [])

    useEffect(() => {
        setDisplayTodos(currentStorage);
    }, [currentStorage])

    const getCurrentStorage = () => {
        //get list todo
        const tempStorage = get(TODO_STORAGE);
        if (tempStorage) {
            setCurrentStorage(tempStorage)
        }
    }

    const handleSearchTodo = (value: string) => {
        const searchValue = value.toLowerCase();
        const filteredTodo = currentStorage.filter(item => item.taskName.toLowerCase().includes(searchValue) || item.taskDescription.toLowerCase().includes(searchValue));
        setDisplayTodos(filteredTodo);
    }

    const handleBulkDone = () => {

    }

    const handleBulkDelete = () => {
        removeBulk(TODO_STORAGE, selectedItem);
        handleOnTodoUpdate('delete');
        setSelectedItem([]);        
    }

    return (
        <div className="mainContainer">
            <div className="createTodoContainer">
                <h1 className="title">New Task</h1>

                <Input placeholder="Add new task..." className="addTaskInput" onChange={(value) => setTaskName(value)} value={taskName} />

                <p className="label">Description</p>
                <textarea rows={8} onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} />
                <div className="dropdownBox">
                    <div className="calendarBox">
                        <p className="label">Due Date</p>
                        <Calendar onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
                    </div>
                    <div className="priorityBox">
                        <p className="label">Priority</p>
                        <Dropdown className="dropdownItem" value={priority.value} data={PRIORITY_LIST} onChange={(value) => setPriority(value)} />
                    </div>
                </div>
                <Button className="addBtn" label="Add" onClick={() => handleAddTodo()} />
            </div>

            <div className="listTodoContainer">
                <div className="wrapper">
                    <h1 className="title">List todo</h1>
                    <Input placeholder="Search ..." onChange={(value) => handleSearchTodo(value)} className="searchInput" />
                    {
                        displayTodos && displayTodos.map(item => (
                            <TodoItem onChecked={(id, checked) => handleOnCheckedTodo(id, checked)} onUpdate={(type: any) => handleOnTodoUpdate(type)} id={item.id} label={item.taskName} description={item.taskDescription} dueDate={item.dueDate} priority={item.priority} key={item.id} />
                        ))
                    }
                </div>

                {
                    isShowingBulkActions && <div className="bulkAction">
                        <p>Bulk Action: </p>
                        <div className="bulkActionContainer">
                            <Button className="doneBtn" type="primary" label="Done" onClick={() => handleBulkDone()} />
                            <Button type="danger" label="Remove" onClick={() => handleBulkDelete()} />
                        </div>
                    </div>
                }

            </div>

            {isShowAlert && <Alert type={alertType} message={alertMessage} />}
        </div>

    );
}

