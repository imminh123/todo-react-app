import React from 'react';
import './style.scss';

interface Props {
    type?: 'danger' | 'primary' | 'info';
    className?: string;
    onClick?: () => void;
    label: string;
}

export const Button = ({type, className, onClick, label} : Props) => {
  return (
    <button className={`buttonContainer ${className} ${type}`} onClick={onClick}>{label}</button>
  );
}