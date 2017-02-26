namespace Triven.Domain.ViewModels.Email
{
    public class EmailSellVehicleViewModel : EmailBaseViewModel
    {
        public string FullName;
        public string Email;
        public string Phone;
        public string VehicleRegistrationMark;

        public override string GetSubject() => "Interest in selling a vehicle";
        public override string GetSender() => Email;
        public override string GetContent() => "Client is interested in selling a vehicle. " +
                                      "\nName: " + FullName +
                                      "\nEmail: " + Email +
                                      "\nPhone: " + Phone +
                                      "\nVehicle registration number: " + VehicleRegistrationMark;
    }
}