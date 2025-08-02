const IntegrationController = require('./controllers/IntegrationController');
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()]
});

async function main() {
  const controller = new IntegrationController();
  const result = await controller.execute();

  if (result.success) {
    logger.info('Integration completed', {
      board: { name: result.board.name, id: result.board.id },
      item: { name: result.item.name, id: result.item.id },
      user: result.userData.Nombre,
      github: result.userData.GitHub
    });
  } else {
    logger.error('Integration failed', { error: result.error });
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(error => {
    logger.error('Unexpected error', { error: error.message });
    process.exit(1);
  });
}