
using ASMNT.Server.Entities;

namespace ASMNT.Server.Repositories
{
    public interface ISpecialitiesQuesInfoRepository : IBaseRepository<SpecialitiesQuesInfo, int>
    {
        IQueryable<SpecialitiesQuesInfo> GetData();
    }
    public class SpecialitiesQuesInfoRepository(ApplicationDbContext dbContext) : BaseRepository<SpecialitiesQuesInfo, int>(dbContext), ISpecialitiesQuesInfoRepository
    {
        public IQueryable<SpecialitiesQuesInfo> GetData()
        {
            return Query().AsQueryable();
        }
    }
}
