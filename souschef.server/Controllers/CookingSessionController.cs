using Microsoft.AspNetCore.Mvc;
using souschef.server.Data.LiveSession;
using souschef.server.Data.Models;
using souschef.server.Data.Repository.Contracts;


namespace souschef.server.Controllers;

[ApiController]
[Route("api/cookingseesion")]
public class CookingSessionController : Controller
{
    private readonly ICookingSessionRepository m_cookingSessionRepository;

    public CookingSessionController(ICookingSessionRepository _cookingSessionRepository)
    {
        m_cookingSessionRepository = _cookingSessionRepository;
    }

    [HttpPost("Start")]
    public string Start()
    {
       var session = LiveSessions.GetLiveSessions().StartCookingSession();
       return session.Id;
    }

    [HttpPost("End")]
    public async Task<IActionResult> End()
    {
        throw new NotImplementedException();
    }


    [HttpPost("Join")]
    public async Task<IActionResult> Join()
    {
        throw new NotImplementedException();
    }

    [HttpPost("Leave")]
    public async Task<IActionResult> Leave()
    {
        throw new NotImplementedException();
    }

    //mm
    [HttpGet("GetUsers")]
    public  IEnumerable<ApplicationUser> GetUsers(string _sessionId)
    {
        return  m_cookingSessionRepository.GetUsers(Guid.Parse(_sessionId));
    }

    [HttpPost("GetTask")]
    public Data.Models.Task GetTask(int id)
    {
        var session = LiveSessions.GetLiveSessions().GetSessionById(id);
        return session.GetNextTask();
    }

    [HttpPost("CompleteTask")]
    public async Task<IActionResult> CompleteTask()
    {
        throw new NotImplementedException();
    }
}