module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // In serverless environment, authentication would need to be handled differently
  // For now, return a simple response
  res.status(401).json({ message: "Not authenticated" });
}