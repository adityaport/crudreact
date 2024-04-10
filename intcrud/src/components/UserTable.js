import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../UserTable.css';


const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editName, setEditName] = useState('');
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: { first: '', last: '' }, email: '', picture: { thumbnail: 'https://via.placeholder.com/50' } });

    useEffect(() => {
        axios.get('https://randomuser.me/api/?results=10')
            .then(response => setUsers(response.data.results))
            .catch(error => console.error("Error fetching users: ", error));
    }, []);

    const handleDelete = (index) => setUsers(users.filter((_, i) => i !== index));

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditName(users[index].name.first);
    };

    const handleSaveEdit = () => {
        const updatedUsers = [...users];
        updatedUsers[editingIndex] = { ...updatedUsers[editingIndex], name: { ...updatedUsers[editingIndex].name, first: editName } };
        setUsers(updatedUsers);
        setEditingIndex(null);
    };

    const handleAddUserFormChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUserSubmit = (e) => {
        e.preventDefault();
        setUsers([...users, { ...newUser, name: { first: newUser.firstName, last: newUser.lastName }, email: newUser.email }]);
        setNewUser({ name: { first: '', last: '' }, email: '', picture: { thumbnail: 'https://via.placeholder.com/50' } }); // Reset form
        setShowAddUserForm(false); // Hide form
    };

    const toggleAddUserForm = () => setShowAddUserForm(!showAddUserForm);

    return (
        <div>
            <h1 style={{ marginTop: '12px', textAlign: 'center' }}>USER DETAILS DASHBOARD</h1>
  <button onClick={toggleAddUserForm} className="toggle-form-btn">{showAddUserForm ? 'Cancel' : 'Add User'}</button>

  {showAddUserForm && (
    <div className="form-container">
      <form onSubmit={handleAddUserSubmit} className="add-user-form">
        <input name="firstName" placeholder="First Name" value={newUser.firstName} onChange={handleAddUserFormChange} required />
        <input name="lastName" placeholder="Last Name" value={newUser.lastName} onChange={handleAddUserFormChange} required />
        <input name="email" type="email" placeholder="Email" value={newUser.email} onChange={handleAddUserFormChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )}
            <table>
            <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td><img src={user.picture.thumbnail} alt="User Thumbnail" style={{ width: '50px', height: '50px' }} /></td>
                            <td>{editingIndex === index ? <input value={editName} onChange={(e) => setEditName(e.target.value)} /> : `${user.name.first} ${user.name.last}`}</td>
                            <td>{user.email}</td>
                            <td>
                                {editingIndex === index ? <button onClick={handleSaveEdit}>Save</button> : <button onClick={() => handleEditClick(index)}>Edit</button>}
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
