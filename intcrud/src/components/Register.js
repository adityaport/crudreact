import React, { useState } from 'react';
import '../App.css'; // Ensure this is still here if you have global styles
import './register.css'; // Import the register styles


function Register() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming your backend endpoint is /items and it's accessible via the proxy setup
    const response = await fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });

    if (response.ok) {
      console.log("User Registered!");
      // Reset form or give user feedback
      setName('');
      setDescription('');
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
