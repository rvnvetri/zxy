using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;

namespace ASMNT.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BaseController : Controller
    {
        [HttpGet("login")]
        public string LoggedInUserName()
        {
            var user = User.Identity.Name;
            if (string.IsNullOrWhiteSpace(user))
            {
                throw new Exception("User Not found");
            }
            else
                return user;

        }
    }
}
