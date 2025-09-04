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
    // For demo purposes, accept any registration for Vercel
    // In production, you would implement proper user creation
    const { email, password, firstName, lastName } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    res.json({
      user: {
        id: 'vercel-demo-user',
        email: email,
        firstName: firstName,
        lastName: lastName
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}