import axios from 'axios';

export const analyzeResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await axios.post('/api/resume/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};

export const analyzeJobDescription = async (jobDescription) => {
  try {
    const response = await axios.post('/api/job-description/analyze', {
      jobDescription,
    });

    return response.data;
  } catch (error) {
    console.error('Error analyzing job description:', error);
    throw error;
  }
};

export const generatePreparationPlan = async (resumeAnalysis, jobAnalysis) => {
  try {
    const response = await axios.post('/api/preparation/generate-plan', {
      resumeAnalysis,
      jobAnalysis,
    });

    return response.data;
  } catch (error) {
    console.error('Error generating preparation plan:', error);
    throw error;
  }
}; 