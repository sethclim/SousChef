const baseUrl = `https://souschef-production.up.railway.app/api`;
const user = `${baseUrl}/user`;
const recipe = `${baseUrl}/recipe`;
const cookingSession = `${baseUrl}/cookingsession`;

export const ApiUrls = {
  login: `${user}/login`,
  register: `${user}/register`,
  publicRecipes: `${recipe}/public-recipes`,
  getTodaysMealPlans: `${cookingSession}/get-todays-cooking-session-by-user`,
  startMealPlan: `${cookingSession}/start`,
  getTask: `${cookingSession}/get-task`,
  completeTask: `${cookingSession}/complete-task`,
};
