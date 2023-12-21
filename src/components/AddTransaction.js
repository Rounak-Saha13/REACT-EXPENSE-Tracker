import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date()); // Initialize with the current date

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
      date: date.toISOString(), // Convert date to string for storage
    };

    addTransaction(newTransaction);

    // Reset the form fields after adding the transaction
    setText('');
    setAmount(0);
    setDate(new Date());
  };

  return (
    <>
      <h3>Add new transaction (in ₹)</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter an Event"
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount <br /> (neg - expense, pos - income)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <div className="form-control date-picker-container">
          <label htmlFor="date">Date</label>
          <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
