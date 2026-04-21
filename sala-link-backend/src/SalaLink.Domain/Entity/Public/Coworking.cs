using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using SalaLink.Domain.Entity.Common;

namespace SalaLink.Domain.Entity.Public;

[Table("coworking")]
[Index(nameof(ShortName), IsUnique = true)]
public class Coworking : GenericEntity
{
    [Column("name")]
    [MaxLength(255)]
    [MinLength(1)]
    public string Name { get; set; } = null!;

    [Column("short_name")]
    [MaxLength(25)]
    [MinLength(1)]
    public string ShortName { get; set; } = null!;

    [Column("cnpj")]
    [MaxLength(15)]
    [MinLength(1)]
    public string Cnpj { get; set; } = null!;

    [Column("logo")]
    public string? Logo { get; set; }

    [Column("color_theme_primary")]
    [StringLength(7, MinimumLength = 7)]
    public string? ColorThemePrimary { get; set; }

    [Column("color_theme_secondary")]
    [StringLength(7, MinimumLength = 7)]
    public string? ColorThemeSecondary { get; set; }
}
