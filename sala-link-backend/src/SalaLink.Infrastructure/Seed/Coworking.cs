
using SalaLink.Domain.Entity.Public;
using SalaLink.Infrastructure.Seed.Common;

namespace SalaLink.Infrastructure.Seed;

public class CoworkingSeed : GenericSeed<Coworking>
{
  public static Coworking SalaLink { get; set; } = new()
  {
    Id = Guid.Parse("019da83d-9d95-72e7-b588-c11d0ec1bc3a"),
    Name = "SalaLink",
    ShortName = "salalink",
    Cnpj = "10387298000198",
    Logo = null,
    ColorThemePrimary = "#FF5733",
    ColorThemeSecondary = "#C70039",
    CreatedAt = new DateTime(2025, 1, 1)
  };
}