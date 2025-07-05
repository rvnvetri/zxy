using ASMNT.Server.Entities;
using ASMNT.Server.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

namespace ASMNT.Server.Services
{
    public interface IMailService
    {
        Task<List<UniversityInfo>> GetData();
        Task<bool> SendEmail(string emailId, string messageBody, string messagebody);
    }
    public class MailService : BaseService, IMailService
    {
        private readonly IUniversityInfoRepository _universityInfoRepository;
        private readonly IConfiguration _configuration;
        public MailService(IUniversityInfoRepository universityInfoRepository,IConfiguration configuration)
        {
            _universityInfoRepository = universityInfoRepository;
            _configuration = configuration;
        }
        public async Task<List<UniversityInfo>> GetData()
        {
            var item = await _universityInfoRepository.Query().ToListAsync();
            return item;
        }
        public async Task<bool> SendEmail(string emailId, string emailsubject, string emailContent)
        {
            using (var message = new MailMessage())
            {
                message.From = new MailAddress(_configuration.GetSection("Email:FromEmail").Value, "Forget Password");                
                message.To.Add(new MailAddress(emailId));
                message.Subject = emailsubject;
                message.Body = emailContent;

                message.IsBodyHtml = true;
                message.DeliveryNotificationOptions = System.Net.Mail.DeliveryNotificationOptions.OnSuccess;
                using (var client = new SmtpClient("smtp.fatcow.com"))
                {
                    client.Port = 587;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential("rvnvetri@gmail.com", _configuration.GetSection("Email:EmailPwd").Value);
                    client.EnableSsl = true;
                    client.Send(message);
                }
            }
            return false;
        }
    }
}
