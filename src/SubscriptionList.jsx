import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'subscriptions'));
        const subs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          renewalDate: doc.data().renewalDate.toDate(),
        }));
        setSubscriptions(subs);
      } catch (error) {
        console.error('Error fetching subscriptions: ', error);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'subscriptions', id));
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
      toast.success('Subscription deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete subscription.');
    }
  };

  const handlePayment = async (subscription) => {
    const options = {
      key: "rzp_test_Bv4aSoxsBcsAuQ", // Your Razorpay test key
      amount: subscription.cost * 100, // In paisa
      currency: "INR",
      name: subscription.name,
      description: `Renewal for ${subscription.name}`,
      handler: (response) => {
        toast.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        email: "user@example.com", // Optional: Replace with user's email
        contact: "1234567890", // Optional: Replace with user's contact number
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <h2>Subscription List</h2>
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.id}>
            {sub.name} - ₹{sub.cost} - Next Renewal: {sub.renewalDate.toLocaleDateString()}
            <button onClick={() => handleDelete(sub.id)}>Delete</button>
            <button onClick={() => handlePayment(sub)}>Pay Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;

