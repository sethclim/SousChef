using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace souschef.server.Controllers;

[ApiController]
[Route("api/cookingseesion")]
public class CookingSessionController : Controller
{
    private readonly ICookingSessionRepository<ApplicationUser> m_cookingSessionRepository;

    public CookingSessionController(ICookingSessionRepository<ApplicationUser> _cookingSessionRepository)
    {
        m_cookingSessionRepository = _cookingSessionRepository;
    }

    [AllowAnonymous]
    [HttpPost("Start")]
    public async Task<IActionResult> Start()
    {

    }


    [AllowAnonymous]
    [HttpPost("End")]
    public async Task<IActionResult> End()
    {

    }


    [AllowAnonymous]
    [HttpPost("Join")]
    public async Task<IActionResult> Join()
    {

    }

    [AllowAnonymous]
    [HttpPost("Leave")]
    public async Task<IActionResult> Leave()
    {

    }

    [AllowAnonymous]
    [HttpGet("GetUsers")]
    public async Task<IActionResult> GetUsers()
    {

    }

    [AllowAnonymous]
    [HttpPost("GetTask")]
    public async Task<IActionResult> GetTask()
    {

    }

    [AllowAnonymous]
    [HttpPost("CompleteTask")]
    public async Task<IActionResult> CompleteTask()
    {

    }
}