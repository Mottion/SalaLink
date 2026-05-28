using Microsoft.EntityFrameworkCore;

namespace SalaLink.Infrastructure.Contexts;

public class TenantDbContext(DbContextOptions<TenantDbContext> options) : DbContext(options)
{
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    // Add entities to the model
    AddEntities(modelBuilder);
  }

  private static void AddEntities(ModelBuilder modelBuilder)
  {
    var assembly = Domain.AssemblyReference.Assembly;

    var types = assembly.GetTypes()
      .Where(t => t.BaseType == typeof(Domain.Entity.Common.TenantEntity));

    foreach (var type in types)
      modelBuilder.Entity(type);
  }
}