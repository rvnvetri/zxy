using ASMNT.Server.Services.Student;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ASMNT.Server.Controllers
{
    public class StudentController : BaseController
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService) {
            _studentService = studentService;
        }
        [Authorize(Roles = "Admin,Student,Staff")]
        [HttpGet("getspecialities")]
        public async Task<IActionResult> GetSpecialitiesList()
        {
            var objItem = await _studentService.GetSpecialitiesList();
            var result = new List<object>();
            foreach (var item in objItem)
            {
                result.Add(new
                {
                    item.SpecialitiesId,
                    item.SpecialitiesName,
                    item.IsActive                    
                });
            }
            return Ok(result);
        }
        [Authorize(Roles = "Admin,Student,Staff")]
        [HttpGet("getspecialitiesq")]
        public async Task<IActionResult> GetSpecialitiesListQues()
        {
            var objItem = await _studentService.GetSpecialitiesQList();
            var result = new List<object>();
            foreach (var item in objItem)
            {
                result.Add(new
                {
                    item.SpecialitiesQuesId,
                    item.SpecialitiesQname,
                    item.OrderIndex ,
                    item.IsActive
                });
            }
            return Ok(result);
        }
    }
}
