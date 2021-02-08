import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/button';
import { Calendar } from '../../../components/calendar';
import { Dropdown } from '../../../components/dropdown';
import { Input } from '../../../components/input';
import { PRIORITY_LIST, RenderItem, TODO_ITEM, TODO_STORAGE } from '../../../const';
import { save, remove, get } from '../../../services/storage'
import './style.scss';

interface Props {
    id: string;
    label: string;
    description: string;
    dueDate: string;
    priority: any;
    onUpdate: (type?: string) => void;
    onChecked: (id: string, checked: boolean) => void;
}

export const TodoItem = ({id, label, description, dueDate, priority, onUpdate, onChecked}: Props) => {
    const [active, setActive] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [updateDueDate, setUpdateDueDate] = useState('');
    const [updatePriority, setUpdatePriority] = useState<RenderItem>();
    const [checked, setChecked] = useState(false);
    const [currentStorage, setCurrentStorage] = useState(Array<TODO_ITEM>());

    const handleUpdateValue = () => {
        const updatedStorage = currentStorage.map(item => {
            if(item.id === id) {
                return {
                    id: id,
                    taskName: taskName,
                    taskDescription: taskDescription,
                    dueDate: updateDueDate,
                    priority: updatePriority
                }
            }
            return item;
        })
        save(TODO_STORAGE, updatedStorage);     
        setActive(false);
        onUpdate('update');
    }

    const handleRemoveTodo = () => {
        remove(TODO_STORAGE, id);
        onUpdate('delete');
    }

    useEffect(() => {
        setTaskName(label);
        setTaskDescription(description);
        setUpdateDueDate(dueDate);
        setUpdatePriority(priority);

        //get list todo
        const tempStorage = get(TODO_STORAGE);
        if (tempStorage) {
            setCurrentStorage(tempStorage)
        }
    }, [])

    return (
        <div className="todoItem">
            <div className="briefContainer">
                <div className="leftContainer">
                    <input type="checkbox" onChange={(e) => onChecked(id, e.target.checked)}/>
                    <p>{label}</p>
                </div>

                <div className="actionContainer">
                    <Button className="detailBtn" type="info" label="Detail" onClick={() => setActive(!active)} />
                    <Button type="danger" label="Remove" onClick={() => handleRemoveTodo()}/>
                </div>
            </div>

            {
                active && <div className="detailContainer">
                    <Input value={taskName} placeholder="Task name ..." className="addTaskInput" onChange={(value) => setTaskName(value)} />

                    <p className="label">Description</p>
                    <textarea value={taskDescription} rows={8} onChange={(e) => setTaskDescription(e.target.value)} />
                    <div className="dropdownBox">
                        <div className="calendarBox">
                            <p className="label">Due Date</p>
                            <Calendar onChange={(e) => setUpdateDueDate(e.target.value)} value={updateDueDate} />
                        </div>
                        <div className="priorityBox">
                            <p className="label">Priority</p>
                            <Dropdown className="dropdownItem" value={updatePriority!.value} data={PRIORITY_LIST} onChange={(value) => setUpdatePriority(value)} />
                        </div>
                    </div>
                    <Button className="updateBtn" label="Update" onClick={() => handleUpdateValue()} />
                </div>
            }

        </div>


    );
}

