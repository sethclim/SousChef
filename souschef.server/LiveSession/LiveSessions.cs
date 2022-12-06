
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

        public LiveCookingSession GetSessionById(Guid _sessionId)
        {
            return m_currentCookingSessions[_sessionId];
        }

        public LiveCookingSession StartCookingSession(Guid _sessionId)
        {
            var session = new LiveCookingSession();
            m_currentCookingSessions.Add(_sessionId, session);
            return session;
        }

        public class LiveCookingSession
        {
            public string? Id { get; set; }
            public ApplicationUser? Host { get; set; }

            public List<ApplicationUser> Members = new();

            public Dictionary<Guid, Models.Task> Tasks = new();

            private Dictionary<Guid, Models.Task>.Enumerator taskEnumerator;

            public LiveCookingSession()
            {
                taskEnumerator = Tasks.GetEnumerator();
            }

            public Models.Task GetNextTask()
            {
                taskEnumerator.MoveNext();
                return taskEnumerator.Current.Value;
            }
        }
    }
}
