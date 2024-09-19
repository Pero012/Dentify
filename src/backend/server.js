const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ssdssd442',
    database: 'dental_service_app'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Register
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        }
    );
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Exclude the password field from the returned user object
            const { password, ...userWithoutPassword } = user;
            res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Fetch all users 
app.get('/admin/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err); 
            return res.status(500).json({ message: 'Error fetching users' });
        }
        res.json(results);
    });
});

// Delete user and their appointments
app.delete('/admin/users/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Ensure userId is a number
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Delete user's appointments first
        await connection.promise().query('DELETE FROM appointments WHERE user_id = ?', [userId]);

        // Then delete the user
        await connection.promise().query('DELETE FROM users WHERE id = ?', [userId]);

        res.status(200).send('User and appointments deleted successfully');
    } catch (error) {
        console.error('Error deleting user or appointments:', error);
        res.status(500).send('Failed to delete user or their appointments');
    }
});




// Delete a user by ID (with real deletion)
// In your server.js or routes file
app.delete('/appointments', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        await db.query('DELETE FROM appointments WHERE user_id = ?', [userId]);
        res.status(200).json({ message: 'Appointments deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete appointments' });
    }
});



// Fetch Appointments (for admins and users)
app.get('/appointments', (req, res) => {
    const userId = req.query.userId;
    const role = req.query.role;

    if (role === 'admin') {
        connection.query('SELECT * FROM appointments', (err, results) => {
            if (err) {
                console.error('Error fetching appointments:', err);
                return res.status(500).json({ message: 'Error fetching appointments' });
            }
            res.status(200).json(results);
        });
    } else if (userId) {
        connection.query('SELECT * FROM appointments WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                console.error('Error fetching appointments:', err);
                return res.status(500).json({ message: 'Error fetching appointments' });
            }
            res.status(200).json(results);
        });
    } else {
        res.status(400).json({ message: 'User ID is required for non-admin users' });
    }
});





// Create a new appointment
app.post('/appointments', (req, res) => {
    const { user_id, repair_name, appointment_date } = req.body;

    if (!user_id || !repair_name || !appointment_date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    connection.query(
        'INSERT INTO appointments (user_id, repair_name, appointment_date) VALUES (?, ?, ?)',
        [user_id, repair_name, appointment_date],
        (err, results) => {
            if (err) {
                console.error('Error creating appointment:', err);
                return res.status(500).json({ message: 'Error creating appointment' });
            }
            const appointmentId = results.insertId;
            connection.query(
                'SELECT * FROM appointments WHERE id = ?',
                [appointmentId],
                (err, appointment) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error fetching appointment' });
                    }
                    res.status(201).json(appointment[0]);
                }
            );
        }
    );
    
});




// Update an appointment (use the correct field 'repair_name' instead of 'details')
app.put('/appointments/:id', (req, res) => {
    const appointmentId = req.params.id;
    const { repair_name } = req.body;

    if (!repair_name) {
        return res.status(400).json({ message: 'repair_name is required' });
    }

    connection.query(
        'UPDATE appointments SET repair_name = ? WHERE id = ?',
        [repair_name, appointmentId],
        (err) => {
            if (err) {
                console.error('Error updating appointment:', err);
                return res.status(500).json({ message: 'Error updating appointment' });
            }
            res.status(200).json({ message: 'Appointment updated successfully' });
        }
    );
});


// Delete an appointment
app.delete('/appointments/:id', (req, res) => {
    const appointmentId = req.params.id;
    connection.query('DELETE FROM appointments WHERE id = ?', [appointmentId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting appointment' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    });
});


app.listen(5050, () => {
    console.log('Server running on port 5050');
});
