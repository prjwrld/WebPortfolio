const axios = require('axios');

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'sarvamai/sarvam-m:free';
const API_KEY = process.env.OPENROUTER_API_KEY;

const openRouterService = {
  getResponse: async (message, context) => {
    try {
      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: MODEL,
          messages: [
            {
              role: 'system',
              content: context
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            'HTTP-Referer': 'https://portfolio.prajwalprasad.com',
            'X-Title': 'Prajwal Portfolio AI Assistant'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw new Error('Failed to get AI response');
    }
  }
};

module.exports = openRouterService;