using System;
using System.ComponentModel.DataAnnotations;

namespace souschef.server.Data.Models
{
    public class Recipe
    {
        [Key]  
        public Guid Id { get; set; }

        public DateTime Date{ get; set;}

        //TOdO
        //Meal Plan

        public int Duration {get; set;}

        public ApplicationUser Owner{ get; set;}

     

    }
}