using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace X3Project.Domain.Constants
{
    public enum AssignmentVehicleStatus
    {
        NotSelected = 0,
        Requested = 5,
        Rejected = 10,
        Approved = 15
    }

    public enum AssignmentProcess
    {
        NotSelected = 0,
        NotStarted = 5,
        PickupStarted = 10,
        PickupEnded = 15,
        WaitingDelivery = 20,
        DeliveryStarted = 25,
        DeliveryEnded = 30,
        WaitingDocuments = 35,
        InvalidDocuments = 45,
        MissingDriverInfo = 50,
        Success = 70,
    }

    public enum AssignmentAddressType
    {
        NotSelected = 0,
        Pickup = 5,
        Delivery = 10
    }
}
