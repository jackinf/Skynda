using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class ReviewViewModel : BaseViewModel
    {
        public string Text { get; set; }
        public int Rating { get; set; }
        public ImageViewModel Logo { get; set; }
        public ImageViewModel Video { get; set; }
    }
}