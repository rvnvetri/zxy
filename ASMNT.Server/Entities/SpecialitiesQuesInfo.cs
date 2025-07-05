using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ASMNT.Server.Entities;

public partial class SpecialitiesQuesInfo
{
    [Key]
    public int SpecialitiesQuesId { get; set; }

    [Column("SpecialitiesQName")]
    [StringLength(100)]
    [Unicode(false)]
    public string? SpecialitiesQname { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? OrderIndex { get; set; }

    public bool? IsActive { get; set; }
}
