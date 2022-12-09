using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using souschef.server.Data.Models;
using souschef.server.Data.Repository.Contracts;

namespace souschef.server.Controllers
{
    public class CookingSessionController : Controller
    {
        private readonly ICookingSessionRepository m_cookingSessionRepository;
        private readonly UserManager<ApplicationUser> m_userManager;

        public CookingSessionController(ICookingSessionRepository _cookingSessionRepository, UserManager<ApplicationUser> _userManager)
        {
            m_cookingSessionRepository = _cookingSessionRepository;
            m_userManager = _userManager;
        }

    }
}
