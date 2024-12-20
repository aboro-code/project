import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

const AddSubscription = () => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [renewalDate, setRenewalDate] = useState('');

  const addSubscription = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'subscriptions'), {
        name,
        cost: parseFloat(cost),
        renewalDate: Timestamp.fromDate(new Date(renewalDate)),
      });
      setName('');
      setCost('');
      setRenewalDate('');
      alert('Subscription added successfully!');
    } catch (error) {
      console.error('Error adding subscription: ', error);
    }
  };

  return (
    <form onSubmit={addSubscription}>
      <input
        type="text"
        placeholder="Subscription Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        required
      />
      <input
        type="date"
        value={renewalDate}
        onChange={(e) => setRenewalDate(e.target.value)}
        required
      />
      <button type="submit">Add Subscription</button>
    </form>
  );
};

export default AddSubscription;
