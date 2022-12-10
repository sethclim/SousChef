
using souschef.server.Data.DTOs;
using souschef.server.Data.Models;
using souschef.server.Helpers;
using souschef.server.LiveSession;

namespace souschef.server.Data.LiveSession
{
    public class LiveSessions
    {
        private static readonly LiveSessions                  m_instance = new();
        private readonly Dictionary<Guid, LiveCookingSession> m_currentCookingSessions;

        LiveSessions()
        {
            m_currentCookingSessions = new Dictionary<Guid, LiveCookingSession>();
        }

        public static LiveSessions GetLiveSessions()
        {
            return m_instance;
        }

        public LiveCookingSession? GetSessionById(Guid _sessionId)
        {
            return m_currentCookingSessions.ContainsKey(_sessionId)
                ? m_currentCookingSessions[_sessionId]
                : null;
        }

        public bool RemoveSessionById(Guid _sessionId) => m_currentCookingSessions.Remove(_sessionId);

        public LiveCookingSession StartCookingSession(Guid sessionId, MealPlan mealPlan, UserDTO host, List<UserDTO> members)
        {
            var recipes = new Dictionary<Guid, LiveRecipe>();

            foreach (var r in mealPlan.Recipes)
            {
                recipes.Add(r.Id, Conversions.ToLiveRecipe(r));
            }

            var session = new LiveCookingSession()
            {
                Id = sessionId,
                Host = host,
                Members = members!,
                Recipes = recipes
            };

            m_currentCookingSessions.Add(sessionId, session);
            return session;
        }

        public class LiveCookingSession
        {
            public Guid? Id { get; set; }
            public UserDTO? Host { get; set; }

            public List<UserDTO> Members = new();

            public Dictionary<Guid, LiveRecipe> Recipes = new();

            public Models.Task? GetNextTask(string userId)
            {
                var user = Members.Where(x => x.Id == userId).First();
                return TaskAlgorithmn.Entry(Recipes, user);
            }  
        }

        public class LiveRecipe
        {
            public Guid id;
            public List<Models.Task> Tasks = new();

            public Models.Task GetTask(Guid id)
            {
                return Tasks.Where(x => x.Id == id).First();
            }
        }

    }
}
