
using ASMNT.Server.Entities;

namespace ASMNT.Server.Repositories
{
    public interface IVwStudentDashboardRepository : IBaseRepository<VwStudentDashboard, int>
    {
        IQueryable<VwStudentDashboard> GetData();
    }
    public class VwStudentDashboardRepository(ApplicationDbContext dbContext) : BaseRepository<VwStudentDashboard, int>(dbContext), IVwStudentDashboardRepository
    {
        public IQueryable<VwStudentDashboard> GetData()
        {
            return Query().AsQueryable();
        }
    }
}
