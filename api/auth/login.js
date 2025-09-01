module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // For demo purposes, accept any login
    // In production, this would validate against your database
    const user = {
      id: "demo-user-id",
      email,
      firstName: "Demo",
      lastName: "User"
    };

    res.json({ 
      message: "Login successful",
      user 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Login failed" });
  }
}