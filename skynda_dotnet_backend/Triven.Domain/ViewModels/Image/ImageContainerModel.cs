using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Image
{
    public class ImageContainerModel : BaseModel
    {
        public ImageModel Image { get; set; }
        public string Thumbnail { get; set; }
    }
}