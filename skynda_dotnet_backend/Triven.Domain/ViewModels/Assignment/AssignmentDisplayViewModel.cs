using System;
using Triven.Domain.Constants;
using Triven.Domain.ViewModelInterfaces;

namespace Triven.Domain.ViewModels.Assignment
{
    public class AssignmentDisplayViewModel : IAssignmentViewModel
    {
        public int Id { get; set; }
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
        public AssignmentProcess AssignmentProcess { get; set; }
    }
}
