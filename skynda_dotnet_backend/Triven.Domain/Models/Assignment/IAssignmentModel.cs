using System;
using Triven.Domain.Constants;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Assignment
{

    /// <summary>
    /// Assignment
    /// </summary>
    public interface IAssignmentModel : IAuditableBaseModel
    {
        /// <summary>
        /// Earliest pickup date
        /// </summary>
        DateTime EarliestPickupDate { get; set; }

        /// <summary>
        /// Latest pickup date
        /// </summary>
        DateTime? LatestPickupDate { get; set; }

        /// <summary>
        /// Earliest deliery date
        /// </summary>
        DateTime? EarliestDeliveryDate { get; set; }

        /// <summary>
        /// Latest delivery date
        /// </summary>
        DateTime? LatestDeliveryDate { get; set; }

        /// <summary>
        /// Pickup started time
        /// </summary>
        DateTime? PickupStartedAt { get; set; }

        /// <summary>
        /// Pickup compleated time
        /// </summary>
        DateTime? PickupCompleatedAt { get; set; }

        /// <summary>
        /// Delivery started time
        /// </summary>
        DateTime? DeliveryStartedAt { get; set; }

        /// <summary>
        /// Delivery compleated time
        /// </summary>
        DateTime? DeliveryCompleatedAt { get; set; }

        /// <summary>
        /// Assignment weight in kg
        /// </summary>
        string WeightInKg { get; set; }

        /// <summary>
        /// Assignment volulme in m3
        /// </summary>
        string VolumeInM3 { get; set; }

        /// <summary>
        /// Load meters
        /// </summary>
        string LoadMeters { get; set; }

        /// <summary>
        /// Assignment price
        /// </summary>
        decimal Price { get; set; }

        /// <summary>
        /// Rank about pickup (e.g. where pick up on time)
        /// </summary>
        int PickupRank { get; set; }

        /// <summary>
        /// Rank about delivery (e.g quality of delivery)
        /// </summary>
        int DeliveryRank { get; set; }

        /// <summary>
        /// Assignment status
        /// </summary>
        Status Status { get; set; }

        /// <summary>
        /// Assignment process
        /// </summary>
        AssignmentProcess AssignmentProcess { get; set; }

        /// <summary>
        /// Assignment addresses
        /// </summary>
        //ICollection<IAssignmentAddressModel> AssignmentAdresses { get; set; }

        /// <summary>
        /// Assignment transport documents
        /// </summary>
        //ICollection<IAssignmentTransportDocumentModel> TransportDocuments { get; set; }

        /// <summary>
        /// Assignment pallets
        /// </summary>
        //ICollection<IAssignmentPalletModel> Pallets { get; set; }

        /// <summary>
        /// Vehicles who have offered the assignment
        /// </summary>
        //ICollection<IAssignmentVehicleModel> Vehicles { get; set; }
    }
}
