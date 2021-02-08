import React, { useState } from 'react';
import './style.scss';

interface Props {
  onChange: (value: any) => void;
  value?: any;
}

export const Calendar = ({onChange, value} : Props) => {
  return (
    <input type="date" className="calendar" value={value} onChange={onChange}/>
  );
}