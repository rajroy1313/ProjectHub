export default async function handler(req, res) {
  // Configure CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // For demo purposes, return a mock user for Vercel
    // In production, you would implement proper JWT or other stateless auth
    res.json({
      user: {
        id: 'vercel-demo-user',
        email: 'demo@vercel.app',
        firstName: 'Demo',
        lastName: 'User'
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}