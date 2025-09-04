import { RequestHandler } from "express";
import { readFileSync } from "fs";
import { join } from "path";
import { ApiResponse, SponsorData } from "../../shared/api";

// Load data files
const loadDataFile = (filename: string): SponsorData[] => {
  try {
    const filePath = join(process.cwd(), "shared", "data", filename);
    const fileContent = readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent) as SponsorData[];
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
};

// Get all sponsor data
export const getAllData: RequestHandler = (req, res) => {
  try {
    const data = loadDataFile("all-data.json");
    
    const response: ApiResponse<SponsorData[]> = {
      success: true,
      data,
    };
    
    res.json(response);
  } catch (error) {
    console.error("Error getting all data:", error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to load all data",
    };
    res.status(500).json(response);
  }
};

// Get recent sponsor data
export const getRecentData: RequestHandler = (req, res) => {
  try {
    const data = loadDataFile("recent-data.json");
    
    const response: ApiResponse<SponsorData[]> = {
      success: true,
      data,
    };
    
    res.json(response);
  } catch (error) {
    console.error("Error getting recent data:", error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to load recent data",
    };
    res.status(500).json(response);
  }
};

// Get deleted sponsor data
export const getDeletedData: RequestHandler = (req, res) => {
  try {
    const data = loadDataFile("deleted-data.json");
    
    const response: ApiResponse<SponsorData[]> = {
      success: true,
      data,
    };
    
    res.json(response);
  } catch (error) {
    console.error("Error getting deleted data:", error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to load deleted data",
    };
    res.status(500).json(response);
  }
};

// Get data statistics
export const getDataStats: RequestHandler = (req, res) => {
  try {
    const allData = loadDataFile("all-data.json");
    const recentData = loadDataFile("recent-data.json");
    const deletedData = loadDataFile("deleted-data.json");
    
    const stats = {
      all: allData.length,
      recent: recentData.length,
      deleted: deletedData.length,
    };
    
    const response: ApiResponse<typeof stats> = {
      success: true,
      data: stats,
    };
    
    res.json(response);
  } catch (error) {
    console.error("Error getting data stats:", error);
    const response: ApiResponse = {
      success: false,
      error: "Failed to load data statistics",
    };
    res.status(500).json(response);
  }
};
