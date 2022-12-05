using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using souschef.server.Data.LiveSession;
using souschef.server.Data.Models;
using souschef.server.Data.Repository.Contracts;


namespace souschef.server.Controllers;

[ApiController]
[Route("api/cookingseesion")]
public class CookingSessionController : Controller
{
    private readonly ICookingSessionRepository    m_cookingSessionRepository;
    private readonly UserManager<ApplicationUser> m_userManager;

    public CookingSessionController(ICookingSessionRepository _cookingSessionRepository, UserManager<ApplicationUser> _userManager)
    {
        m_cookingSessionRepository = _cookingSessionRepository;
        m_userManager              = _userManager;
    }

    [HttpGet("Start{id}")]
    public ActionResult Start(string _sessionId)
    {
       var session = LiveSessions.GetLiveSessions().StartCookingSession(Guid.Parse(_sessionId));

        if(session != null)
        {
            return Ok(session.Id);
        }
        else
        {
            return new ContentResult() { Content = "Start Session Failed", StatusCode = 404 };
        }
    }

    [HttpGet("End{id}")]
    public async Task<IActionResult> End(string _sessionId)
    {
        throw new NotImplementedException();
    }


    [HttpPost("Join{sessionId},{userId}")]
    public async Task<IActionResult> Join(string _sessionId, string userId)
    {
        var user = await m_userManager.FindByIdAsync(userId);
        var session = LiveSessions.GetLiveSessions().GetSessionById(Guid.Parse(_sessionId));
        session.Members.Add(user);

        return Ok();
    }

    [HttpPost("Leave{sessionId},{userId}")]
    public async Task<IActionResult> Leave(string _sessionId, string userId)
    {
        var user = await m_userManager.FindByIdAsync(userId);
        var session = LiveSessions.GetLiveSessions().GetSessionById(Guid.Parse(_sessionId));
        session.Members.Remove(user);

        return Ok();
    }

    
    [HttpGet("GetUsers{id}")]
    public  IEnumerable<ApplicationUser> GetUsers(string _sessionId)
    {
        return  m_cookingSessionRepository.GetUsers(Guid.Parse(_sessionId));
    }

    [HttpGet("GetTask{id}")]
    public Data.Models.Task GetTask(string id)
    {
        var session = LiveSessions.GetLiveSessions().GetSessionById(Guid.Parse(id));
        return session.GetNextTask();
    }

    [HttpPost("CompleteTask{sessionId},{taskId}")]
    public  IActionResult CompleteTask(string _sessionId, int id)
    {
        var session = LiveSessions.GetLiveSessions().GetSessionById(Guid.Parse(_sessionId));
        session.Tasks[id].Finished = true;

        return Ok();
    }
}