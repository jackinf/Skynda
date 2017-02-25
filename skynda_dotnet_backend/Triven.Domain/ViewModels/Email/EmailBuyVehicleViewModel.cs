namespace Triven.Domain.ViewModels.Email
{
    public class EmailBuyVehicleModel
    {
        public string FullName { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }
        public string Comment { get; set; }

        public string VehiclePk { get; set; }

        public string GetSender()
        {
            return Email;
        }

        public string GetContent()
        {
            return "Client is interested in buying a vehicle. " +
                    "\nName: " + FullName +
                    "\nEmail: " + Email +
                    "\nPhone: " + Phone +
                    "\nVehicle he/she is interested in: http://triven.eu/details/" + VehiclePk;
        }
    }
}