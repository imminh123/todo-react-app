import React, { useState } from 'react';
import { PRIORITY_LIST, RenderItem } from '../../const';
import './style.scss';

interface Props {
  className?: string;
  onChange: (value: RenderItem) => void;
  data: Array<RenderItem>;
  value: string;
}


export const Dropdown = ({className, onChange, data, value} : Props) => {
  const [isActive, setIsActive] = useState(false);
  
  const handleSelectItem = (item : RenderItem) => {
    onChange(item)
    setIsActive(false);
  }

  const getValue = (value: string) => {
    return PRIORITY_LIST.filter(item => item.value === value);
  }

  return (
    <div className={`dropdownContainer ${className}`}>
      <div className={`${isActive && "active"} dropdown`}>
        <span className="selLabel" onClick={() => setIsActive(!isActive)}>{getValue(value)[0].label}</span>
        <input type="hidden" name="cd-dropdown" />
        <ul className="dropdown-list">
          {
            data && data.map(item => (
              <li onClick={() => handleSelectItem(item)} key={item.value}>
                <span>{item.label}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}