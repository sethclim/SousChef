using System;
using System.ComponentModel.DataAnnotations;

namespace souschef.server.Data.Models
{
    public class MealPlan
    {
        [Key]  
        public Guid Id { get; set; }

        public List<Recipe> Recipes { get; set;}
        public int          OccasionType {get; set;}
    }
}