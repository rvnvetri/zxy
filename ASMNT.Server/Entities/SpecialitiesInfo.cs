using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ASMNT.Server.Entities;

public partial class SpecialitiesInfo
{
    [Key]
    public int SpecialitiesId { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? SpecialitiesName { get; set; }

    public bool? IsActive { get; set; }
}
