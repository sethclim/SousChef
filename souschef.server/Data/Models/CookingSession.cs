using System;
using System.ComponentModel.DataAnnotations;

namespace souschef.server.Data.Models
{
    public class CookingSession
    {
        [Key]  
        public Guid Id { get; set; }

        public DateTime Date{ get; set;}

        public MealPlan MealPlan {get; set;}

        public List<ApplicationUser> Guests{ get; set;}

        public Guid OwnerId { get; set; }

        public CookingSession()
        {
            Id = Guid.NewGuid();
        }
    }
}