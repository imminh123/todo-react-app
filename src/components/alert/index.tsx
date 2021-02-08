import React from 'react';
import './style.scss';

interface Props {
    type: string;
    message: string;
}

export const Alert = ({type, message} : Props) => {
  return (
    <div className={`alertContainer ${type}`}>
        <p>{message}</p>
    </div>
  );
}