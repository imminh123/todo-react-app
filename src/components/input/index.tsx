import React, { useState } from 'react';
import './style.scss';

interface Props {
    placeholder?: string;
    className?: string;
    onChange?: (value : string) => void;
    value?: string;
}

export const Input = ({placeholder, className, onChange, value} : Props) => {

  return (
    <input className={`input ${className}`}placeholder={placeholder} value={value} onChange={(e) => onChange && onChange(e.target.value)}/>
  );
}