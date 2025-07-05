using Microsoft.AspNetCore.Identity;

namespace ASMNT.Server.Models
{
    public class ApplicationUser:IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UniversityName { get; set; }
        public string? UniversityState { get; set; }
        public bool? IsActive { get; set; } = false;
    }
}
