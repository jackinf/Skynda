namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleImageFileToDeleteModel
    {
        /**
     * REQUIRED!
     */
        public string BlobName { get; set; }

        /**
         * REQUIRED!
         */
        public string ContainerName { get; set; }
    }
}