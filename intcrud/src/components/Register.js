import React, { useState } from 'react';
import '../App.css'; 
import './register.css'; 


function Register() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const response = await fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, location }),
    });

    if (response.ok) {
      console.log("User Registered!");
      // Reset form or give user feedback
      setName('');
      setLocation('');
      alert('User Registered successfully!');
    } else {
      // Handle server errors or invalid responses
      alert('There was an issue adding the item.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Registeration</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Company Name"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default Register;
