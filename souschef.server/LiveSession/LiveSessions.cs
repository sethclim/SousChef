
using souschef.server.Data.Models;

namespace souschef.server.Data.LiveSession
{
    public class LiveSessions
    {
        private static readonly LiveSessions m_instance = new();

        private readonly Dictionary<Guid, LiveCookingSession> m_currentCookingSessions;

        private LiveSessions()
        {
            m_currentCookingSessions = new Dictionary<Guid, LiveCookingSession>();
        }

        public static LiveSessions GetLiveSessions()
        {
            return m_instance;
        }

        public LiveCookingSession GetSessionById(Guid _id)
        {
            return m_currentCookingSessions[_id];
        }

        public LiveCookingSession StartCookingSession(Guid _id)
        {
            var session = new LiveCookingSession();
            m_currentCookingSessions.Add(_id, session);
            return session;
        }

        public class LiveCookingSession
        {
            public string? Id { get; set; }
            public ApplicationUser? Host { get; set; }

            public List<ApplicationUser> Members = new();

            public List<Models.Task> Tasks = new();

            private int currentTask = 0;

            public Models.Task GetNextTask()
            {
                currentTask++;
                return Tasks[currentTask];
            }
        }
    }
}
