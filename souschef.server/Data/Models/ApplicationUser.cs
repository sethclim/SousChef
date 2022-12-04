    using Microsoft.AspNetCore.Identity;
    
    public class ApplicationUser : IdentityUser
    {
        public int SkillLevel {get; set;}
        public List<Recipes> Recipes {get; set;}
    }