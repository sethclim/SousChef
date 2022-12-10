using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using souschef.server.Data.Models;
using souschef.server.Data.Repository.Contracts;
using souschef.server.Helpers;

namespace souschef.server.Controllers
{
    [ApiController]
    [Route("api/cookingsession")]
    public class CookingSessionController : Controller
    {
        private readonly ICookingSessionRepository m_cookingSessionRepository;
        private readonly UserManager<ApplicationUser> m_userManager;

        public CookingSessionController(ICookingSessionRepository _cookingSessionRepository, UserManager<ApplicationUser> _userManager)
        {
            m_cookingSessionRepository = _cookingSessionRepository;
            m_userManager = _userManager;
        }
        
        [HttpGet("get-todays-cooking-session-by-user")]
        public async Task<ActionResult> GetTodaysCookingSessionByUser([FromQuery] string userId)
        {
            var user = await m_userManager.FindByIdAsync(userId);

            if(user == null)
            {
                return new ContentResult() { Content = "User Not Found", StatusCode = 404 };
            }
            else if(user.CookingSessions == null)
            {
                return new ContentResult() { Content = "User doesn't have cooking session", StatusCode = 404 };
            }

            var todaysSessions = user.CookingSessions?.Where(ck => ck.Date == Conversions.GetUnixTimeStamp(DateTime.Now));

            if(todaysSessions == null)
                return new ContentResult() { Content = "User doesn't have cooking session today", StatusCode = 404 };

            return Ok(todaysSessions);
        }

    }
}
