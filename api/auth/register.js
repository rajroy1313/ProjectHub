const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // For demo purposes, create a mock user response
    // In production, this would connect to your database
    const user = {
      id: randomUUID(),
      email,
      firstName,
      lastName
    };

    res.json({ 
      message: "Registration successful",
      user 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Registration failed" });
  }
}