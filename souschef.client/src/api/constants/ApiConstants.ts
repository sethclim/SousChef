const baseUrl = `https://souschef-production.up.railway.app/api`;
const cookingSession = `${baseUrl}/cookingsession`;

export const ApiUrls = {
  login: `${baseUrl}/user/login`,
  register: `${baseUrl}/user/register`,
  getTask: `${cookingSession}/GetTask,`,
  completeTask: `${cookingSession}/CompleteTask,`,
};
