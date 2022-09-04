const IP = `52.73.198.53`;
export const getCurrentPath = () => {
  //return 'http://192.168.1.101:3000';
  return `http://${IP}:3000`;
};
export const getCurrentSocketPath = () => {
  return `ws://${IP}:3000`;
};
