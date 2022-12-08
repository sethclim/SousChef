using souschef.server.Data.DTOs;
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

    }
}
