namespace Triven.Domain.ViewModels.Email
{
    public class EmailSubscribeViewModel : EmailBaseViewModel
    {

        public string FirstName;
        public string LastName;
        public string Email;
        public string MobilePhone;
        public string VehiclePk;

        public override string GetSubject() => "Email subscription";
        public override string GetSender() => Email;
        public override string GetContent() => "Client is interested in buying a vehicle. " +
                                      "\nFirst name: " + FirstName +
                                      "\nLast name: " + LastName +
                                      "\nCar he/she is interested in: http://triven.eu/details/" + VehiclePk;
    }
}