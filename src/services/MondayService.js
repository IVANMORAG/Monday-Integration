const MondayRepository = require('../repositories/MondayRepository');
const DataTransformService = require('./DataTransformService');

class MondayService {
  constructor(apiToken) {
    this.repository = new MondayRepository(apiToken);
  }

  async getBoardInfo() {
    console.log('📋 Getting board information...');
    const boardInfo = await this.repository.getBoardInfo();
    
    if (!boardInfo.data.boards || boardInfo.data.boards.length === 0) {
      throw new Error('No boards found');
    }

    const board = boardInfo.data.boards[0];
    console.log(`📋 Found board: ${board.name} (ID: ${board.id})`);
    console.log(`📝 Columns: ${board.columns.map(c => c.title).join(', ')}`);
    
    return boardInfo;
  }

  async createItem(userData, boardInfo) {
    const board = boardInfo.data.boards[0];
    const group = board.groups[0];

    if (!group) {
      throw new Error('No groups found in board');
    }

    console.log(`📝 Using group: ${group.title} (ID: ${group.id})`);

    const columnValues = DataTransformService.mapToColumns(userData, board.columns);
    console.log('🔄 Column values mapped:', Object.keys(columnValues));
    
    const result = await this.repository.createItem(
      board.id,
      group.id,
      userData.getDisplayName(),
      columnValues
    );

    return result.data.create_item;
  }
}

module.exports = MondayService;