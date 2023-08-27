"use client"

import React from 'react';
import { DayPicker } from 'react-day-picker';
// import styles from "./test.module.css"
import 'react-day-picker/dist/style.css';

const birthdayStyle = `.DayPicker-wrapper {
  display: flex;
  flex-direction: row;
  background-color: blue;
}

.DayPicker-Month {
  margin-right: 1rem;
}
.my-today { 
  font-weight: bold;
  font-size: 140%; 
  color: red;
}
}`;


export default function Test() {
  return (
    <div>
      <style>{birthdayStyle}</style>
      <DayPicker
        numberOfMonths={3}
        modifiersClassNames={{
          weekdays: 'DayPicker-wrapper',
          // today: 'DayPicker-Month',
          today: 'my-today',
        }} />
    </div>
  );
}

