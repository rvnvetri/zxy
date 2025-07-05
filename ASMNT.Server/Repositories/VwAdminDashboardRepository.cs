
using ASMNT.Server.Entities;

namespace ASMNT.Server.Repositories
{
    public interface IVwAdminDashboardRepository : IBaseRepository<VwAdminDashboard, int>
    {
        IQueryable<VwAdminDashboard> GetData();
    }
    public class VwAdminDashboardRepository(ApplicationDbContext dbContext) : BaseRepository<VwAdminDashboard, int>(dbContext), IVwAdminDashboardRepository
    {
        public IQueryable<VwAdminDashboard> GetData()
        {
            return Query().AsQueryable();
        }
    }
}
