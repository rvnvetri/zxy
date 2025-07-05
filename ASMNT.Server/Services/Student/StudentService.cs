using ASMNT.Server.Entities;
using ASMNT.Server.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ASMNT.Server.Services.Student
{
    public interface IStudentService
    {
        Task<VwStudentDashboard> GetDashboardData();
        Task<List<SpecialitiesInfo>> GetSpecialitiesList();
        Task<List<SpecialitiesQuesInfo>> GetSpecialitiesQList();
    }


    public class StudentService : BaseService, IStudentService
    {
        private readonly IVwStudentDashboardRepository _vwStudentDashboardRepository;
        private readonly ISpecialitiesInfoRepository _specialitiesInfoRepository;
        private readonly ISpecialitiesQuesInfoRepository _specialitiesQuesInfoRepository;
        private readonly IConfiguration _configuration;
        public StudentService(IVwStudentDashboardRepository vwStudentDashboardRepository,
            ISpecialitiesInfoRepository specialitiesInfoRepository, ISpecialitiesQuesInfoRepository specialitiesQuesInfoRepository,
            IConfiguration configuration)
        {
            _vwStudentDashboardRepository = vwStudentDashboardRepository;
            _specialitiesInfoRepository=specialitiesInfoRepository;
            _specialitiesQuesInfoRepository = specialitiesQuesInfoRepository;
            _configuration = configuration;
        }
        public async Task<VwStudentDashboard> GetDashboardData()
        {
            var item = await _vwStudentDashboardRepository.Query().FirstOrDefaultAsync();
            return item;
        }
        public async Task<List<SpecialitiesInfo>> GetSpecialitiesList()
        {
            var item = await _specialitiesInfoRepository.Query().ToListAsync();
            return item;
        }
        public async Task<List<SpecialitiesQuesInfo>> GetSpecialitiesQList()
        {
            var item = await _specialitiesQuesInfoRepository.Query().ToListAsync();
            return item;
        }
    }
    
}
