using AspNetCoreRateLimit;
using Euroguessr.Data;
using Euroguessr.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var corsOrigin = builder.Configuration.GetSection("CorsOrigin").Get<string>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins(corsOrigin ?? "")
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

// Add services to the container.
var connectionstring = builder.Configuration.GetConnectionString("DatabaseConnection");

builder.Services.AddDbContext<EntityContext>(opt => opt.UseNpgsql(connectionstring, npgsqlopt => npgsqlopt.MigrationsAssembly("Euroguessr.Data")));

/*builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();*/
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Euroguessr API", Version = "v1" });
    var euroguessrDocumentation = Path.Combine(System.AppContext.BaseDirectory, "Euroguessr.Documentation.xml");
    var euroguessrDataDocumentation = Path.Combine(System.AppContext.BaseDirectory, "Euroguessr.Data.Documentation.xml");
    option.IncludeXmlComments(euroguessrDocumentation);
    option.IncludeXmlComments(euroguessrDataDocumentation);
    option.AddSecurityDefinition("Account id", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid account id",
        Name = "accountId",
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Account id"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(options =>
{
    options.EnableEndpointRateLimiting = true;
    options.StackBlockedRequests = false;
    options.HttpStatusCode = 429;
    options.QuotaExceededResponse = new QuotaExceededResponse
    {
        Content = "{{ \"code\": 429, \"message\": \"Quota exceeded. Maximum allowed: {0} per {1}. Please try again in {2} second(s).\" }}",
        ContentType = "application/json",
    };
    options.RealIpHeader = "X-Real-IP";
    options.ClientIdHeader = "X-ClientId";
    options.GeneralRules = new List<RateLimitRule>
        {
            new() {
                Endpoint = "GET:/api/account/new",
                Period = "1h",
                Limit = 10,
            },
            new() {
                Endpoint = "GET:/api/song/search",
                Period = "1m",
                Limit = 100,
            },
            new() {
                Endpoint = "*",
                Period = "1s",
                Limit = 30,
            }
        };
});
builder.Services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
builder.Services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
builder.Services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();
builder.Services.AddInMemoryRateLimiting();

// #                      #
// # Variables de session #
// #                      #
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options => options.IdleTimeout = TimeSpan.FromDays(1));


// #                        #
// # Services personnalisés #
// #                        #
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<ISongService, SongService>();
builder.Services.AddTransient<GlobalExceptionHandlerMiddleware>();

var app = builder.Build();

// #             #
// # Middlewares #
// #             #
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseIpRateLimiting();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
//app.MapRazorPages();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<EntityContext>();

    if (context.Database.GetPendingMigrations().Any())
        context.Database.Migrate();

    context.InitializeDefaultData();
}

app.Urls.Add("http://[::]:7079");
app.Run();
