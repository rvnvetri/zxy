
using ASMNT.Server.Entities;

namespace ASMNT.Server.Repositories
{
    public interface IUniversityInfoRepository : IBaseRepository<UniversityInfo, int>
    {
        IQueryable<UniversityInfo> GetData();
    }
    public class UniversityInfoRepository(ApplicationDbContext dbContext) : BaseRepository<UniversityInfo, int>(dbContext), IUniversityInfoRepository
    {
        public IQueryable<UniversityInfo> GetData()
        {
            return Query().AsQueryable();
        }
    }
}
