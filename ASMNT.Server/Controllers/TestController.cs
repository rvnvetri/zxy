
using ASMNT.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace ASMNT.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public TestController(UserManager<ApplicationUser> userManager,
      SignInManager<ApplicationUser> signInManager,
      RoleManager<IdentityRole> roleManager,
      IConfiguration configuration)
        {
            _userManager = userManager;
        }

        [HttpGet("check")]
        public IActionResult Check([FromServices] UserManager<ApplicationUser> manager)
        {
            return Ok(manager != null ? "Resolved" : "Failed");
        }
    }
}
