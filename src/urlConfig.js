const baseUrl = "https://flipkart--backend--server.herokuapp.com";

//export const api = 'http://localhost:2000/api';

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
  //return `http://localhost:2000/public/${fileName}`;
};
