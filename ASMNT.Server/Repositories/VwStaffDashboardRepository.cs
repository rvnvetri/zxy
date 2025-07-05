
using ASMNT.Server.Entities;

namespace ASMNT.Server.Repositories
{
    public interface IVwStaffDashboardRepository : IBaseRepository<VwStaffDashboard, int>
    {
        IQueryable<VwStaffDashboard> GetData();
    }
    public class VwStaffDashboardRepository(ApplicationDbContext dbContext) : BaseRepository<VwStaffDashboard, int>(dbContext), IVwStaffDashboardRepository
    {
        public IQueryable<VwStaffDashboard> GetData()
        {
            return Query().AsQueryable();
        }
    }
}
