using Microsoft.EntityFrameworkCore;
using souschef.server.Data.Models;

namespace souschef.server.Data.Repository.Contracts
{
    public class CookingSessionRepository : ICookingSessionRepository
    { 
        private readonly PostGresDBContext _context;

        public CookingSessionRepository(PostGresDBContext context){ _context = context; }

        public IEnumerable<CookingSession>? CookingSessions => _context.CookingSession?
                .Include(cS => cS.Recipes)
                .Include(cS => cS.Host);


        Models.Task ICookingSessionRepository.GetTask()
        {
            throw new NotImplementedException();
        }

        public void SaveCookingSession(CookingSession cookingSession)
        {
             _context.CookingSession?.Add(cookingSession);
             _context.SaveChanges();
        }

        public IEnumerable<CookingSession>? GetCookingSessionsByUser(Guid userId)
        {
            return CookingSessions?.Where(cs => cs.Host?.Id == userId.ToString());
        }

        public IEnumerable<ApplicationUser> GetUsers(Guid sessionId)
        {
           return _context.Users.Where(u => u.CurrentSessionId == sessionId);
        }

    }
}