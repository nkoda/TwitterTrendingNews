const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

let _client;

const generateReport = async (trend, data) => {
    try {
        if (!_client) {
          const openai = new OpenAIApi(configuration);
          _client = openai;
        }
        const completion = await _client.createCompletion({
            model: "text-davinci-003",
            temperature: 0.7,
            max_tokens: 20,
            suffix: '. DONE',
            frequency_penalty: 1.0,
            prompt: 
            `The topic is ${trend}. Summarize the following text in a sentence
             for that a news reporter to read on tv: ${data + ''}`
          });
        return completion.data.choices[0].text;
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        };
      };
};

const getClient = () => {
    if (_client) {
        return _client;
    }
    throw 'openAI Client not found';
}
exports.generateReport = generateReport;
exports.getClient = getClient;