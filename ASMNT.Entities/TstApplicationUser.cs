using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASMNT.Entities
{
    public class TstApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UniversityName { get; set; }
        public string? UniversityState { get; set; }
        public bool? IsActive { get; set; } = false;
    }
}
