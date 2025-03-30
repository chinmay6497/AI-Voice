const ASSEMBLY_AI_API_KEY = process.env.REACT_APP_ASSEMBLY_AI_API_KEY;
const ASSEMBLY_AI_API_URL = 'https://api.assemblyai.com/v2';

export const transcribeAudio = async (audioBlob) => {
  try {
    // First, upload the audio file
    const uploadResponse = await fetch(`${ASSEMBLY_AI_API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': ASSEMBLY_AI_API_KEY,
        'Content-Type': 'audio/wav',
      },
      body: audioBlob,
    });

    const { upload_url } = await uploadResponse.json();

    // Then, submit for transcription
    const transcriptResponse = await fetch(`${ASSEMBLY_AI_API_URL}/transcript`, {
      method: 'POST',
      headers: {
        'Authorization': ASSEMBLY_AI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audio_url: upload_url,
        language_code: 'en',
      }),
    });

    const { id } = await transcriptResponse.json();

    // Poll for the transcription result
    let transcript = null;
    while (!transcript) {
      const resultResponse = await fetch(`${ASSEMBLY_AI_API_URL}/transcript/${id}`, {
        headers: {
          'Authorization': ASSEMBLY_AI_API_KEY,
        },
      });

      const result = await resultResponse.json();
      if (result.status === 'completed') {
        transcript = result.text;
        break;
      } else if (result.status === 'error') {
        throw new Error('Transcription failed');
      }

      // Wait for 1 second before polling again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return transcript;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
};

export const realtimeTranscription = (audioStream) => {
  const socket = new WebSocket('wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000', {
    headers: {
      'Authorization': ASSEMBLY_AI_API_KEY,
    },
  });

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.message_type === 'FinalTranscript') {
      return data.text;
    }
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return socket;
}; 