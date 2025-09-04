import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  searchSponsors,
  getSponsorStats,
  getSponsorById,
  getIndustries,
  getLocations
} from "./routes/sponsors";
import {
  getAllData,
  getRecentData,
  getDeletedData,
  getDataStats
} from "./routes/data";
import { healthCheck, testEndpoint } from "./routes/health";
import ukGovDataRoutes from "./routes/ukGovData";
import { connectMongo } from "./db/mongo";
import authRoutes from "./routes/auth";
import feedbackRoutes from "./routes/feedback";
import subscriptionRoutes from "./routes/subscriptions";
import govukRoutes from "./routes/govuk";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());

  // Connect to MongoDB (non-blocking)
  void connectMongo();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Sponsor API routes
  app.get("/api/sponsors/search", searchSponsors);
  app.get("/api/sponsors/stats", getSponsorStats);
  app.get("/api/sponsors/industries", getIndustries);
  app.get("/api/sponsors/locations", getLocations);
  app.get("/api/sponsors/:id", getSponsorById);

  // Health check routes
  app.get("/api/health", healthCheck);
  app.get("/api/test", testEndpoint);

  // Data API routes
  app.get("/api/data/all", getAllData);
  app.get("/api/data/recent", getRecentData);
  app.get("/api/data/deleted", getDeletedData);
  app.get("/api/data/stats", getDataStats);

  // UK Government data integration routes
  app.use("/api/uk-gov", ukGovDataRoutes);

  // Auth routes (fallback auth when Supabase is not configured)
  app.use("/api/auth", authRoutes);

  // Feedback and Subscriptions
  app.use("/api/feedback", feedbackRoutes);
  app.use("/api/subscriptions", subscriptionRoutes);
  app.use("/api/govuk", govukRoutes);

  return app;
}
