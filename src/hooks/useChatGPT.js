import { useState } from 'react';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const useChatGPT = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState('');

  const generateResponse = async (context) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are ${context.mentor.name}, a ${context.mentor.role} with expertise in ${context.mentor.expertise}. 
                       You are conducting a technical interview with a candidate. 
                       Maintain a professional and constructive tone while evaluating their responses.
                       Ask relevant technical questions based on your expertise and the candidate's background.`
            },
            {
              role: "user",
              content: context.previousResponse ? 
                `The candidate's response was: ${context.previousResponse}` :
                `Start the interview with an introduction and your first question. The candidate's background: ${JSON.stringify(context.userProfile)}`
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      const generatedResponse = data.choices[0].message.content;
      setResponse(generatedResponse);
      return generatedResponse;
    } catch (err) {
      setError(err.message);
      console.error('Error generating response:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateResponse,
    isLoading,
    error,
    response
  };
};

export default useChatGPT; 