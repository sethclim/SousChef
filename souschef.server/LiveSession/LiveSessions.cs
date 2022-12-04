
namespace souschef.server.Data.LiveSession
{
    public class LiveSessions
    {
        private static readonly LiveSessions m_instance = new LiveSessions();

        private readonly List<LiveCookingSession> m_currentCookingSessions;

        private LiveSessions()
        {
            m_currentCookingSessions = new List<LiveCookingSession>();
        }

        public static LiveSessions GetLiveSessions()
        {
            return m_instance;
        }

        public LiveCookingSession GetSessionById(int _id)
        {
            return m_currentCookingSessions[_id];
        }

        public LiveCookingSession StartCookingSession()
        {
            var session = new LiveCookingSession();
            m_currentCookingSessions.Add(session);
            return session;
        }

        public class LiveCookingSession
        {
            public string Id { get; set; }

            public List<Models.Task> Tasks = new List<Models.Task>();

            private int currentTask = 0;

            public Models.Task GetNextTask()
            {
                currentTask++;
                return Tasks[currentTask];
            }
        }
    }
}
