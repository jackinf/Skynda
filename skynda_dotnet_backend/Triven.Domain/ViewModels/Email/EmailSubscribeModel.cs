namespace Triven.Domain.ViewModels.Email
{
    public class EmailSubscribeModel
    {
        public string FirstName;
        public string LastName;
        public string Email;
        public string MobilePhone;
        public string VehiclePk;
        public string GetSender()
        {
            return Email;
        }

    public string GetContent()
        {
            return "Client is interested in buying a vehicle. " +
                    "\nFirst name: " + FirstName +
                    "\nLast name: " + LastName +
                    "\nCar he/she is interested in: http://triven.eu/details/" + VehiclePk;
        }
    }
}