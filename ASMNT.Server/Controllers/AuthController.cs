using ASMNT.Dtos;

using ASMNT.Server.Models;
using ASMNT.Server.Services;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ASMNT.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMailService _mailService;

        public AuthController(UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration configuration,
        IMailService mailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _mailService = mailService;
        }
        public class MyDto
        {
            public string Name { get; set; }
        }
        [HttpPost("login-post-test")]
        public IActionResult CorsTest([FromBody] MyDto dto)
        {
            try
            {
                if (dto == null)
                    return BadRequest("DTO is null");

                return Ok(new { message = $"Hello login post {dto.Name}" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            //var ff = await _mailService.SendEmail("rvnvetri@gmail.com", "test", "ABC");
            //var ii = await _mailService.GetData();            
            var user = await _userManager.FindByNameAsync(model.Username);            
                        
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized("Invalid credentials");

            if (user?.IsActive == false || user?.IsActive == null)
            {
                return Unauthorized("Awaiting for Admin to Activate");
            }

            var roles = await _userManager.GetRolesAsync(user);

            var isRoleFound = roles.Where(x => x == model.Role).ToList();
            if (isRoleFound == null || isRoleFound?.Count == 0)
            {
                return Unauthorized("Invalid credentials");
            }

            var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

            foreach (var role in roles)
                authClaims.Add(new Claim(ClaimTypes.Role, role));

            var authSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                expires: DateTime.UtcNow.AddMinutes(
                    Convert.ToDouble(_configuration["JwtSettings:ExpiresInMinutes"])),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
                username = user.UserName,
                roles = roles
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                UniversityName = model.UniversityName,
                UniversityState = model.UniversityState,
               
            };
            var existingUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "USER_EXISTS" });
            }

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            if (!string.IsNullOrEmpty(model.Role))
            {
                if (!await _roleManager.RoleExistsAsync(model.Role))
                    await _roleManager.CreateAsync(new IdentityRole(model.Role));

                await _userManager.AddToRoleAsync(user, model.Role);
            }

            return Ok("User registered successfully");
        }
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto model)
        {
            
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest(new { message = "Email not found" });

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var resetUrl = $"{Request.Scheme}://{Request.Host}/reset-password?email={model.Email}&token={Uri.EscapeDataString(token)}";
            await _mailService.SendEmail("rvnvetri@gmail.com", "test", resetUrl);
            // TODO: Send email with resetUrl (using SendGrid, SMTP, etc.)
            return Ok(new { resetUrl }); // Just return for now (testing)
        }
        


    }

}

