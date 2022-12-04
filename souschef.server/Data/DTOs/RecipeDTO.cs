

namespace souschef.server.Data.DTOs
{
    public class RecipeDTO
    {
        public string? OwnerId { get; set; }
        public string? Name { get; set; }
        public List<Step>? Steps;
        public DateTime DateCreated { get; set; }

    }

    public class Step
    {
        public string[]? Ingredients { get; set; }
        public string? Instructions { get; set; }
        public string? VideoURL { get; set; }
        public float TimeEstimate { get; set; }
    }
}
