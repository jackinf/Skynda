using System.Collections.Generic;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleReportViewModel : BaseViewModel
    {
        public VehicleReportViewModel()
        {
            Items = new List<VehicleReportItemViewModel>();
        }

        //public VehicleAdminViewModel Vehicle { get; set; }
        public int VehicleId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Inspector { get; set; }
        public IList<VehicleReportItemViewModel> Items { get; set; }
        public IList<FaultBaseViewModel> Faults { get; set; }
        public bool IsModal { get; set; }

    }
}