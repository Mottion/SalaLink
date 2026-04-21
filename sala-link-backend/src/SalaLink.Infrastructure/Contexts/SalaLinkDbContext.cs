using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace SalaLink.Infrastructure.Contexts;


public class SalaLinkDbContext(DbContextOptions<SalaLinkDbContext> options) : DbContext(options)
{
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    // Add entities to the model
    AddEntities(modelBuilder);

    // Add seed data to the model
    AddSeed(modelBuilder);
  }

  private static void AddEntities(ModelBuilder modelBuilder)
  {
    var assembly = Domain.AssemblyReference.Assembly;

    var types = assembly.GetTypes()
      .Where(t => t.IsSubclassOf(typeof(Domain.Entity.Common.GenericEntity)));

    foreach (var type in types)
      modelBuilder.Entity(type);
  }

  private static void AddSeed(ModelBuilder modelBuilder)
  {
    var assembly = Assembly.GetExecutingAssembly();
    var types = assembly.GetTypes()
      .Where(t =>
        t.BaseType != null &&
        t.BaseType.IsGenericType &&
        t.BaseType.GetGenericTypeDefinition() == typeof(Seed.Common.GenericSeed<>));

    foreach (var type in types)
    {
      var seedInstance = Activator.CreateInstance(type);
      var seedDataProperties = type.GetProperties()
        .Where(p => p.PropertyType.IsSubclassOf(typeof(Domain.Entity.Common.GenericEntity)))
        .ToList();
      foreach (var property in seedDataProperties)
      {
        var seedData = property.GetValue(seedInstance);
        if (seedData != null)
          modelBuilder.Entity(seedData.GetType()).HasData(seedData);
      }
    }
  }
}