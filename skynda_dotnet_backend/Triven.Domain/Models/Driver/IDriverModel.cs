using Triven.Domain.Constants;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Driver
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
