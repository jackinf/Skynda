namespace Triven.Domain.ViewModels.Email
{
    public class EmailSellVehicle
    {
        public string FullName;
        public string Email;
        public string Phone;
        public string VehicleRegistrationMark;


        public string GetSender()
        {
            return Email;
        }

        public string GetContent()
        {
            return "Client is interested in selling a vehicle. " +
                    "\nName: " + FullName +
                    "\nEmail: " + Email +
                    "\nPhone: " + Phone +
                    "\nVehicle registration number: " + VehicleRegistrationMark;

        }
    }
}