using System.Collections.Generic;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class CategoriesModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public IList<PointsModel> Items { get; set; }
        public string Inspector { get; set; }
        public IList<FaultBaseModel> Faults { get; set; }
    }
}