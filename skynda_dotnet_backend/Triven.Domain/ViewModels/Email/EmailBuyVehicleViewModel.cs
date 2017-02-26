namespace Triven.Domain.ViewModels.Email
{
    public class EmailBuyVehicleViewModel : EmailBaseViewModel
    {
        public string FullName { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }
        public string Comment { get; set; }

        public string VehiclePk { get; set; }

        public override string GetSubject() => "Interest in buying the vehicle";
        public override string GetSender() => Email;
        public override string GetContent() => "Client is interested in buying a vehicle. " +
                                      "\nName: " + FullName +
                                      "\nEmail: " + Email +
                                      "\nPhone: " + Phone +
                                      "\nVehicle he/she is interested in: http://triven.eu/details/" + VehiclePk;
    }
}