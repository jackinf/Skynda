using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models.Assignment
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
