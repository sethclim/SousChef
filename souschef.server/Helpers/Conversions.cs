﻿using souschef.server.Data.DTOs;
using souschef.server.Data.Models;

namespace souschef.server.Helpers
{
    public static class Conversions
    {
        public static UserDTO ToUserDTO(ApplicationUser user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Name = user.UserName,
                Email = user.Email,
                SkillLevel = user.SkillLevel,
                CurrentSessionId = user.CurrentSessionId.ToString(),
                CurrentRecipe = null,
            };
        }

        public static Data.Models.Task? ToTask(TaskDTO _step)
        {
            if (_step.Ingredients != null && _step.KitchenWare != null)
            {
                return new Data.Models.Task
                {
                    Id           = Guid.NewGuid(),
                    Title        = _step.Title,
                    Description  = _step.Instructions,
                    Ingredients  = _step.Ingredients.ToList(),
                    Kitchenware  = _step.KitchenWare.ToList(),
                    Difficulty   = _step.Difficulty,
                    Order        = _step.Order,
                    Duration     = _step.Duration,
                    Dependencies = _step.Dependencies,
                    InProgress   = false,
                    Finished     = false,
                };

            }

            return null;
        }

        public static Data.LiveSession.LiveSessions.LiveRecipe ToLiveRecipe(Recipe recipe)
        {
            return new Data.LiveSession.LiveSessions.LiveRecipe
            {
                id = recipe.Id,
                Tasks = recipe.Tasks
            };
        }

        public static long GetUnixTimeStamp(DateTime _dateTime)
        {
           return ((DateTimeOffset)_dateTime).ToUnixTimeSeconds();
        }
           
    }
}
