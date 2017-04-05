using System.ComponentModel.DataAnnotations.Schema;
using Triven.Domain.Constants;
using Triven.Domain.Extensions;
using Triven.Domain.Models.Assignment;

namespace Triven.Data.EntityFramework.Models.Assignmnet
{
    [Table("AssignmentAddress")]
    public class AssignmentAddressModel : IAssignmentAddressModel
    {
        public int Id { get; set; }

        [ForeignKey("Assignment")]
        public int AssignmentId_FK { get; set; }
        public virtual AssignmentModel Assignment { get; set; }


        
        public string Street { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }

        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Type")]
        public string AssignmentAddressTypeString
        {
            get { return Type.ToString(); }
            private set { Type = value.ParseEnum<AssignmentAddressType>(); }
        }

        [NotMapped]
        public AssignmentAddressType Type { get; set; }

    }
}
