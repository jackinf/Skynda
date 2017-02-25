using Triven.Domain.Constants;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Assignment
{
    public interface IAssignmentAddressModel : IBaseModel
    {
        int AssignmentId_FK { get; set; }

        //IAssignmentModel Assignment { get; set; }

        AssignmentAddressType Type { get; set; }

        string Street { get; set; }

        string City { get; set; }

        string ZipCode { get; set; }

        string Country { get; set; }

        string Longitude { get; set; }

        string Latitude { get; set; }
    }
}
