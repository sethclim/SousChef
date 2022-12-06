
using System.ComponentModel.DataAnnotations;

namespace souschef.server.Data.Models
{
    public class Recipe
    {
        [Key]
        public Guid Id { get; set; }

        public DateTime Date { get; set; }

        public int Duration { get; set; }

        public ApplicationUser? Owner { get; set; }

        public Guid OwnerId { get; set; }

        public List<Task> Tasks { get; set; } = new();

    }
}