using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ASMNT.Server.Entities;

[Keyless]
public partial class VwStaffDashboard
{
    public int SubmittedAssementCount { get; set; }

    public int AssementInQueue { get; set; }
}
