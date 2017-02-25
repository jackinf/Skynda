using System.Collections.Generic;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class CategoriesViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public IList<PointsViewModel> Items { get; set; }
        public string Inspector { get; set; }
        public IList<FaultBaseViewModel> Faults { get; set; }
    }
}