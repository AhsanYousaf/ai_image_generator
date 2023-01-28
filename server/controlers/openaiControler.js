const { Configure, OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    try {
        const response = await openai.createImage({
            prompt: 'Lion drinking coffee while working on laptop',
            n: 1,
            size: '512x512'
        });

        const imageUrl = response.data.data[0].url

        res.status(200).json({
            success: true,
            data: imageUrl
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: 'The image could not be generated'
        });
    }
}

module.exports = { generateImage }