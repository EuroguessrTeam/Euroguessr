using Euroguessr.Data;
using Euroguessr.Interfaces;
using Euroguessr.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionstring = builder.Configuration.GetConnectionString("DatabaseConnection");

builder.Services.AddDbContext<EntityContext>(opt => opt.UseNpgsql(connectionstring, npgsqlopt => npgsqlopt.MigrationsAssembly("Euroguessr.Data")));

/*builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();*/
builder.Services.AddControllersWithViews();
builder.Services.AddHttpContextAccessor();

// #                      #
// # Variables de session #
// #                      #
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options => options.IdleTimeout = TimeSpan.FromDays(1));


// #                        #
// # Services personnalisés #
// #                        #
builder.Services.AddScoped<IAccountManagerService, AccountManagerService>();
builder.Services.AddScoped<ISongManagerService, SongManagerService>();
builder.Services.AddScoped<ISongToGuessService, SongToGuessService>();

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

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<EntityContext>();

    if (context.Database.GetPendingMigrations().Any())
        context.Database.Migrate();

    context.InitializeDefaultData();
}

app.Run();
