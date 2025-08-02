const axios = require('axios');
const config = require('../config');

class WebhookService {
  async fetchData() {
    const response = await axios.get(config.webhook.url);
    return response.data;
  }
}

module.exports = WebhookService;