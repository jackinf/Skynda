using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Assignment
{
    public interface IAssignmentPalletModel : IBaseModel
    {
        int AssignmentId_FK { get; set; }
        //IAssignmentModel Assignment { get; set; }
        int Amount { get; set; }
        string Type { get; set; }
    }
}
