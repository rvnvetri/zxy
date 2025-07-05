using ASMNT.Server.Entities;
using ASMNT.Server.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ASMNT.Server.Services.Staff
{
    public interface IStaffService
    {
        Task<VwStaffDashboard> GetDashboardData();
    }


    public class StaffService : BaseService, IStaffService
    {
        private readonly IVwStaffDashboardRepository _vwStaffDashboardRepository;
        private readonly IConfiguration _configuration;
        public StaffService(IVwStaffDashboardRepository vwStaffDashboardRepository, IConfiguration configuration)
        {
            _vwStaffDashboardRepository = vwStaffDashboardRepository;
            _configuration = configuration;
        }
        public async Task<VwStaffDashboard> GetDashboardData()
        {
            var item = await _vwStaffDashboardRepository.Query().FirstOrDefaultAsync();
            return item;
        }
    }    
}
