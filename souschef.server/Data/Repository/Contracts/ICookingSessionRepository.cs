
using souschef.server.Data.Models;

namespace souschef.server.Data.Repository.Contracts
{
    public interface ICookingSessionRepository
    { 
        public Task GetTask();
        public Task<IEnumerable<ApplicationUser>> GetUsers(Guid sessionId);
    }
}