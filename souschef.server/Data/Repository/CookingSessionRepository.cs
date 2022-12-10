using souschef.server.Data.Models;

namespace souschef.server.Data.Repository.Contracts
{
    public class CookingSessionRepository : ICookingSessionRepository
    { 
        private readonly PostGresDBContext _context;

        public CookingSessionRepository(PostGresDBContext context){ _context = context; }

        Models.Task ICookingSessionRepository.GetTask()
        {
            throw new NotImplementedException();
        }

        public void SaveCookingSession(CookingSession cookingSession)
        {
             _context.CookingSession?.Add(cookingSession);
             _context.SaveChanges();
        }

        public IEnumerable<ApplicationUser> GetUsers(Guid sessionId)
        {
           return _context.Users.Where(u => u.CurrentSessionId == sessionId);
        }

    }
}