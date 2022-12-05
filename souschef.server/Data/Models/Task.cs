
using System.ComponentModel.DataAnnotations;


namespace souschef.server.Data.Models
{
    public class Task
    {
        [Key]  
        public Guid Id { get; set; }

        public string? Name{ get; set;}
        public string? Description {get; set;}

        public List<Ingredient>?  Ingredients {get; set;}
        public List<Kitchenware>? Kitchenware {get; set;}

        public int Duration {get; set;}
        public int Difficulty {get; set;}
        public int Points {get; set;}
        public bool Finished { get; set; }

        public ApplicationUser? Assignee {get; set;}
    }
}