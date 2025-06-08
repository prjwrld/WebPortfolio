const openRouterService = require('../services/openRouterService');
const ragService = require('../services/ragService');

const chatController = {
  handleMessage: async (req, res, next) => {
    try {
      const { message } = req.body;
      
      // Get context from RAG service
      const context = await ragService.getContext(message);
      
      // Get AI response
      const response = await openRouterService.getResponse(message, context);
      
      res.json({ response });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = chatController;