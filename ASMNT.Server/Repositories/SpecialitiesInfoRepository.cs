
using ASMNT.Server.Entities;

namespace ASMNT.Server.Repositories
{
    public interface ISpecialitiesInfoRepository : IBaseRepository<SpecialitiesInfo, int>
    {
        IQueryable<SpecialitiesInfo> GetData();
    }
    public class SpecialitiesInfoRepository(ApplicationDbContext dbContext) : BaseRepository<SpecialitiesInfo, int>(dbContext), ISpecialitiesInfoRepository
    {
        public IQueryable<SpecialitiesInfo> GetData()
        {
            return Query().AsQueryable();
        }
    }
}
