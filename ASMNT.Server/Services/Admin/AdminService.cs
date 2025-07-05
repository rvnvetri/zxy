
using ASMNT.Server.Entities;
using ASMNT.Server.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

namespace ASMNT.Server.Services.Admin
{
    public interface IAdminService
    {
        Task<VwAdminDashboard> GetDashboardData();        
    }
    
        
        public class AdminService : BaseService, IAdminService
    {
        private readonly IVwAdminDashboardRepository _vwAdminDashboardRepository;
            private readonly IConfiguration _configuration;
            public AdminService(IVwAdminDashboardRepository vwAdminDashboardRepository, IConfiguration configuration)
            {
            _vwAdminDashboardRepository = vwAdminDashboardRepository;
                _configuration = configuration;
            }
            public async Task<VwAdminDashboard> GetDashboardData()
            {
            var item = await _vwAdminDashboardRepository.Query().FirstOrDefaultAsync();
                return item;
            }           
        }
    }

