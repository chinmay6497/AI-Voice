import { useState, useRef, useCallback } from 'react';

const ASSEMBLY_AI_API_KEY = process.env.REACT_APP_ASSEMBLY_AI_API_KEY;

export const useAssemblyAI = () => {
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const socket = useRef(null);
  const mediaRecorder = useRef(null);

  const startRecording = useCallback(async () => {
    try {
      // Initialize WebSocket connection
      socket.current = new WebSocket('wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000');

      // Handle WebSocket connection
      socket.current.onopen = () => {
        console.log('AssemblyAI WebSocket connected');
        socket.current.send(JSON.stringify({
          token: ASSEMBLY_AI_API_KEY,
          expires_in: 3600
        }));

        // Start recording audio only after WebSocket is connected
        startAudioRecording();
      };

      // Handle incoming messages
      socket.current.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.message_type === 'FinalTranscript') {
          setTranscription(data.text);
        }
      };

      socket.current.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('WebSocket connection error');
      };

      socket.current.onclose = () => {
        console.log('WebSocket connection closed');
      };

    } catch (error) {
      console.error('Error starting recording:', error);
      setError(error.message);
    }
  }, []);

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = async (event) => {
        if (event.data.size > 0 && socket.current && socket.current.readyState === WebSocket.OPEN) {
          // Convert blob to base64
          const reader = new FileReader();
          reader.onload = () => {
            const base64data = reader.result.split(',')[1];
            socket.current.send(JSON.stringify({ audio_data: base64data }));
          };
          reader.readAsDataURL(event.data);
        }
      };

      mediaRecorder.current.start(100);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting audio recording:', error);
      setError('Failed to start audio recording');
    }
  };

  const stopRecording = useCallback(() => {
    try {
      if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
        mediaRecorder.current.stop();
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      }

      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.close();
      }

      setIsRecording(false);
    } catch (error) {
      console.error('Error stopping recording:', error);
      setError('Failed to stop recording');
    }
  }, []);

  return {
    transcription,
    isRecording,
    error,
    startRecording,
    stopRecording
  };
};

export default useAssemblyAI; 