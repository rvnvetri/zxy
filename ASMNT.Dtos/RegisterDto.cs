﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASMNT.Dtos
{
    public class RegisterDto
    {
        public string? FirstName  { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }        
        public string? Password { get; set; }
        public string? UniversityName { get; set; }
        public string? UniversityState { get; set; }
        public string? Role { get; set; }
    }
}
