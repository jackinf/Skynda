﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using Triven.Data.EntityFramework.Entities;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Enums;
using Triven.Domain.Helpers;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleRepository : BaseCrudRepository<Vehicle>, IVehicleRepository<Vehicle>
    {
        private readonly Expression<Func<Vehicle, bool>> _isPublishedExpression = x => x.VehicleStatusString == VehicleStatus.Published.ToString();

        public virtual IEnumerable<Vehicle> GetAllWithModels() => HandleWithContext(dbContext =>
            {
                return BaseQuery(dbContext)
                    .Include(x => x.VehicleModel)
                    .Include(x => x.VehicleModel.VehicleManufacturer)
                    .Include(x => x.MainImage)
                    .Include(x => x.FuelType)
                    .Include(x => x.Transmission)
                    .OrderBy(x => x.Id)
                    .ToList();
            });

        public Vehicle GetIncluding(int id, bool descriptions = false, bool images = false)
        {
            return HandleWithContext(dbContext => BaseQuery(dbContext)
                .Include(x => x.Images)
                .Include(x => x.Descriptions)
                .FirstOrDefault());
        }

        public virtual IEnumerable<Vehicle> GetAllPublished() => HandleWithContext(dbContext =>
            {
                return BaseQuery(dbContext)
                    .Where(_isPublishedExpression)
                    .OrderBy(x => x.Id)
                    .ToList();
            });

        public IList<Vehicle> Search(SearchRequestViewModel dto)
        {
            using (var context = new ApplicationDbContext())
            {
                var query = BaseQuery(context)
                    .Include(x => x.VehicleModel)
                    .Include(x => x.VehicleModel.VehicleManufacturer)
                    .Include(x => x.MainImage);

                query = query.Where(_isPublishedExpression);

                if (dto.Models?.Any() ?? false)
                    query = query.Where(ExpressionHelpers.BuildContainsExpression<Vehicle, int>(
                        vehicle => vehicle.VehicleModel.Id, dto.Models.Select(t => t.Value)));

                if (dto.Brands?.Any() ?? false)
                    query = query.Where(ExpressionHelpers.BuildContainsExpression<Vehicle, int>(
                        vehicle => vehicle.VehicleModel.VehicleManufacturer.Id, dto.Brands.Select(t => t.Value)));

                // TODO: color the world
                //if (dto.Colors?.Any() ?? false)
                //    query = query.Where(x => dto.Colors.Any(model => model.Value == x.Color));
                
                // TODO: search by features
                //if (dto.Features?.Any() ?? false)
                //    query = query.Where(x => dto.Features.Any(model => x.Features.Any(tt => tt.Id == model.Value)));

                if (dto.Doors?.Any() ?? false)
                    query = query.Where(ExpressionHelpers.BuildContainsExpression<Vehicle, int>(
                        vehicle => vehicle.VehicleModel.Doors, dto.Doors.Select(t => t.Value)));

                if (dto.Seats?.Any() ?? false)
                    query = query.Where(ExpressionHelpers.BuildContainsExpression<Vehicle, int>(
                        vehicle => vehicle.VehicleModel.Seats, dto.Seats.Select(t => t.Value)));

                if (dto.Transmission?.Any() ?? false)
                    query = query.Where(ExpressionHelpers.BuildContainsExpression<Vehicle, int>(
                        vehicle => vehicle.Transmission.Id, dto.Transmission.Select(t => t.Value)));

                if (dto.FuelType?.Any() ?? false)
                    query = query.Where(ExpressionHelpers.BuildContainsExpression<Vehicle, int>(
                        vehicle => vehicle.FuelType.Id, dto.FuelType.Select(t => t.Value)));

                if (dto.Mileage != null)
                    query = query.Where(x => x.Mileage >= dto.Mileage.Min && x.Mileage <= dto.Mileage.Max);

                if (dto.Price != null)
                    query = query.Where(x => x.Price >= dto.Price.Min && x.Price <= dto.Price.Max);

                if (dto.Year != null)
                    query = query.Where(x => x.Year >= dto.Year.Min && x.Year <= dto.Year.Max);

                if (dto.Power != null)
                    query = query.Where(x => x.HorsePower >= dto.Power.Min && x.HorsePower <= dto.Power.Max);

                if (dto.PetrolConsumption != null)
                    query = query.Where(x =>
                        x.FuelCity >= dto.PetrolConsumption.Min && x.FuelHighway >= dto.PetrolConsumption.Min ||
                        x.FuelCity <= dto.PetrolConsumption.Max && x.FuelHighway <= dto.PetrolConsumption.Max);

                return query.ToList();
            }
        }

        public Vehicle GetDetailed(int id)
        {
            using (var context = new ApplicationDbContext())
            {
                context.Features.Include(c => c.Id);

                var result = BaseQuery(context)
                    .Include(x => x.VehicleModel)
                    .Include(x => x.VehicleModel.VehicleManufacturer)
                    .Include(x => x.VehicleModel.Drivetrain)
                    .Include(x => x.MainImage)
                    .Include(x => x.Features.Select(vehicleFeature => vehicleFeature.Feature))
                    .Include(x => x.Descriptions)
                    .Include(x => x.Reviews)
                    .Include(x => x.Reports.Select(report => report.Faults.Select(fault => fault.Image)))
                    .Include(x => x.Reports.Select(report => report.Items))
                    .Include(x => x.FuelType)
                    .Include(x => x.Transmission)
                    .Include(x => x.Images.Select(vehicleImage => vehicleImage.Image))
                    .FirstOrDefault(x => x.Id == id);

                //TODO fix this loading fault hack... do not load deletedOn items
                if (result != null && result.Features.Any())
                    result.Features = result.Features.Where(x => x.DeletedOn == null).ToList();

                if (result != null && result.Images.Any())
                    result.Images = result.Images.Where(x => x.DeletedOn == null).ToList();

                if (result != null && result.Reviews.Any())
                    result.Reviews = result.Reviews.Where(x => x.DeletedOn == null).ToList();

                if (result != null && result.Descriptions.Any())
                    result.Descriptions = result.Descriptions.Where(x => x.DeletedOn == null).ToList();

                if (result != null && result.Reports.Any())
                {
                    result.Reports = result.Reports.Where(x => x.DeletedOn == null).ToList();

                    if (result.Reports.Any())
                    {
                        foreach (var vehicleReport in result.Reports)
                        {
                            if (vehicleReport.Items.Any())
                            {
                                vehicleReport.Items = vehicleReport.Items.Where(x => x.DeletedOn == null).ToList();
                            }
                            if (vehicleReport.Faults.Any())
                            {
                                vehicleReport.Faults = vehicleReport.Faults.Where(x => x.DeletedOn == null).ToList();
                            }
                        }
                    }
                }

                return result;
            }

        }

    }

}