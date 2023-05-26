import axios from 'axios';

const apiCall = async (method: string, url: string, data?: any) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error:any) {
    return error.response;
  }
};

export default apiCall;
