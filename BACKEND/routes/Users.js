const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const authenticate = require('../middleware/authenticate'); // Import authentication middleware
const router = express.Router();




// 1. Create a new user (Sign-up)
router.post('/signup', async (req, res) => {
    const { full_name, email, password_hash, age, gender, height, weight, fitness_goal, address, phone_number } = req.body;

    try {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password_hash, salt);

        const newUser = new User({
            full_name,
            email,
            password_hash: hashedPassword, // Store the hashed password
            age,
            gender,
            height,
            weight,
            fitness_goal,
            address,
            phone_number
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error("Error creating user:", error); // Log the error
        res.status(500).send({ message: 'Error creating user', error: error.message });
      }
});


// 2. Login user (Authenticate)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error(`User not found with email: ${email}`);
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            console.error(`Invalid credentials for email: ${email}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Determine role based on email domain
        let role = 'user';
        if (email.includes('.admin')) {
            role = 'admin';
        } else if (email.includes('.trainer')) {
            role = 'trainer';
        } else if (email.includes('.delivery')) {
            role = 'delivery';
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log(`Login successful for user: ${user.full_name}, Role: ${role}`);

        res.json({
            message: 'Login successful',
            userId: user._id,
            token,
            role,
        });
    } catch (err) {
        console.error(`Error logging in with email: ${email}`, err);
        res.status(500).json({ 
            message: 'Error logging in', 
            error: err.message, 
            stack: err.stack
        });
    }
});

// 3. Get all users (Optional: For admin or debugging purposes)
router.get('/', authenticate, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});

router.get('/users', async (req, res) => {
    try {
      const users = await User.find();  // Fetch all users from the database
      res.json(users);  // Send the user data as response
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
  });

// 4. Get a single user by ID
router.get('/get/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
});

// 5. Update user data
router.put('/update/:userId', async (req, res) => {
    const { userId } = req.params;
    const { full_name, email, age, gender, height, weight, fitness_goal, address, phone_number } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            full_name,
            email,
            age,
            gender,
            height,
            weight,
            fitness_goal,
            address,
            phone_number
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
});

// 6. Delete a user
router.delete('/delete/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
});

// Profile route: Get user details and role
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            full_name: user.full_name,
            email: user.email,
            role: req.user.role,  // Admin or user
            age: user.age,
            gender: user.gender,
            height: user.height,
            weight: user.weight,
            fitness_goal: user.fitness_goal,
            address: user.address,
            phone_number: user.phone_number,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user data', error: err.message });
    }
});

module.exports = router;