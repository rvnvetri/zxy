using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ASMNT.Server.Entities;

[Keyless]
public partial class VwAdminDashboard
{
    public int? StudenRegitrationCount { get; set; }

    public int? StaffRegitrationCount { get; set; }
    public int? InActiveUserCount { get; set; }
    
}
