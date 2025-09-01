const { randomUUID } = require("crypto");

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, description, budget, timeline, requirements } = req.body;
      
      // Basic validation
      if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
      }

      // For demo purposes, create a mock project request
      const projectRequest = {
        id: randomUUID(),
        title,
        description,
        budget,
        timeline,
        requirements,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      res.json({ 
        message: "Project request created successfully",
        projectRequest 
      });
    } catch (error) {
      console.error('Project request creation error:', error);
      res.status(500).json({ message: "Failed to create project request" });
    }
  } else if (req.method === 'GET') {
    try {
      // Return mock project requests for demo
      const requests = [
        {
          id: "demo-request-1",
          title: "Sample Project",
          description: "This is a demo project request",
          status: "pending",
          createdAt: new Date().toISOString()
        }
      ];
      res.json(requests);
    } catch (error) {
      console.error('Project requests fetch error:', error);
      res.status(500).json({ message: "Failed to fetch project requests" });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}