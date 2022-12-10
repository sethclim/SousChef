using souschef.server.Data.DTOs;

using static souschef.server.Data.LiveSession.LiveSessions;

namespace souschef.server.LiveSession
{
    public static class TaskAlgorithmn
    {
        public static Data.Models.Task? Entry(Dictionary<Guid, LiveRecipe> liveRecipes, UserDTO user)
        {
            //user's last recipe chain and most far off are less then min off
            //stay on current task chain
            //if close opt for the same task stream the user was on before
            //else push for the one behind 
           
            var progress = CheckRecipeProgress(liveRecipes.Values.ToList());
            var maxRecipeTimeLeft = progress.Max();

            progress.TryGetValue((Guid)user.CurrentRecipe!, out float userRecipeTimeLeft);

            if (maxRecipeTimeLeft.Value - userRecipeTimeLeft <= 60)
            {
                var nextTaskInQueue = GetNextUnfinishedTask(liveRecipes[(Guid)user.CurrentRecipe!].Tasks);

                if (nextTaskInQueue != null && SkillRatingVSTask(nextTaskInQueue, user))
                    return nextTaskInQueue;
            }
            else
            {
                var nextTaskInQueue = GetNextUnfinishedTask(liveRecipes[maxRecipeTimeLeft.Key].Tasks);

                if(nextTaskInQueue != null && SkillRatingVSTask(nextTaskInQueue, user))
                {
                    return nextTaskInQueue;
                }
            }

            return null;
        }

        static Dictionary<Guid, float> CheckRecipeProgress(List<LiveRecipe> liveRecipes)
        {
            Dictionary<Guid, float> timeLeft = new();

            for (int i = 0; i < liveRecipes.Count; i++)
            {
                var recipe = liveRecipes[i];
                var incompleTasks = recipe.Tasks.Where(t => !t.Finished);
                var totalLeft  = incompleTasks.Sum(x => x.Duration);

                timeLeft.Add(recipe.id, totalLeft);
            }

            return timeLeft;
        }

        static bool SkillRatingVSTask(Data.Models.Task task, UserDTO user)
        {
            return task.Difficulty <= user.SkillLevel;
        }

        static Data.Models.Task? GetNextUnfinishedTask(List<Data.Models.Task> tasks)
        {
            var incompleTasks = tasks.Where(t => !t.Finished).ToList();

            if (incompleTasks[0] != null)
                return incompleTasks[0];
            else
                return null;
        }


    }
}
