using Microsoft.AspNetCore.Mvc;

namespace ASMNT.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValiController : Controller
    {
        [HttpPost("cors-test")]
        public IActionResult CorsTest([FromBody] MyDto dto)
        {
            try
            {
                if (dto == null)
                    return BadRequest("DTO is null");

                return Ok(new { message = $"Hello {dto.Name}" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        
        [HttpGet("cors-test-get")]
        public IActionResult CorsTestGet()
        {
            try
            {
                return Ok(new { message = $"Hello Get" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }
        public class MyDto
        {
            public string Name { get; set; }
        }
    }
}
