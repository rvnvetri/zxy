using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ASMNT.Server.Entities;

[Keyless]
public partial class VwStudentDashboard
{
    public int RequestedAssementCount { get; set; }

    public int FeedbackCount { get; set; }
}
