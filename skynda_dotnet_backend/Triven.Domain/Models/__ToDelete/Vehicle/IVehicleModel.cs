using Triven.Domain.Constants;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Vehicle
{
    public interface IVehicleModel : IAuditableBaseModel
    {
        /// <summary>
        /// Partner ID who the vehicle belongs to
        /// </summary>
        int PartnerId_FK { get; set; }

        /// <summary>
        /// Partner account info
        /// </summary>
        //IPartnerModel Partner { get; set; }
        
        /// <summary>
        /// Vehicle registration number (required)
        /// </summary>
        string RegNumber { get; set; }

        /// <summary>
        /// Phone number used for vehicle (required)
        /// </summary>
        string PhoneNumber { get; set; }

        /// <summary>
        /// Vehice type
        /// </summary>
        VehiceType Type { get; set; }

        /// <summary>
        /// ”Eur class” is theengine European emission class defined by a number between 3-6. Standard for all vehicles.
        /// </summary>
        int EurClass { get; set; }

        /// <summary>
        /// In which country vehicle is regstrated
        /// </summary>
        string RegistrationCountry { get; set; }

        /// <summary>
        /// Passenger capacity(seats)
        /// </summary>
        int PassengerCapacity { get; set; }
        /// <summary>
        ///  (kg)
        /// </summary>
        string LoadCapacity { get; set; }

        /// <summary>
        /// Cargo space measures (meters)
        /// </summary>
        decimal CargoLength { get; set; }

        /// <summary>
        /// Cargo space measures (meters)
        /// </summary>
        decimal CargoWidth { get; set; }

        /// <summary>
        /// Cargo space measures (meters)
        /// </summary>
        decimal CargoHeight { get; set; }

        /// <summary>
        /// 
        /// </summary>
        string BoxOrCurtain { get; set; }

        /// <summary>
        /// 
        /// </summary>
        bool SideOpen { get; set; }

        /// <summary>
        /// 
        /// </summary>
        bool RoofOpen { get; set; }
        /// <summary>
        /// 
        /// </summary>
        bool CoolType { get; set; }

        /// <summary>
        /// Tail Lifter
        /// </summary>
        bool TailLifter { get; set; }

        Status Status { get; set; }

    }
}
