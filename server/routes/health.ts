import { RequestHandler } from "express";

// Simple health check endpoint
export const healthCheck: RequestHandler = (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development"
  });
};

// Test endpoint that always succeeds
export const testEndpoint: RequestHandler = (req, res) => {
  res.json({
    success: true,
    message: "Test endpoint working",
    data: {
      test: true,
      timestamp: new Date().toISOString()
    }
  });
};
