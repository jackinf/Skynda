﻿using System;
using System.Collections.Generic;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleReportViewModel : BaseViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Inspector { get; set; }
        public IList<VehicleReportItemViewModel> Items { get; set; } = new List<VehicleReportItemViewModel>();
        public IList<FaultBaseViewModel> Faults { get; set; } = new List<FaultBaseViewModel>();

        [Obsolete("Remove, because there are no modals in the backend, thus frontend logic should not be mixed with backend.")]
        public bool IsModal { get; set; }
    }
}