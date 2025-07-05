
using ASMNT.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ASMNT.Server.Entities
{
    public partial class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<UniversityInfo> UniversityInfo { get; set; }
        public virtual DbSet<VwAdminDashboard> VwAdminDashboard { get; set; }
        public virtual DbSet<VwStaffDashboard> VwStaffDashboard { get; set; }
        public virtual DbSet<VwStudentDashboard> VwStudentDashboard { get; set; }
        public virtual DbSet<SpecialitiesInfo> SpecialitiesInfo { get; set; }
        public virtual DbSet<SpecialitiesQuesInfo> SpecialitiesQuesInfo { get; set; }




    }
}
