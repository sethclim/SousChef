using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using souschef.server.Data.LiveSession;
using souschef.server.Data.Models;
using souschef.server.Data.Repository.Contracts;


namespace souschef.server.Controllers;

[ApiController]
[Route("api/cookingsession")]
public class CookingSessionController : Controller
{
    private readonly ICookingSessionRepository    m_cookingSessionRepository;
    private readonly UserManager<ApplicationUser> m_userManager;

    public CookingSessionController(ICookingSessionRepository _cookingSessionRepository, UserManager<ApplicationUser> _userManager)
    {
        m_cookingSessionRepository = _cookingSessionRepository;
        m_userManager = _userManager;
    }

    [HttpGet("Start")]
    public ActionResult Start()
    {

        var t = new List<Data.Models.Task>();

        t.Add(new Data.Models.Task
        {
           Id = Guid.NewGuid(),
           Name = "Cut Onions",
           Description = "Chop the onions NOWWWWW",
           Ingredients = new List<Ingredient>
           {
               new Ingredient{ Id = Guid.NewGuid(), Name="Onion", Quantity=6 }
           },

           Kitchenware = new List<Kitchenware>
           {
               new Kitchenware{ Id = Guid.NewGuid(), Name="Knife", Quantity=1 }
           },
           Duration = 1,
           Difficulty = 1,
           Points = 1,
           Finished = false,
        });

        t.Add(new Data.Models.Task
        {
            Id = Guid.NewGuid(),
            Name = "Cut Carrot",
            Description = "Chop the Carrots NOWWWWW",
            Ingredients = new List<Ingredient>
           {
               new Ingredient{ Id = Guid.NewGuid(), Name="Carrot", Quantity=6 }
           },

            Kitchenware = new List<Kitchenware>
           {
               new Kitchenware{ Id = Guid.NewGuid(), Name="Knife", Quantity=1 }
           },
            Duration = 1,
            Difficulty = 1,
            Points = 1,
            Finished = false,

        });

        var r_List = new List<Recipe>();

        var r = new Recipe
        {
            Tasks = t,
            Duration = 10,
            Id = Guid.NewGuid()
        };

        r_List.Add(r);

        var m = new MealPlan
        {
            OccasionType = 0,
            Recipes = r_List,
            Id = Guid.NewGuid()
        };


        var s = new CookingSession
        {
            Id = Guid.NewGuid(),
            Date = DateTime.Now,
            MealPlan = m,

        };

        var session = LiveSessions.GetLiveSessions().StartCookingSession(s);

        if (session != null)
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
    public IEnumerable<ApplicationUser> GetUsers(string _sessionId)
    {
        return m_cookingSessionRepository.GetUsers(Guid.Parse(_sessionId));
    }

    [HttpGet("gettask")]
    public ActionResult<Data.Models.Task> GetTask(string _sessionId)
    {

        var session = LiveSessions.GetLiveSessions().GetSessionById(Guid.Parse(_sessionId));
        var s = session.GetNextTask();
        if (s != null)
            return Ok(s);
        else return new ContentResult() { Content = "No More Tasks", StatusCode = 403 };
    }

    [HttpPost("CompleteTask{sessionId},{taskId}")]
    public IActionResult CompleteTask(string _sessionId, string _taskId)
    {
        var session = LiveSessions.GetLiveSessions().GetSessionById(Guid.Parse(_sessionId));
        session.Tasks[Guid.Parse(_taskId)].Finished = true;

        return Ok();
    }
}