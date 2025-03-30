import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const polly = new AWS.Polly();

export const handleTextToSpeech = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, voiceId, engine } = req.body;

    const params = {
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: voiceId || 'Joanna',
      Engine: engine || 'neural'
    };

    const result = await polly.synthesizeSpeech(params).promise();
    
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(result.AudioStream));
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
}; 