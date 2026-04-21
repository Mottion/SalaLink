namespace SalaLink.Application.Configuration;

using Microsoft.EntityFrameworkCore;
using SalaLink.Infrastructure.Contexts;

public static class DataBaseConfiguration
{
    public static void AddDatabase(this IServiceCollection services)
    {
        var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
        services.AddDbContext<SalaLinkDbContext>(options =>
            options.UseNpgsql(connectionString));
    }

    public static void RunMigrations(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<SalaLinkDbContext>();
        dbContext.Database.Migrate();
    }
}