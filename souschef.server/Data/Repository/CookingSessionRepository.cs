

namespace souschef.server.Data.Repository.Contracts
{
    public class CookingSessionRepository : ICookingSessionRepository
    { 
        private readonly ApplicationDbContext _context;

        public CookingSessionRepository(ApplicationDbContext context){ _context = context; }

        Task<UpdateResult> GetTask()
        {

        }

        Task<UpdateResult> GetUsers()
        {

        }


    }
}