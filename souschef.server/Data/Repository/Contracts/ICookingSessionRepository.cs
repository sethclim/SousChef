
using souschef.server.Data.Models;

namespace souschef.server.Data.Repository.Contracts
{
    public interface ICookingSessionRepository
    { 
        public System.Threading.Tasks.Task GetTask();
        public IEnumerable<ApplicationUser> GetUsers(Guid sessionId);
    }
}