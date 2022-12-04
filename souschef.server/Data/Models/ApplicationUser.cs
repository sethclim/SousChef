using Microsoft.AspNetCore.Identity;

namespace souschef.server.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int SkillLevel {get; set;}
        public List<Recipe>? Recipes {get; set;}
        public Guid? CurrentSessionId { get; set; }
    }
}
    