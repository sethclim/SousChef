using souschef.server.Data.Models;
using souschef.server.Data.Repository.Contracts;

namespace souschef.server.Data.Repository
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly PostGresDBContext _context;

        public RecipeRepository(PostGresDBContext context) { _context = context; }

        public void AddRecipe(Recipe _recipe)
        {
            _context.Recipes?.AddAsync(_recipe);
            _context.SaveChanges();
        }

        public void DeleteRecipe(Recipe _recipe)
        {
            _context.Recipes?.Remove(_recipe);
            _context.SaveChanges();
        }

        public IEnumerable<Recipe>? GetAll(Guid ownerId)
        {
            return _context.Recipes?.Where(r => r.OwnerId == ownerId);
        }

        public Recipe? GetRecipe(Guid recipeId)
        {
            return _context.Recipes?.Where(r => r.Id == recipeId).First();
        }

        public bool Modify(Recipe _recipe)
        {
            throw new NotImplementedException();
        }
    }
}
