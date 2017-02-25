using System.Collections.Generic;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleReportModel : BaseModel
    {
        public VehicleReportModel()
        {
            Items = new List<VehicleReportItemModel>();
        }

        public int VehicleId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Inspector { get; set; }
        public IList<VehicleReportItemModel> Items { get; set; }
        public IList<FaultBaseModel> Faults { get; set; }
        public bool IsModal { get; set; }

    }
}