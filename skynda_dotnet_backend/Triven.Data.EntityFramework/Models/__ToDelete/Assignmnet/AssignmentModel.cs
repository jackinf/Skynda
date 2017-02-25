using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Constants;
using Triven.Domain.Extensions;
using Triven.Domain.Models.Assignment;

namespace Triven.Data.EntityFramework.Models.Assignmnet
{
    [Table("Assignment")]
    public class AssignmentModel : AuditableModel, IAssignmentModel
    {
        public DateTime EarliestPickupDate { get; set; }
        public DateTime? LatestPickupDate { get; set; }
        public DateTime? EarliestDeliveryDate { get; set; }
        public DateTime? LatestDeliveryDate { get; set; }
        public DateTime? PickupStartedAt { get; set; }
        public DateTime? PickupCompleatedAt { get; set; }
        public DateTime? DeliveryStartedAt { get; set; }
        public DateTime? DeliveryCompleatedAt { get; set; }
        public string WeightInKg { get; set; }
        public string VolumeInM3 { get; set; }
        public string LoadMeters { get; set; }
        public decimal Price { get; set; }
        public int PickupRank { get; set; }
        public int DeliveryRank { get; set; }
        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Status")]
        public string StatusString
        {
            get { return Status.ToString(); }
            private set { Status = value.ParseEnum<Status>(); }
        }

        [NotMapped]
        public Status Status { get; set; }

        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("AssignmentProcess")]
        public string AssignmentProcessString
        {
            get { return AssignmentProcess.ToString(); }
            private set { AssignmentProcess = value.ParseEnum<AssignmentProcess>(); }
        }

        [NotMapped]
        public AssignmentProcess AssignmentProcess { get; set; }

        [InverseProperty("Assignment")]
        List<AssignmentVehicleModel> Vehicles { get; set; }

        [InverseProperty("Assignment")]
        List<AssignmentAddressModel> AssignmentAdresses { get; set; }

        [InverseProperty("Assignment")]
        List<AssignmentPalletModel> Pallets { get; set; }
    }
}
