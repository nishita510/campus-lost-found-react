import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ItemsListPage from './pages/ItemsListPage';
import ReportItemPage from './pages/ReportItemPage';
import ItemDetailPage from './pages/ItemDetailPage';

// Dummy seed data
const SEED_ITEMS = [
  {
    id: 1,
    name: 'Blue Water Bottle',
    description: 'Hydro Flask blue bottle with a sticker of a mountain on it. Left it near the library entrance.',
    category: 'Personal Items',
    status: 'Lost',
    location: 'Central Library',
    date: '2024-03-10',
    reportedBy: 'Nishita',
    contactEmail: 'nishita@college.edu',
    contactPhone: '+91 98765 43210',
  },
  {
    id: 2,
    name: 'Scientific Calculator',
    description: 'Casio FX-991EX calculator found in the Engineering block classroom 204. Name "Rohan" written on the back.',
    category: 'Electronics',
    status: 'Found',
    location: 'Engineering Block - Room 204',
    date: '2024-03-11',
    reportedBy: 'Priya',
    contactEmail: 'priya.sharma@college.edu',
    contactPhone: '+91 91234 56789',
  },
  {
    id: 3,
    name: 'Black Backpack',
    description: 'Medium-sized black Wildcraft backpack. Has a red keychain. Found near the main cafeteria.',
    category: 'Bags',
    status: 'Found',
    location: 'Main Cafeteria',
    date: '2024-03-12',
    reportedBy: 'Arjun',
    contactEmail: 'arjun.k@college.edu',
    contactPhone: '+91 87654 32109',
  },
  {
    id: 4,
    name: 'Wireless Earbuds',
    description: 'White earbuds, possibly Samsung Galaxy Buds. Lost during the sports meet near the basketball court.',
    category: 'Electronics',
    status: 'Lost',
    location: 'Basketball Court',
    date: '2024-03-13',
    reportedBy: 'Nishita',
    contactEmail: 'nishita@college.edu',
    contactPhone: '+91 98765 43210',
  },
  {
    id: 5,
    name: 'Student ID Card',
    description: 'Found an ID card belonging to a student from the CSE department. Card found near the admin block.',
    category: 'Documents',
    status: 'Found',
    location: 'Admin Block',
    date: '2024-03-14',
    reportedBy: 'Meera',
    contactEmail: 'meera.r@college.edu',
    contactPhone: '+91 99001 12233',
  },
  {
    id: 6,
    name: 'Prescription Glasses',
    description: 'Black rimmed glasses in a brown case. Lost somewhere between the hostel and the main building.',
    category: 'Personal Items',
    status: 'Lost',
    location: 'Hostel to Main Building Path',
    date: '2024-03-15',
    reportedBy: 'Kiran',
    contactEmail: 'kiran.v@college.edu',
    contactPhone: '+91 96666 77788',
  },
];

function App() {
  // State to hold all items (seed + reported)
  const [items, setItems] = useState(SEED_ITEMS);

  // Function to add a new item
  function addItem(newItem) {
    setItems(function (prev) {
      return [newItem, ...prev];
    });
  }

  return (
    <Router>
      <Navbar username="Nishita" />
      <Routes>
        <Route path="/" element={<HomePage items={items} />} />
        <Route
          path="/items"
          element={<ItemsListPage items={items} />}
        />
        <Route
          path="/report"
          element={<ReportItemPage onAddItem={addItem} />}
        />
        <Route
          path="/items/:id"
          element={<ItemDetailPage items={items} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
