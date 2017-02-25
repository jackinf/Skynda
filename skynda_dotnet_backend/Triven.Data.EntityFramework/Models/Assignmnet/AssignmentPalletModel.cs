using System.ComponentModel.DataAnnotations.Schema;
using X3Project.Domain.Models.Assignment;

namespace X3Project.Data.EntityFramework.Models.Assignmnet
{
    [Table("AssignmentPallet")]
    public class AssignmentPalletModel : IAssignmentPalletModel
    {
        public int Id { get; set; }

        [ForeignKey("Assignment")]
        public int AssignmentId_FK { get; set; }
        public virtual AssignmentModel Assignment { get; set; }


        public int Amount { get; set; }
        public string Type { get; set; }
    }
}
