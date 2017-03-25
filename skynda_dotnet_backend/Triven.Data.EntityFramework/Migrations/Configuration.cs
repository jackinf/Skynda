using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Constants;

namespace Triven.Data.EntityFramework.Migrations
{
    public class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        private const string ModifierUserIp = "127.0.0.1";

        public Configuration()
        {
            AutomaticMigrationsEnabled = false; // NB! Never ever let you go!! >:D ALWAYS STAYS ON FALSE OR I'LL ASSASSINATE YOUR ASS!
        }

        protected override void Seed(ApplicationDbContext context)
        {
            //SEED DATABASE

            //
            //  Seed application roles
            //
            CreateNewRoles(context);

            //
            //  Seed application users
            //
            var adminEmail = CreateAdmin(context);
            CreateVehicleManager(context);
            var admin = context.Users.Single(x => x.Email == adminEmail) as ApplicationUser;
            //
            // Seed classifications
            //
            CreateClassificationTypes(context, admin);

            // Seed initial features
            CreateInitialFeatures(context);

            //var manager = new AppUserManager(new AppUserStore());
            //var admin = manager.FindByEmail(adminEmail) as ApplicationUser;

            context.SaveChanges();
        }

        private static void CreateInitialFeatures(ApplicationDbContext context)
        {
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(1, "Parking Sensors", "feature", "PARKING_SENSORS", true, 1));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(2, "Bluetooth", "feature", "BLUETOOTH", true, 2));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(3,"Sunroof", "feature", "SUNROOF", true, 3));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(4,"Navigation", "feature", "NAVIGATION", true, 4));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(5,"Keyless-Go", "feature", "KEYLESS_GO", true, 5));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(6,"Immobilizer", "feature", "IMMOBILIZER", true, 6));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(7,"Xenon Lights", "feature", "XENON_LIGHTS", true, 7));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(8,"Alloy Wheels", "feature", "ALLOY_WHEELS", true, 8));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(9,"Leather Upholstery", "feature", "Leather_Upholstery".ToUpper(), true, 9));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(10,"Racing Seats", "feature", "Racing_Seats".ToUpper(), true, 10));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(11,"Ventilated Seats", "feature", "Ventilated_Seats".ToUpper(), true, 11));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(12,"Seat_Heating", "feature", "Seat_Heating".ToUpper(), true, 12));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(13,"Mirror Heating", "feature", "Mirror_Heating".ToUpper(), true, 13));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(14,"Rain Sensors", "feature", "Rain_Sensors".ToUpper(), true, 14));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(15,"Power Steering", "feature", "Power_Steering".ToUpper(), true, 15));
            context.Features.AddOrUpdate(x => x.Value, Factory.CreateFeature(16, "Cruise Control", "feature", "Cruise_Control".ToUpper(), true, 16));
        }

        private static void CreateClassificationTypes(ApplicationDbContext context, ApplicationUser admin)
        {
            int classificationId = 1;
            

            int paymentTypeId = DatabaseConstants.ClassificationTypeId.PaymentTypeId;
            int drivetrainTypeId = DatabaseConstants.ClassificationTypeId.DrivetrainTypeId;
            int transmissionTypeId = DatabaseConstants.ClassificationTypeId.TransmissionTypeId;
            int paymentStatusTypeId = DatabaseConstants.ClassificationTypeId.PaymentStatusTypeId;
            int manufacturerTypeId = DatabaseConstants.ClassificationTypeId.ManufacturerTypeId;
            int fuelTypeId = DatabaseConstants.ClassificationTypeId.FuelTypeId;
            int vehicleBodyTypeId = DatabaseConstants.ClassificationTypeId.VehicleBodyTypeId;


            var classificationTypePaymentType = new ClassificationType
            {
                Id = paymentTypeId,
                Name = DatabaseConstants.ClassificationTypeName.PaymentType,
                Description = "single or recurring payment",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    Factory.CreateClassification(classificationId++,paymentTypeId, "Single payment", "FULL", admin, 1),
                    Factory.CreateClassification(classificationId++,paymentTypeId, "Recurring payment", "RECURRING", admin, 2)
                }
            };
            var classificationTypeDrivetrain = new ClassificationType
            {
                Id = drivetrainTypeId,
                Name = DatabaseConstants.ClassificationTypeName.Drivetrain,
                Description = "vehicle drivetrain",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    Factory.CreateClassification(classificationId++, drivetrainTypeId, "Front-Wheel Drive", "FRONT", admin, 1),
                    Factory.CreateClassification(classificationId++, drivetrainTypeId, "Rear-Wheel Drive", "REAR", admin, 2),
                    Factory.CreateClassification(classificationId++, drivetrainTypeId, "Four-Wheel Drive", "ALL", admin, 3)
                }
            };
            var classificationTypeTransmission = new ClassificationType
            {
                Id = transmissionTypeId,
                Name = DatabaseConstants.ClassificationTypeName.Transmission,
                Description = "transmission type",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    Factory.CreateClassification(classificationId++, transmissionTypeId, "Manual", "MANUAL", admin,1 ),
                    Factory.CreateClassification(classificationId++, transmissionTypeId, "Automatic", "AUTOMATIC", admin, 2),
                    Factory.CreateClassification(classificationId++, transmissionTypeId, "Semi-Automatic", "SEMIAUTOMATIC", admin,3)
                }
            };

            var classificationTypePaymentStatus = new ClassificationType
            {
                Id = paymentStatusTypeId,
                Name = DatabaseConstants.ClassificationTypeName.PaymentStatus,
                Description = "payment status",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    Factory.CreateClassification(classificationId++, paymentStatusTypeId, "Completed", "COMPLETED", admin, 1, "payment has successfully completed"),
                    Factory.CreateClassification(classificationId++, paymentStatusTypeId, "Failed", "FAILED", admin, 2, "payment has failed"),
                    Factory.CreateClassification(classificationId++, paymentStatusTypeId, "Rejected", "REJECTED", admin, 3, "payment was rejected"),
                    Factory.CreateClassification(classificationId++, paymentStatusTypeId, "Pending", "PENDING", admin, 4, "status is being processed")
                }
            };

            var classificationTypeManufacturer = new ClassificationType
            {
                Id = manufacturerTypeId,
                Name = DatabaseConstants.ClassificationTypeName.Manufacturer,
                Description = "vehicles manufacturer",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Acura", "ACURA".ToUpper(), admin, weight: 10),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Alfa Romeo", "ALFA_ROMEO".ToUpper(), admin, weight: 20),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Aston Martin", "ASTON_MARTIN".ToUpper(), admin, weight: 30),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Audi", "Audi".ToUpper(), admin, weight: 40),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Bentley", "BENTLEY".ToUpper(), admin, weight: 50),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "BMW", "BMW", admin, weight: 60),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Bugatti", "BUGATTI".ToUpper(), admin, weight: 70),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Buick", "BUICK".ToUpper(), admin, weight: 80),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Cadillac", "CADILLAC", admin, weight: 90),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Chevrolet", "Chevrolet".ToUpper(), admin, weight: 100),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Chrysler", "CHRYSLER", admin, weight: 110),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Citroen", "CITROEN", admin, weight: 120),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Corvette", "CORVETTE", admin, weight: 130),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Dacia", "DACIA", admin, weight: 140),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Daewoo", "DAEWOO", admin, weight: 150),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Daihatsu", "DAIHATSU", admin, weight: 160),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Dodge", "DODGE", admin, weight: 170),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Ferrari", "FERRARI", admin, weight: 180),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Fiat", "FIAT", admin, weight: 190),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Ford", "FORD", admin, weight: 200),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Honda", "HONDA", admin, weight: 210),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Hummer", "HUMMER", admin, weight: 220),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Hyundai", "HYUNDAI", admin, weight: 230),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Infiniti", "INFINITI", admin, weight: 240),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Isuzu", "ISUZU", admin, weight: 250),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Jaguar", "JAGUAR", admin, weight: 260),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Jeep", "JEEP", admin, weight: 270),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Kia", "KIA", admin, weight: 280),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Koenigsegg", "KOENIGSEGG", admin, weight: 290),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Lada", "LADA", admin, weight: 300),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Lamborghini", "LAMBORGHINI", admin, weight: 310),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Land Rover", "LAND_ROVER", admin, weight: 320),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Lexus", "LEXUS", admin, weight: 330),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Lincoln", "LINCOLN", admin, weight: 340),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Lotus", "LOTUS", admin, weight: 350),                    
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Maserati", "MASERATI", admin, weight: 360),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Mazda", "MAZDA", admin, weight: 370),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "McLaren", "MCLAREN", admin, weight: 380),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Mercedes", "MERCEDES", admin, weight: 390),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Mini", "MINI", admin, weight: 400),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Mitsubishi", "MITSUBISHI", admin, weight: 410),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Nissan", "NISSAN", admin, weight: 420),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Opel", "OPEL", admin, weight: 430),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Pagani", "PAGANI", admin, weight: 440),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Peugeot", "PEUGEOT", admin, weight: 450),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Porsche", "PORSCHE", admin, weight: 460),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Range Rover", "RANGE ROVER", admin, weight: 470),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Ram", "RAM", admin, weight: 480),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Renault", "RENAULT", admin, weight: 490),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Rolls Royce", "ROLLS_ROYCE", admin, weight: 500),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Saab", "SAAB", admin, weight: 510),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Scania", "SCANIA", admin, weight: 520),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Scion", "SCION", admin, weight: 530),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Seat", "SEAT", admin, weight: 540),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Shelby", "SHELBY", admin, weight: 550),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Skoda", "SKODA", admin, weight: 560),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Smart", "SMART", admin, weight: 570),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Spyker", "SPYKER", admin, weight: 580),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Subaru", "SUBARU", admin, weight: 590),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Suzuki", "SUZUKI", admin, weight: 600),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Tesla", "TESLA", admin, weight: 610),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Toyota", "TOYOTA", admin, weight: 620),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "TVR", "TVR", admin, weight: 630),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Volkswagen", "VOLKSWAGEN", admin, weight: 640),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "Volvo", "VOLVO", admin, weight: 650),
                    Factory.CreateClassification(classificationId++, manufacturerTypeId, "ardi", "ardi", admin, weight: 660)
                }
            };
            var classificationTypeFuel = new ClassificationType
            {
                Id = fuelTypeId,
                Name = DatabaseConstants.ClassificationTypeName.Fuel,
                Description = "fuel type",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    Factory.CreateClassification(classificationId++, fuelTypeId, "Diesel", "DIESEL", admin, weight: 1),
                    Factory.CreateClassification(classificationId++, fuelTypeId, "Petrol", "PETROL", admin, weight: 2),
                    Factory.CreateClassification(classificationId++, fuelTypeId, "Electric", "ELECTRIC", admin, weight: 3),
                    Factory.CreateClassification(classificationId++, fuelTypeId, "Petrol + gas (LPG)", "PLPG", admin, weight: 4),
                    Factory.CreateClassification(classificationId++, fuelTypeId, "Petrol + gas (CNG)", "PCNG", admin, weight: 5),
                    Factory.CreateClassification(classificationId++, fuelTypeId, "Gas (LPG)", "LPG", admin, weight: 6),
                    Factory.CreateClassification(classificationId++, fuelTypeId, "Gas (CNG)", "CNG", admin, weight: 7),
                    Factory.CreateClassification(classificationId++, fuelTypeId, "Hybrid", "HYBRID", admin, weight: 8),
                    Factory.CreateClassification(classificationId++, fuelTypeId, "Ethanol", "ETHANOL", admin, weight: 9)
                }
            };
            var classificationTypeBody = new ClassificationType
            {
                Id = vehicleBodyTypeId,
                Name = DatabaseConstants.ClassificationTypeName.VehicleBody,
                Description = "vehicle body",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    // TODO: I forgot value2 :/ no need for it ATM
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Sedan", "SEDAN", admin,  1, "vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Hatchback", "HATCHBACK", admin,  2,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Touring", "TOURING", admin,  3,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Minivan", "MINIVAN", admin,  4,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Coupe", "COUPE", admin,  5,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Cabriolet", "CABRIOLET", admin,  6,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Limousine", "LIMOUSINE", admin,  7,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Limousine", "TOURING", admin,  1,"SUV", "SUV"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Pickup", "PICKUP", admin,  2,"SUV", "SUV"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Small Commercial", "SMALL_COMMERCIAL_VEHICLE", admin, 1, "commercial vehicle", "COMMERCIAL_VEHICLE" ),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Commercial Vehicle", "COMMERCIAL_VEHICLE", admin,  2, "commercial vehicle","COMMERCIAL_VEHICLE"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Rigid", "RIGID", admin,3, "commercial vehicle",  "COMMERCIAL_VEHICLE"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Saddle", "SADDLE", admin,  1,"truck", "TRUCK"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Rigid", "RIGID", admin,  2, "truck","TRUCK"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Chassis", "CHASSIS", admin, 3,"truck",  "TRUCK"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Classical motorcycle", "CLASSICAL", admin, 1,"motorcycle",  "MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Scooter", "SCOOTER", admin,  2, "motorcycle","MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Moped", "MOPED", admin,  3, "motorcycle","MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Bike", "BIKE", admin,  4,"motorcycle", "MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Cruiser/Chopper", "CRUISERCHOPPER", admin,  5, "motorcycle","MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Touring", "TOURING", admin,  6, "motorcycle","MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Motocross Bike", "MOTOCROSS", admin,  7,"motorcycle", "MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Enduro/Supermoto", "ENDURO", admin,  8,"motorcycle", "MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Trial", "TRIAL", admin, 9, "motorcycle", "MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "ATV", "ATV", admin,  10, "motorcycle","MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Buggy", "BUGGY", admin,  11,"motorcycle", "MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Moped Car", "MOPEDCAR", admin,  12,"motorcycle", "MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Other", "OTHER", admin,  13, "motorcycle","MOTO"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Launch/Motorboat", "MOTORBOAT", admin,  1,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Yacht", "YACHT", admin,  2,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Waterscooter", "WATERSCOOTER", admin,  3,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Other", "OTHER", admin,  4,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Light Trailer", "LIGHT", admin,  1, "trailer type","TRAILER"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Semi-Trailer", "SEMI", admin,  2,"trailer type", "TRAILER"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Trailer", "TRAILER", admin,  3,"trailer type", "TRAILER"),
                    Factory.CreateClassification(classificationId++, vehicleBodyTypeId, "Caravan", "CARAVAN", admin,  1,"caravan type", "TRAILER"),
                    Factory.CreateClassification(classificationId, vehicleBodyTypeId, "Trailer Tent", "TRAILERTENT", admin,  2, "caravan type","TRAILER")
                }
            };
            context.ClassificationTypes.AddOrUpdate(x => x.Id,
                classificationTypePaymentType,
                classificationTypeDrivetrain,
                classificationTypeTransmission,
                classificationTypePaymentStatus,
                classificationTypeManufacturer,
                classificationTypeFuel,
                classificationTypeBody
                );

            foreach (var classification in classificationTypePaymentType.Classifications)
            {
                context.Classifications.AddOrUpdate(x => x.Id, classification);
            }

            foreach (var classification in classificationTypeDrivetrain.Classifications)
            {
                context.Classifications.AddOrUpdate(x => x.Id, classification);
            }

            foreach (var classification in classificationTypeTransmission.Classifications)
            {
                context.Classifications.AddOrUpdate(x => x.Id, classification);
            }

            foreach (var classification in classificationTypePaymentStatus.Classifications)
            {
                context.Classifications.AddOrUpdate(x => x.Id, classification);
            }

            foreach (var classification in classificationTypeManufacturer.Classifications)
            {
                context.Classifications.AddOrUpdate(x => x.Id, classification);
            }

            foreach (var classification in classificationTypeFuel.Classifications)
            {
                context.Classifications.AddOrUpdate(x => x.Id, classification);
            }

            foreach (var classification in classificationTypeBody.Classifications)
            {
                context.Classifications.AddOrUpdate(x => x.Id, classification);
            }
        }

        private static void CreateNewRoles(ApplicationDbContext context)
        {
            var roleStore = new RoleStore<AppRole, int, AppUserRole>(context);
            var roleManager = new ApplicationRoleManager(roleStore);

            string[] roles = Enum.GetNames(typeof(Auth.Roles));
            foreach (string role in roles)
            {
                if (!roleManager.RoleExists(role))
                {
                    var newRole = new AppRole { Name = role };
                    roleManager.Create(newRole);
                }
            }
        }

        private static string CreateAdmin(ApplicationDbContext context)
        {
            const string emailSteve = "steve@steve.com";
            if (context.Users.Count(x => x.Email == emailSteve) == 0)
            {
                string password = "123456aA!";
                var manager = new AppUserManager(new AppUserStore());

                var newUser = new ApplicationUser
                {
                    Email = emailSteve,
                    UserName = "steve",
                    FirstName = "Triven",
                    LastName = "Administrator",
                    Password = password,
                    PasswordConfirm = password,
                    CreatedOn = DateTime.Now,
                    IsActive = true,
                    IsAdmin = true,
                    EmailConfirmed = true,
                    Status = Status.Active
                };
                // this assignment is obsolete i think
                // this assignment is obsolete i think
                newUser.CreatedOn = DateTime.Now;
                newUser.UpdatedOn = DateTime.Now;
                var result = manager.CreateAsync(newUser, password);
                if (result.Result.Succeeded)
                {
                    if (!manager.IsInRole(newUser.Id, Auth.Roles.Admin.ToString()))
                        manager.AddToRole(newUser.Id, Auth.Roles.Admin.ToString());
                }

                context.SaveChanges();
            }
            return emailSteve;
        }

        private static void CreateVehicleManager(ApplicationDbContext context)
        {
            string emailBill = "bill@bill.com";
            if (context.Users.Count(x => x.Email == emailBill) == 0)
            {
                string password = "123456aA!";
                var manager = new AppUserManager(new AppUserStore());

                var newUser = new ApplicationUser
                {
                    Email = emailBill,
                    UserName = "bill",
                    FirstName = "Triven",
                    LastName = "Vehicle Manager",
                    Password = password,
                    PasswordConfirm = password,
                    CreatedOn = DateTime.Now,
                    IsActive = true,
                    IsAdmin = true,
                    EmailConfirmed = true,
                    Status = Status.Active
                };
                // this assignment is obsolete i think
                // this assignment is obsolete i think
                newUser.CreatedOn = DateTime.Now;
                newUser.UpdatedOn = DateTime.Now;
                var result = manager.CreateAsync(newUser, password);
                if (result.Result.Succeeded)
                {
                    if (!manager.IsInRole(newUser.Id, Auth.Roles.VehicleManager.ToString()))
                        manager.AddToRole(newUser.Id, Auth.Roles.VehicleManager.ToString());
                }

                context.SaveChanges();
            }
        }

        static class Factory
        {
            public static Classification CreateClassification(
                int id,
                int typeId,
                string name,
                string value,
                ApplicationUser user,
                int weight,
                string description = null,
                string value2 = null)
            {
                return new Classification
                {
                    Id = id,
                    ClassificationTypeId = typeId,
                    Name = name,
                    Description = description,
                    IsImported = true,
                    Weight = weight,
                    Value = value,
                    Creator = user,
                    CreatedOn = DateTime.Now,
                    ModifierUserIp = ModifierUserIp,
                    Value2 = value2
                };
            }

            public static Feature CreateFeature(
                int id,
                string name,
                string description,
                string value,
                bool isActive,
                int weight)
            {
                return new Feature
                {
                    Id = id,
                    Name = name,
                    Description = description,
                    IsImported = true,
                    Value = value,
                    IsActive = isActive,
                    Weight = weight,
                    ModifierUserIp = ModifierUserIp
                };
            }
        }
    }
}
