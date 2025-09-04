export default async function handler(req, res) {
  // Configure CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    // For demo purposes, accept any login for Vercel
    // In production, you would implement proper authentication
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    res.json({
      user: {
        id: 'vercel-demo-user',
        email: email,
        firstName: 'Demo',
        lastName: 'User'
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}