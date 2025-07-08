
using ASMNT.Server.Entities;
using ASMNT.Server.Models;
using ASMNT.Server.Repositories;
using ASMNT.Server.Services;
using ASMNT.Server.Services.Admin;
using ASMNT.Server.Services.Staff;
using ASMNT.Server.Services.Student;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


var connectionString = builder.Configuration.GetConnectionString("ApplicationDbContextConnection") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Read JWT settings
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = true;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuerSigningKey = true
    };
});

//builder.Services.AddAuthorization();
//builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
//    .AddEntityFrameworkStores<ApplicationDbContext>();


builder.Services.AddControllersWithViews().AddJsonOptions(o =>
{
    o.JsonSerializerOptions.PropertyNamingPolicy = null;
});
builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IStaffService, StaffService>();

builder.Services.AddScoped<IUniversityInfoRepository, UniversityInfoRepository>();
builder.Services.AddScoped<IVwAdminDashboardRepository, VwAdminDashboardRepository>();
builder.Services.AddScoped<IVwStudentDashboardRepository, VwStudentDashboardRepository>();
builder.Services.AddScoped<IVwStaffDashboardRepository, VwStaffDashboardRepository>();
builder.Services.AddScoped<ISpecialitiesInfoRepository, SpecialitiesInfoRepository>();
builder.Services.AddScoped<ISpecialitiesQuesInfoRepository, SpecialitiesQuesInfoRepository>();

builder.Services.AddAuthorization();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://d2zdhjslqx2fr5.cloudfront.net")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);
var app = builder.Build();

app.UseDefaultFiles(); //Addde by vetri
app.UseStaticFiles(); // Added by vetri
//app.MapIdentityApi<ApplicationUser>(); // Added by Vetri This is for call identity app


app.UseCors("AllowReactApp");
app.UseAuthentication();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapGet("/test", () => "API is works");
app.MapGet("/cors-test", () => "CORS works").RequireCors("AllowReactApp");

app.Run();
