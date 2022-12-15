

using souschef.server.Data.Models;

namespace souschef.server.Data.DTOs
{
    public class RecipeDTO
    {
        public string? OwnerId      { get; set; }
        public string? Name         { get; set; }
        public Step[]? Steps        { get; set; }
        public DateTime DateCreated { get; set; }
        public int Difficulty       { get; set; }
        public int Serves           { get; set; }
        public Ingredient[]? Ingredients  { get; set; }
        public Kitchenware[]? KitchenWare { get; set; }
    }

    public class Step
    {
        public string? Title              { get; set; }
        public Ingredient[]? Ingredients  { get; set; }
        public Kitchenware[]? KitchenWare { get; set; }
        public string? Instructions       { get; set; }
        public int Difficulty             { get; set; }
        public int Order                  { get; set; }
        public int[]? DependsOn           { get; set; }
        public float TimeEstimate         { get; set; }
        public string? VideoURL           { get; set; }
    }
}
