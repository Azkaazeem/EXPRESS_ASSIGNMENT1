const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: Ye aane wali JSON request ko parse karta hai (Road Jump / Speed breaker ki tarah)
app.use(express.json());

// Database ki jagah humari simple Array (Assignment ki requirement)
let users = [];

// ==========================================
// 1. CREATE (POST) - Naya data array mein add karna
// ==========================================
app.post('/api/users', (req, res) => {
    const newUser = {
        id: Date.now(), // Unique ID generate karne ki professional trick
        name: req.body.name,
        role: req.body.role
    };
    
    users.push(newUser); // Data ko array mein daal diya
    res.status(201).json({ message: "User created successfully!", data: newUser });
});

// ==========================================
// 2. READ (GET) - Array ka sara data dekhna
// ==========================================
app.get('/api/users', (req, res) => {
    res.status(200).json({ totalUsers: users.length, data: users });
});

// ==========================================
// 3. EDIT / UPDATE (PUT) - Kisi specific user ko edit karna
// ==========================================
app.put('/api/users/:id', (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    
    // Array mein check karna ke user exist karta hai ya nahi
    const userIndex = users.findIndex(user => user.id === idToUpdate);

    if (userIndex !== -1) {
        // Agar user mil gaya tou uski details update kar do
        users[userIndex].name = req.body.name || users[userIndex].name;
        users[userIndex].role = req.body.role || users[userIndex].role;
        
        res.status(200).json({ message: "User updated successfully!", data: users[userIndex] });
    } else {
        res.status(404).json({ message: "User not found!" });
    }
});

// ==========================================
// 4. DELETE - Kisi specific user ko array se nikalna
// ==========================================
app.delete('/api/users/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    
    // Filter method use kar ke us ID wale user ko nikal diya
    users = users.filter(user => user.id !== idToDelete);
    
    res.status(200).json({ message: "User deleted successfully!", data: users });
});

// ==========================================
// Server ko start karna
// ==========================================
app.listen(PORT, () => {
    console.log(`Server is perfectly running on http://localhost:${PORT}`);
});