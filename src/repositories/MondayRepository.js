const axios = require('axios');
const config = require('../config');
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()]
});

class MondayRepository {
  constructor(apiToken) {
    this.client = axios.create({
      baseURL: 'https://api.monday.com/v2',
      headers: {
        'Authorization': apiToken,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
  }

  async executeQuery(query, variables = {}) {
    try {
      const response = await this.client.post('', { query, variables });
      
      if (response.data.errors) {
        logger.error('Monday API Errors', { errors: response.data.errors });
        throw new Error(`Monday API Error: ${response.data.errors[0].message}`);
      }
      
      return response.data;
    } catch (error) {
      if (error.response) {
        logger.error('HTTP Error', {
          status: error.response.status,
          data: error.response.data
        });
      }
      throw error;
    }
  }

  async getBoardInfo() {
    const targetBoardId = config.monday.boardId || 9710556974;
    
    const query = `
      query {
        boards(ids: [${targetBoardId}]) {
          id
          name
          board_kind
          columns {
            title
            id
            type
          }
          groups {
            title
            id
          }
        }
      }
    `;
    
    const result = await this.executeQuery(query);
    
    if (result.data.boards.length > 0) {
      const board = result.data.boards[0];
      if (board.board_kind === 'private' && board.name.includes('Subelementos')) {
        throw new Error(`Cannot use subitems board: ${board.name}. Please use main board ID 9710556974`);
      }
    }
    
    return result;
  }

  async createItem(boardId, groupId, itemName, columnValues) {
    const columnValuesJson = JSON.stringify(columnValues).replace(/"/g, '\\"');
    
    const mutation = `
      mutation {
        create_item (
          board_id: ${boardId}
          group_id: "${groupId}"
          item_name: "${itemName}"
          column_values: "${columnValuesJson}"
        ) {
          id
          name
        }
      }
    `;

    return this.executeQuery(mutation);
  }
}

module.exports = MondayRepository;