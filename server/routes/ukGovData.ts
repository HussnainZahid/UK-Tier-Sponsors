import { Router } from 'express';
import { ukGovDataService } from '../services/ukGovDataService';
import { ApiResponse } from '../../shared/api';

const router = Router();

/**
 * GET /api/uk-gov/sync
 * Manually trigger sync with UK Government data
 */
router.get('/sync', async (req, res) => {
  try {
    console.log('Manual sync with UK Government data requested');
    
    const sponsors = await ukGovDataService.fetchLatestSponsorData();
    
    const response: ApiResponse = {
      success: true,
      data: {
        message: 'Sync completed successfully',
        recordCount: sponsors.length,
        timestamp: new Date().toISOString()
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('UK Gov data sync error:', error);
    
    const response: ApiResponse = {
      success: false,
      error: 'Failed to sync with UK Government data',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    
    res.status(500).json(response);
  }
});

/**
 * GET /api/uk-gov/status
 * Get status of UK Government data integration
 */
router.get('/status', async (req, res) => {
  try {
    const status = await ukGovDataService.getDataStatus();
    
    const response: ApiResponse = {
      success: true,
      data: {
        dataSource: 'UK Home Office Register of Licensed Sponsors',
        sourceUrl: 'https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers',
        ...status,
        features: {
          dailySync: true,
          realTimeUpdates: true,
          officialSource: true,
          dataValidation: true
        }
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('UK Gov data status error:', error);
    
    const response: ApiResponse = {
      success: false,
      error: 'Failed to get data status',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    
    res.status(500).json(response);
  }
});

/**
 * GET /api/uk-gov/latest
 * Get latest sponsor data from UK Government source
 */
router.get('/latest', async (req, res) => {
  try {
    const sponsors = await ukGovDataService.fetchLatestSponsorData();
    
    // Limit to first 100 for API response
    const limitedSponsors = sponsors.slice(0, 100);
    
    const response: ApiResponse = {
      success: true,
      data: {
        sponsors: limitedSponsors,
        totalAvailable: sponsors.length,
        dataSource: 'UK Home Office Register',
        lastUpdated: new Date().toISOString()
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('UK Gov latest data error:', error);
    
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch latest data',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    
    res.status(500).json(response);
  }
});

/**
 * POST /api/uk-gov/schedule
 * Schedule automatic daily updates
 */
router.post('/schedule', async (req, res) => {
  try {
    await ukGovDataService.scheduleDailyUpdate();
    
    const response: ApiResponse = {
      success: true,
      data: {
        message: 'Daily updates scheduled successfully',
        interval: '24 hours',
        nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Schedule error:', error);
    
    const response: ApiResponse = {
      success: false,
      error: 'Failed to schedule daily updates',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    
    res.status(500).json(response);
  }
});

export default router;
