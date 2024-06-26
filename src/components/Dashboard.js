import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "your-collection-name"));
            const itemList = [];
            querySnapshot.forEach((doc) => {
                itemList.push({ id: doc.id, ...doc.data() });
            });
            setItems(itemList);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name} - {item.detail}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
