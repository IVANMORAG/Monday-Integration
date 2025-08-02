require('dotenv').config();

module.exports = {
  webhook: {
    url: process.env.WEBHOOK_URL
  },
  monday: {
    apiUrl: process.env.MONDAY_API_URL || 'https://api.monday.com/v2',
    boardId: parseInt(process.env.MONDAY_BOARD_ID)
  },
  user: {
    name: process.env.USER_NAME,
    age: parseInt(process.env.USER_AGE),
    phone: process.env.USER_PHONE,
    email: process.env.USER_EMAIL
  },
  github: {
    repoUrl: process.env.GITHUB_REPO_URL
  }
};