using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace souschef.server.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int SkillLevel {get; set;}
        public List<Recipe>? Recipes {get; set;}

        [InverseProperty("Host")]
        public List<CookingSession>? CookingSessions {get; set;}
        public Guid? CurrentSessionId { get; set; }
    }
}
    