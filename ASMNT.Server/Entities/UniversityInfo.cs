using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ASMNT.Server.Entities;

[Keyless]
public partial class UniversityInfo
{
    public int UniverisityId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? UniversityName { get; set; }

    public int? StateId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? ZipCode { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? ContactNo { get; set; }

    public bool? IsActive { get; set; }
}
