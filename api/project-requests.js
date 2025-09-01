import { storage } from "../server/storage.js";
import { insertProjectRequestSchema } from "../shared/schema.js";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // In serverless environment, we'll skip authentication for now
      // and use a default user ID or handle it differently
      const validatedData = insertProjectRequestSchema.parse({
        ...req.body,
        userId: req.body.userId || 'default-user'
      });
      
      const projectRequest = await storage.createProjectRequest(validatedData);
      res.json(projectRequest);
    } catch (error) {
      console.error('Project request creation error:', error);
      res.status(500).json({ message: "Failed to create project request" });
    }
  } else if (req.method === 'GET') {
    try {
      const userId = req.query.userId || 'default-user';
      const requests = await storage.getProjectRequests(userId);
      res.json(requests);
    } catch (error) {
      console.error('Project requests fetch error:', error);
      res.status(500).json({ message: "Failed to fetch project requests" });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}