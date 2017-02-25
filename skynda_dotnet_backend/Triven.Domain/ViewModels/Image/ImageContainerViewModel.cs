using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Image
{
    public class ImageContainerViewModel : BaseViewModel
    {
        public ImageViewModel Image { get; set; }
        public string Thumbnail { get; set; }
    }
}