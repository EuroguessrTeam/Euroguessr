using Euroguessr.Data;
using Euroguessr.Data.Interfaces;
using Euroguessr.Data.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<EntityContext>(opt =>
    opt.UseNpgsql(connectionString)
);

/*builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();*/
builder.Services.AddControllersWithViews();
builder.Services.AddHttpContextAccessor();

//Ajout variables session
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromDays(1);
});

//Services personnalisés
builder.Services.AddScoped<IJsonManagerService, JsonManagerService>();
builder.Services.AddScoped<ISessionManagerService, SessionManagerService>();

var app = builder.Build();

app.UseSession();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
//app.MapRazorPages();

app.Run();
