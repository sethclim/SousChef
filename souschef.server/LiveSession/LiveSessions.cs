
using souschef.server.Data.DTOs;
using souschef.server.Data.Models;

namespace souschef.server.Data.LiveSession
{
    public class LiveSessions
    {
        private static readonly LiveSessions m_instance = new();

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
            var d = new Dictionary<Guid, Models.Task>();

            foreach (var t in mealPlan.Recipes[0]!.Tasks)
            {
                d.Add(t.Id, t);
            }

            var session = new LiveCookingSession()
            {
                Id = sessionId,
                Host = host,
                Members = members!,
                Tasks = d,
            };

            m_currentCookingSessions.Add(sessionId, session);
            return session;
        }

        public class LiveCookingSession
        {
            public Guid? Id { get; set; }
            public UserDTO? Host { get; set; }

            public List<UserDTO> Members = new();

            public Dictionary<Guid, Models.Task> Tasks = new();

            private int currentTask = 0;

            public Models.Task? GetNextTask()
            {
                var l = Tasks.Values.ToList();

                Models.Task? nextTask = null;

                if (currentTask < l.Count)
                {
                    nextTask = l[currentTask];
                    currentTask++;

                }

                return nextTask;
            }
        }
    }
}
