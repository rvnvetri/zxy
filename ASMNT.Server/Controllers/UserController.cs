using ASMNT.Dtos;
using ASMNT.Server.Models;
using ASMNT.Server.Services;
using ASMNT.Server.Services.Admin;
using ASMNT.Server.Services.Staff;
using ASMNT.Server.Services.Student;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Security.Principal;

namespace ASMNT.Server.Controllers
{
    public class UserController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAdminService _adminService;
        private readonly IStudentService _studentService;
        private readonly IStaffService _staffService;
        public UserController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager,IAdminService adminService,IStudentService studentService,IStaffService staffService)
        {
            _userManager = userManager;            
            _roleManager = roleManager;
            _adminService = adminService;
            _studentService = studentService;
            _staffService = staffService;
            
        }

        [HttpGet("UserProfile")]
        public async  Task<IActionResult> Profile()        
        {
            ProfileDto model = new ProfileDto();
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            //var user = await _userManager.FindByIdAsync(userId);
            model.FirstName = user.FirstName;
            model.LastName = user.LastName;
            model.FullName = $"{user.FirstName} {user.LastName}";
            var roles = await _userManager.GetRolesAsync(user);
            if (roles != null)
            {
                //var isRoleFound = roles.Where(x => x == model.Role).ToList();
                model.Role = roles[0];
            }
            return Ok(model);
        }

        [HttpGet("UserList")]
        public async Task<IActionResult> GetUserList()
        {

            var users = await _userManager.Users.ToListAsync();

            var result = new List<object>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                result.Add(new
                {
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    user.UniversityName,
                    user.IsActive,
                    Roles = roles
                });
            }

        //    var inactiveUsers = _userManager.Users
        //.Where(u => u.IsActive == false)
        //.Select(u => new ProfileDto(){ Email =u.Email, LastName = u.LastName, FirstName =u.FirstName)

        //    ProfileDto model = new ProfileDto();
        //    if (!User.Identity.IsAuthenticated)
        //    {
        //        return Unauthorized();
        //    }
        //    var user = await _userManager.FindByNameAsync(User.Identity.Name);
        //    //var user = await _userManager.FindByIdAsync(userId);
        //    model.FirstName = user.FirstName;
        //    model.LastName = user.LastName;
        //    model.FullName = $"{user.FirstName} {user.LastName}";
        //    var roles = await _userManager.GetRolesAsync(user);
        //    if (roles != null)
        //    {
        //        //var isRoleFound = roles.Where(x => x == model.Role).ToList();
        //        model.Role = roles[0];
        //    }
            return Ok(result);
        }

        // UsersController.cs
        [HttpPut("activate/{id}")]
        public async Task<IActionResult> ActivateUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound("User not found");

            user.IsActive = true;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "User activated successfully" });
        }


        [Authorize(Roles = "Admin")]
        [HttpGet("admindashoard")]
        public async Task<IActionResult> AdminDashboardData()
        {
            var objItem = await _adminService.GetDashboardData();            
            return Ok(new { 
                StudentRegCount= objItem.StudenRegitrationCount, 
                StaffRegCount= objItem.StaffRegitrationCount , 
                UserInactiveCount = objItem.InActiveUserCount });
        }
        [Authorize(Roles = "Student")]
        [HttpGet("studentdashoard")]
        public async Task<IActionResult> StudentDashboardData()
        {
            var objItem = await _studentService.GetDashboardData();
            return Ok(new
            {
                RequestedAssementCount = objItem.RequestedAssementCount,
                FeedbackCount = objItem.FeedbackCount
                
            });
        }
        [Authorize(Roles = "Staff")]
        [HttpGet("staffdashoard")]
        public async Task<IActionResult> StaffDashboardData()
        {
            var objItem = await _staffService.GetDashboardData();
            return Ok(new
            {
                SubmittedAssementCount = objItem.SubmittedAssementCount,
                AssementInQueue = objItem.AssementInQueue                
            });
        }
    }
}
