const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1';

export const generateInterviewFeedback = async (transcript, topic) => {
  try {
    const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert technical interviewer specializing in ${topic}. 
                     Analyze the interview transcript and provide detailed feedback.`
          },
          {
            role: 'user',
            content: `Please analyze this interview transcript and provide:
                     1. Overall rating (1-5)
                     2. Key strengths
                     3. Areas for improvement
                     4. Key points and notes
                     
                     Transcript: ${transcript}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const feedback = data.choices[0].message.content;

    // Parse the feedback into structured data
    const ratingMatch = feedback.match(/rating:?\s*(\d+(?:\.\d+)?)/i);
    const strengthsMatch = feedback.match(/strengths:?\s*([^]*?)(?=areas for improvement|key points|$)/i);
    const improvementsMatch = feedback.match(/areas for improvement:?\s*([^]*?)(?=key points|$)/i);
    const notesMatch = feedback.match(/key points:?\s*([^]*?)$/i);

    return {
      rating: ratingMatch ? parseFloat(ratingMatch[1]) : 0,
      strengths: strengthsMatch ? strengthsMatch[1].split('\n').filter(s => s.trim()) : [],
      improvements: improvementsMatch ? improvementsMatch[1].split('\n').filter(s => s.trim()) : [],
      notes: notesMatch ? notesMatch[1].split('\n').filter(s => s.trim()) : [],
    };
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw error;
  }
};

export const generateInterviewQuestion = async (topic, previousQuestions = []) => {
  try {
    const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert technical interviewer specializing in ${topic}. 
                     Generate relevant interview questions.`
          },
          {
            role: 'user',
            content: `Generate a technical interview question for ${topic}. 
                     Previous questions asked: ${previousQuestions.join(', ')}`
          }
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating question:', error);
    throw error;
  }
}; 