using Microsoft.EntityFrameworkCore.Infrastructure;
using souschef.server.Data.DTOs;

using static souschef.server.Data.LiveSession.LiveSessions;

namespace souschef.server.LiveSession
{
    public static class TaskAlgorithmn
    {
        public static (Guid recipeId, Data.Models.Task nextTask)? Entry(Dictionary<Guid, LiveRecipe> liveRecipes, UserDTO user)
        {
            //user's last recipe chain and most far off are less then min off
            //stay on current task chain
            //if close opt for the same task stream the user was on before
            //else push for the one behind 
            var progress = CheckRecipeProgress(liveRecipes.Values.ToList());
            var sort = liveRecipes.OrderBy(z => z.Value);
            var maxRecipeTimeLeft = progress.Max();

            if(user.CurrentRecipe != null)
            {
                 progress.TryGetValue((Guid)user.CurrentRecipe, out float userRecipeTimeLeft);

                if (maxRecipeTimeLeft.Value - userRecipeTimeLeft <= 60)
                {
                    var nextTaskInQueue = GetNextUnfinishedTask(liveRecipes[(Guid)user.CurrentRecipe!].Tasks);
                    if (nextTaskInQueue != null && SkillRatingVSTask(nextTaskInQueue, user))
                        return ((Guid)user.CurrentRecipe, nextTaskInQueue);
                }
                else
                {
                    var nextTaskInQueue = GetNextUnfinishedTask(liveRecipes[maxRecipeTimeLeft.Key].Tasks);
                    if (nextTaskInQueue != null && SkillRatingVSTask(nextTaskInQueue, user))
                        return (maxRecipeTimeLeft.Key, nextTaskInQueue);
                }
            }
            else
            {
                var nextTaskInQueue = GetNextUnfinishedTask(liveRecipes[maxRecipeTimeLeft.Key].Tasks);

                if (nextTaskInQueue != null && SkillRatingVSTask(nextTaskInQueue, user))
                {
                    return (maxRecipeTimeLeft.Key, nextTaskInQueue);
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
            Console.WriteLine("task.Difficulty " + task.Difficulty + " user.SkillLevel " + user.SkillLevel);
            return task.Difficulty <= 5;
        }

        static Data.Models.Task? GetNextUnfinishedTask(List<Data.Models.Task> tasks)
        {
            Console.WriteLine("tasks Count " + tasks.Count);
            var incompleTasks = tasks.Where(t => !t.Finished).ToList();
            Console.WriteLine("incompleTasks Count " + incompleTasks.Count);

            if (incompleTasks.Count > 0 && incompleTasks.First() != null)
            {
                Console.WriteLine("Returning Task);");
                return incompleTasks.First();
            }
            else
                return null;
        }
    }
}

