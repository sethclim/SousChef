using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using souschef.server.Data.DTOs;
using souschef.server.Data.LiveSession;
using souschef.server.Data.Models;
using souschef.server.Data.Repository.Contracts;
using souschef.server.Helpers;

namespace souschef.server.Controllers;

[ApiController]
[Route("api/live-cookingsession")]
public class LiveCookingSessionController : Controller
{
    private readonly ICookingSessionRepository m_cookingSessionRepository;
    private readonly UserManager<ApplicationUser> m_userManager;

    public LiveCookingSessionController(ICookingSessionRepository _cookingSessionRepository, UserManager<ApplicationUser> _userManager)
    {
        m_cookingSessionRepository = _cookingSessionRepository;
        m_userManager = _userManager;
    }

    [HttpGet("start")]
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
            Date = Conversions.GetUnixTimeStamp(DateTime.Now),
            MealPlan = m,
        };

        var members = new List<UserDTO>();

        foreach(var mem in s.Guests)
        {
            members.Add(Conversions.ToUserDTO(mem));
        }

        var session = LiveSessions.GetLiveSessions().StartCookingSession(s.Id, s.MealPlan, Conversions.ToUserDTO(s.Host), members);

        if (session != null)
        {
            return Ok(session.Id);
        }
        else
        {
            return new ContentResult() { Content = "Start session failed", StatusCode = 404 };
        }
    }

    [HttpGet("end")]
    public IActionResult End([FromQuery] string sessionId)
    {
        if (LiveSessions.GetLiveSessions().RemoveSessionById(Guid.Parse(sessionId)))
        {
                return Ok();
            }

        return new ContentResult() { Content = "Invalid session ID", StatusCode = 404 };
    }

    [HttpPost("join")]
    public async Task<IActionResult> Join([FromQuery] string sessionId)
    {
        // var user = await m_userManager.FindByIdAsync(userId);
        var session = LiveSessions.GetLiveSessions().GetSessionById(Guid.Parse(sessionId));

        if (session != null)
        {
            // session.Members.Add(user);
            return Ok();
        }

        return new ContentResult() { Content = "Invalid session ID", StatusCode = 404 };
    }

    [HttpPost("leave")]
    public async Task<IActionResult> Leave([FromQuery] string sessionId)
    {
        // var user = await m_userManager.FindByIdAsync(userId);
        var session = LiveSessions.GetLiveSessions().GetSessionById(Guid.Parse(sessionId));

        if (session != null)
        {
            // session.Members.Remove(user);
            return Ok();
        }

        return new ContentResult() { Content = "Invalid session ID", StatusCode = 404 };
    }

    [HttpGet("get-users")]
    public IEnumerable<ApplicationUser> GetUsers([FromQuery] string sessionId)
    {
        return m_cookingSessionRepository.GetUsers(Guid.Parse(sessionId));
    }

    [HttpGet("get-task")]
    public ActionResult<Data.Models.Task> GetTask([FromQuery] string sessionId)
    {
        var session = LiveSessions.GetLiveSessions().GetSessionById(Guid.Parse(sessionId));
        if (session != null)
        {
            var task = session.GetNextTask();
            if (task != null) return Ok(task);
            return new ContentResult() { Content = "No more tasks available", StatusCode = 404 };
        }

        return new ContentResult() { Content = "Invalid session ID", StatusCode = 404 };
    }

    [HttpPost("complete-task")]
    public IActionResult CompleteTask([FromQuery] string sessionId, [FromQuery] string taskId)
    {
        var session = LiveSessions.GetLiveSessions().GetSessionById(Guid.Parse(sessionId));

        if (session != null)
        {
            if (session.Tasks.ContainsKey(Guid.Parse(taskId)))
            {
                session.Tasks[Guid.Parse(taskId)].Finished = true;
                return Ok();
            }
            return new ContentResult() { Content = "Task not found", StatusCode = 404 };
        }

        return new ContentResult() { Content = "Invalid session ID", StatusCode = 404 };
    }
}