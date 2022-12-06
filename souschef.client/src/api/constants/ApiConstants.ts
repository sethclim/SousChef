const baseUrl = `https://souschef-production.up.railway.app/api`;
const user = `${baseUrl}/user`;
const cookingSession = `${baseUrl}/cookingsession`;

export const ApiUrls = {
  login: `${user}/login`,
  register: `${user}/register`,
  getTask: `${cookingSession}/GetTask`,
  completeTask: `${cookingSession}/CompleteTask`,
};
