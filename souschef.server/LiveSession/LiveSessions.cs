
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

        public LiveCookingSession StartCookingSession(CookingSession _cookingSession)
        {
            var d = new Dictionary<Guid, Models.Task>();

            foreach (var t in _cookingSession.MealPlan!.Recipes[0]!.Tasks)
            {
                d.Add(t.Id, t);
            }

            var session = new LiveCookingSession()
            {
                Id = _cookingSession.Id,
                Host = _cookingSession.Host,
                Members = _cookingSession.Guests!,
                Tasks = d,
            };

            Console.WriteLine(session.Tasks.Count + session.Tasks.First().Value.Description);

            m_currentCookingSessions.Add(_cookingSession.Id, session);
            return session;
        }

        public class LiveCookingSession
        {
            public Guid? Id { get; set; }
            public ApplicationUser? Host { get; set; }

            public List<ApplicationUser> Members = new();

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
