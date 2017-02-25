using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class ReviewModel : BaseModel
    {
        public string Text { get; set; }
        public int Rating { get; set; }
        public ImageModel Logo { get; set; }
        public ImageModel Video { get; set; }
    }
}