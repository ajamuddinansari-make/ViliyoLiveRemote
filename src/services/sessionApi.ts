import API from './api';

export const getSessionConfiguration = async ( 
    payload:
       { 
        sessionMapId: string;
         userId: string;
         userEmail: string;
         userType: string; 
        }) => {

  const response = await API.post('/session-configuration', payload); 

  return response.data;
};