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
                CurrentSessionId = user.CurrentSessionId.ToString()
            };
        }

        public static Data.Models.Task? ToTask(Step _step)
        {
            if (_step.Ingredients != null && _step.KitchenWare != null)
            {
                return new Data.Models.Task
                {
                    Id = Guid.NewGuid(),
                    Description = _step.Instructions,
                    Ingredients = _step.Ingredients.ToList(),
                    Kitchenware = _step.KitchenWare.ToList(),
                    Difficulty =  _step.Difficulty,
                };

            }

            return null;
        }

        public static long GetUnixTimeStamp(DateTime _dateTime)
        {
           return ((DateTimeOffset)_dateTime).ToUnixTimeSeconds();
        }
           
    }
}