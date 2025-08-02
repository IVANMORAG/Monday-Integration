const WebhookService = require('../services/WebhookService');
const MondayService = require('../services/MondayService');
const DataTransformService = require('../services/DataTransformService');
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()]
});

class IntegrationController {
  constructor() {
    this.webhookService = new WebhookService();
  }

  async execute() {
    try {
      logger.info('Starting integration...');

      // Fetch webhook data
      const webhookData = await this.webhookService.fetchData();
      logger.debug('Webhook data fetched', { keys: Object.keys(webhookData) });

      // Transform data
      const userData = DataTransformService.transform(webhookData);

      // Initialize Monday service
      const mondayService = new MondayService(userData.API);

      // Get board info
      const boardInfo = await mondayService.getBoardInfo();

      // Create item
      const item = await mondayService.createItem(userData, boardInfo);
      logger.info('Item created successfully');

      return {
        success: true,
        item,
        board: boardInfo.data.boards[0],
        userData: userData.toObject()
      };
    } catch (error) {
      logger.error('Integration failed', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = IntegrationController;