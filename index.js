const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];

app.post('/api/users', (req, res) => {
    const newUser = {
        id: Date.now(),
        name: req.body.name,
        role: req.body.role
    };
    
    users.push(newUser);
    res.status(201).json({ message: "User created successfully!", data: newUser });
});

app.get('/api/users', (req, res) => {
    res.status(200).json({ totalUsers: users.length, data: users });
});

app.put('/api/users/:id', (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    
    const userIndex = users.findIndex(user => user.id === idToUpdate);

    if (userIndex !== -1) {
        users[userIndex].name = req.body.name || users[userIndex].name;
        users[userIndex].role = req.body.role || users[userIndex].role;
        
        res.status(200).json({ message: "User updated successfully!", data: users[userIndex] });
    } else {
        res.status(404).json({ message: "User not found!" });
    }
});

app.delete('/api/users/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    
    users = users.filter(user => user.id !== idToDelete);
    
    res.status(200).json({ message: "User deleted successfully!", data: users });
});

app.listen(PORT, () => {
    console.log(`Server is perfectly running on http://localhost:${PORT}`);
});