using System;
using System.Collections.Generic;
using Triven.Domain.Enums;
using Triven.Domain.ViewModels.Classification;
using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleDetailedViewModel : BaseViewModel //, ImageStorable<ImageViewModel>
    {
        public string VinCode { get; set; }
        public decimal Price { get; set; }
        public string RegistrationNumber { get; set; }
        public decimal Mileage { get; set; }
        public string ColorOutsideHex { get; set; }
        public string ColorInsideHex { get; set; }
        public decimal FuelCity { get; set; }
        public decimal FuelHighway { get; set; }
        public double FuelAverage { get; set; }
        public string Problems { get; set; }      
        public string Additional { get; set; }
        public string MainImageUrl { get; set; }       
        public int SafetyStars { get; set; }
        public string SafetyUrl { get; set; }
        public string Engine { get; set; }
        public int Year { get; set; }
        public int HorsePower { get; set; }
        
        /// <summary>
        /// Vehicle features
        /// </summary>
        public List<VehicleFeatureViewModel> Features { get; set; }

        /// <summary>
        /// Vehicle reports
        /// </summary>
        public List<VehicleReportViewModel> Reports { get; set; }

        /// <summary>
        /// Vehicle reviews
        /// </summary>
        public List<VehicleReviewViewModel> Reviews { get; set; }

        /// <summary>
        /// Vehicle images
        /// </summary>
        public List<VehicleImageViewModel> Images { get; set; }

        /// <summary>
        /// Vehicle descriptions
        /// </summary>
        public List<VehicleDescriptionViewModel> Descriptions { get; set; }

        public VehicleStatus VehicleStatus { get; set; }
        public string VehicleStatusString => VehicleStatus.ToString();

        public string VehicleManufacturerName { get; set; }
        public string VehicleDrivetrain { get; set; }
        public string TransmissionName { get; set; }
        public string ModelCode { get; set; }
        public int Doors { get; set; }
        public int Seats { get; set; }
        public string FuelName { get; set; }


        public void CalculateFuelAverage()
        {
            try
            {
                double result = (double)FuelCity + (double)FuelHighway / 2;
                FuelAverage = result;
            }
            catch (Exception e)
            {
                FuelAverage = 0;
            }

        }

        //public ImageViewModel GetImage { get; set; }
    }
}