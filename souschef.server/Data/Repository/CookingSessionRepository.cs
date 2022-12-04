using souschef.server.Data.Models;

namespace souschef.server.Data.Repository.Contracts
{
    public class CookingSessionRepository : ICookingSessionRepository
    { 
        private readonly PostGresDBContext _context;

        public CookingSessionRepository(PostGresDBContext context){ _context = context; }

        System.Threading.Tasks.Task ICookingSessionRepository.GetTask()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ApplicationUser> GetUsers(Guid sessionId)
        {
           return _context.Users.Where(u => u.CurrentSessionId == sessionId);
        }

    }
}