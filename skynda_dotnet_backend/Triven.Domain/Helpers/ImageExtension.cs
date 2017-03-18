using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

namespace Triven.Domain.Extensions
{
    public static class ImageExtension
    {
        public static Image ImageFromRawBgraArray(this byte[] arr, PixelFormat pixelFormat,
            int width = 200, int height = 200, int x = 0, int y = 0)
        {
            var rect = new Rectangle(x, y, width, height);
            var output = new Bitmap(width, height, pixelFormat);
            var bmpData = output.LockBits(rect, ImageLockMode.ReadWrite, output.PixelFormat);

            // Row-by-row copy
            var arrRowLength = width * Image.GetPixelFormatSize(output.PixelFormat) / 8;
            var ptr = bmpData.Scan0;
            for (var i = 0; i < height; i++)
            {
                Marshal.Copy(arr, i * arrRowLength, ptr, arrRowLength);
                ptr += bmpData.Stride;
            }

            output.UnlockBits(bmpData);
            return output;
        }

        public static Image CropImage(this Image img, Rectangle cropArea)
        {
            Bitmap bmpImage = new Bitmap(img);
            return bmpImage.Clone(cropArea, bmpImage.PixelFormat);
        }
    }
}