using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models.Driver
{
    public interface IDriverModel : IAuditableBaseModel
    {
        string FistName { get; set; }
        string LastName { get; set; }
        string DrivingLicenseNr { get; set; }
        string Email { get; set; }
        string Phone { get; set; }
        decimal Rating { get; set; }
        Status Status { get; set; }
    }
}
