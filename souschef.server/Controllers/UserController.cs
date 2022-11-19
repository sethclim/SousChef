using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace souschef.server.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    /// <summary>
    /// Post endpoint to register for the application 
    /// </summary>
    /// <param name="RegisterDto">Register Dto with all the fields: ie username, email, password etc</param>
    /// <returns>Returns 200 ok or an error msg and status code</returns>
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if(dto.Password != dto.PasswordConfirm)
            return new ContentResult() { Content = "Password Do Not Match", StatusCode = 403 };

        var user = new ApplicationUser() { UserName = dto.UserName, Email = dto.Email};
        
        var result = await _userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
        {
            return new ContentResult() { Content = "Create User Failed", StatusCode = 403 };
        }

        return Ok();
    }

    /// <summary>
    /// Endpoint to fetch a current user for a given client
    /// </summary>
    /// <returns>Returns 200 ok with user or an error msg and status code</returns>
    [HttpPost("user")]
    public async Task<IActionResult> GetUser()
    {
        try
        {
            var jwt = Request.Cookies["jwt"];
            //var token = JwtService.Verify(jwt);
            //var userId = token.Issuer;

            var user = await _userManager.FindByEmailAsync("test@gmail.com");

            if (user == null)
                return Ok(null);
            
            // var userDto = new UserDto
            // {
            //     UserName = user.UserName,
            //     Email = user.Email,
            //     Projects = user.Projects,
            //     id = user.Id
            // };
            return Ok(user);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            
        }
        
        return new ContentResult() { Content = "Error Occurred", StatusCode = 403 };
    }


}