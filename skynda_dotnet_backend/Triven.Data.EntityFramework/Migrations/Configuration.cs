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
        private static ApplicationUser _admin;
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
            _admin = context.Users.Single(x => x.Email == adminEmail) as ApplicationUser;
            //
            // Seed classifications
            //
            CreateClassificationTypes(context, _admin);

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
            int paymentTypeId = DatabaseConstants.ClassificationTypeId.PaymentTypeId;
            int drivetrainTypeId = DatabaseConstants.ClassificationTypeId.DrivetrainTypeId;
            int transmissionTypeId = DatabaseConstants.ClassificationTypeId.TransmissionTypeId;
            int paymentStatusTypeId = DatabaseConstants.ClassificationTypeId.PaymentStatusTypeId;
            int manufacturerTypeId = DatabaseConstants.ClassificationTypeId.ManufacturerTypeId;
            int fuelTypeId = DatabaseConstants.ClassificationTypeId.FuelTypeId;
            int vehicleBodyTypeId = DatabaseConstants.ClassificationTypeId.VehicleBodyTypeId;

            #region initial classificationType
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
                    Factory.CreateClassification(1, paymentTypeId, "Single payment", "FULL", admin, 1),
                    Factory.CreateClassification(2, paymentTypeId, "Recurring payment", "RECURRING", admin, 2)
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
                    Factory.CreateClassification(3, drivetrainTypeId, "Front-Wheel Drive", "FRONT", admin, 1),
                    Factory.CreateClassification(4, drivetrainTypeId, "Rear-Wheel Drive", "REAR", admin, 2),
                    Factory.CreateClassification(5, drivetrainTypeId, "Four-Wheel Drive", "ALL", admin, 3)
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
                    Factory.CreateClassification(6, transmissionTypeId, "Manual", "MANUAL", admin,1 ),
                    Factory.CreateClassification(7, transmissionTypeId, "Automatic", "AUTOMATIC", admin, 2),
                    Factory.CreateClassification(8, transmissionTypeId, "Semi-Automatic", "SEMIAUTOMATIC", admin,3)
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
                    Factory.CreateClassification(9, paymentStatusTypeId, "Completed", "COMPLETED", admin, 1, "payment has successfully completed"),
                    Factory.CreateClassification(10, paymentStatusTypeId, "Failed", "FAILED", admin, 2, "payment has failed"),
                    Factory.CreateClassification(11, paymentStatusTypeId, "Rejected", "REJECTED", admin, 3, "payment was rejected"),
                    Factory.CreateClassification(12, paymentStatusTypeId, "Pending", "PENDING", admin, 4, "status is being processed")
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
                    Factory.CreateClassification(13, manufacturerTypeId, "Acura", "ACURA".ToUpper(), admin, weight: 10),
                    Factory.CreateClassification(14, manufacturerTypeId, "Alfa Romeo", "ALFA_ROMEO".ToUpper(), admin, weight: 20),
                    Factory.CreateClassification(15, manufacturerTypeId, "Aston Martin", "ASTON_MARTIN".ToUpper(), admin, weight: 30),
                    Factory.CreateClassification(16, manufacturerTypeId, "Audi", "Audi".ToUpper(), admin, weight: 40),
                    Factory.CreateClassification(17, manufacturerTypeId, "Bentley", "BENTLEY".ToUpper(), admin, weight: 50),
                    Factory.CreateClassification(18, manufacturerTypeId, "BMW", "BMW", admin, weight: 60),
                    Factory.CreateClassification(19, manufacturerTypeId, "Bugatti", "BUGATTI".ToUpper(), admin, weight: 70),
                    Factory.CreateClassification(20, manufacturerTypeId, "Buick", "BUICK".ToUpper(), admin, weight: 80),
                    Factory.CreateClassification(21, manufacturerTypeId, "Cadillac", "CADILLAC", admin, weight: 90),
                    Factory.CreateClassification(22, manufacturerTypeId, "Chevrolet", "Chevrolet".ToUpper(), admin, weight: 100),
                    Factory.CreateClassification(23, manufacturerTypeId, "Chrysler", "CHRYSLER", admin, weight: 110),
                    Factory.CreateClassification(24, manufacturerTypeId, "Citroen", "CITROEN", admin, weight: 120),
                    Factory.CreateClassification(25, manufacturerTypeId, "Corvette", "CORVETTE", admin, weight: 130),
                    Factory.CreateClassification(26, manufacturerTypeId, "Dacia", "DACIA", admin, weight: 140),
                    Factory.CreateClassification(27, manufacturerTypeId, "Daewoo", "DAEWOO", admin, weight: 150),
                    Factory.CreateClassification(28, manufacturerTypeId, "Daihatsu", "DAIHATSU", admin, weight: 160),
                    Factory.CreateClassification(29, manufacturerTypeId, "Dodge", "DODGE", admin, weight: 170),
                    Factory.CreateClassification(30, manufacturerTypeId, "Ferrari", "FERRARI", admin, weight: 180),
                    Factory.CreateClassification(31, manufacturerTypeId, "Fiat", "FIAT", admin, weight: 190),
                    Factory.CreateClassification(32, manufacturerTypeId, "Ford", "FORD", admin, weight: 200),
                    Factory.CreateClassification(33, manufacturerTypeId, "Honda", "HONDA", admin, weight: 210),
                    Factory.CreateClassification(34, manufacturerTypeId, "Hummer", "HUMMER", admin, weight: 220),
                    Factory.CreateClassification(35, manufacturerTypeId, "Hyundai", "HYUNDAI", admin, weight: 230),
                    Factory.CreateClassification(36, manufacturerTypeId, "Infiniti", "INFINITI", admin, weight: 240),
                    Factory.CreateClassification(37, manufacturerTypeId, "Isuzu", "ISUZU", admin, weight: 250),
                    Factory.CreateClassification(38, manufacturerTypeId, "Jaguar", "JAGUAR", admin, weight: 260),
                    Factory.CreateClassification(39, manufacturerTypeId, "Jeep", "JEEP", admin, weight: 270),
                    Factory.CreateClassification(40, manufacturerTypeId, "Kia", "KIA", admin, weight: 280),
                    Factory.CreateClassification(41, manufacturerTypeId, "Koenigsegg", "KOENIGSEGG", admin, weight: 290),
                    Factory.CreateClassification(42, manufacturerTypeId, "Lada", "LADA", admin, weight: 300),
                    Factory.CreateClassification(43, manufacturerTypeId, "Lamborghini", "LAMBORGHINI", admin, weight: 310),
                    Factory.CreateClassification(44, manufacturerTypeId, "Land Rover", "LAND_ROVER", admin, weight: 320),
                    Factory.CreateClassification(45, manufacturerTypeId, "Lexus", "LEXUS", admin, weight: 330),
                    Factory.CreateClassification(46, manufacturerTypeId, "Lincoln", "LINCOLN", admin, weight: 340),
                    Factory.CreateClassification(47, manufacturerTypeId, "Lotus", "LOTUS", admin, weight: 350),
                    Factory.CreateClassification(48, manufacturerTypeId, "Maserati", "MASERATI", admin, weight: 360),
                    Factory.CreateClassification(49, manufacturerTypeId, "Mazda", "MAZDA", admin, weight: 370),
                    Factory.CreateClassification(50, manufacturerTypeId, "McLaren", "MCLAREN", admin, weight: 380),
                    Factory.CreateClassification(51, manufacturerTypeId, "Mercedes", "MERCEDES", admin, weight: 390),
                    Factory.CreateClassification(52, manufacturerTypeId, "Mini", "MINI", admin, weight: 400),
                    Factory.CreateClassification(53, manufacturerTypeId, "Mitsubishi", "MITSUBISHI", admin, weight: 410),
                    Factory.CreateClassification(54, manufacturerTypeId, "Nissan", "NISSAN", admin, weight: 420),
                    Factory.CreateClassification(55, manufacturerTypeId, "Opel", "OPEL", admin, weight: 430),
                    Factory.CreateClassification(56, manufacturerTypeId, "Pagani", "PAGANI", admin, weight: 440),
                    Factory.CreateClassification(57, manufacturerTypeId, "Peugeot", "PEUGEOT", admin, weight: 450),
                    Factory.CreateClassification(58, manufacturerTypeId, "Porsche", "PORSCHE", admin, weight: 460),
                    Factory.CreateClassification(59, manufacturerTypeId, "Range Rover", "RANGE ROVER", admin, weight: 470),
                    Factory.CreateClassification(60, manufacturerTypeId, "Ram", "RAM", admin, weight: 480),
                    Factory.CreateClassification(61, manufacturerTypeId, "Renault", "RENAULT", admin, weight: 490),
                    Factory.CreateClassification(62, manufacturerTypeId, "Rolls Royce", "ROLLS_ROYCE", admin, weight: 500),
                    Factory.CreateClassification(63, manufacturerTypeId, "Saab", "SAAB", admin, weight: 510),
                    Factory.CreateClassification(64, manufacturerTypeId, "Scania", "SCANIA", admin, weight: 520),
                    Factory.CreateClassification(65, manufacturerTypeId, "Scion", "SCION", admin, weight: 530),
                    Factory.CreateClassification(66, manufacturerTypeId, "Seat", "SEAT", admin, weight: 540),
                    Factory.CreateClassification(67, manufacturerTypeId, "Shelby", "SHELBY", admin, weight: 550),
                    Factory.CreateClassification(68, manufacturerTypeId, "Skoda", "SKODA", admin, weight: 560),
                    Factory.CreateClassification(69, manufacturerTypeId, "Smart", "SMART", admin, weight: 570),
                    Factory.CreateClassification(70, manufacturerTypeId, "Spyker", "SPYKER", admin, weight: 580),
                    Factory.CreateClassification(71, manufacturerTypeId, "Subaru", "SUBARU", admin, weight: 590),
                    Factory.CreateClassification(72, manufacturerTypeId, "Suzuki", "SUZUKI", admin, weight: 600),
                    Factory.CreateClassification(73, manufacturerTypeId, "Tesla", "TESLA", admin, weight: 610),
                    Factory.CreateClassification(74, manufacturerTypeId, "Toyota", "TOYOTA", admin, weight: 620),
                    Factory.CreateClassification(75, manufacturerTypeId, "TVR", "TVR", admin, weight: 630),
                    Factory.CreateClassification(76, manufacturerTypeId, "Volkswagen", "VOLKSWAGEN", admin, weight: 640),
                    Factory.CreateClassification(77, manufacturerTypeId, "Volvo", "VOLVO", admin, weight: 650)
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
                    Factory.CreateClassification(78, fuelTypeId, "Diesel", "DIESEL", admin, weight: 1),
                    Factory.CreateClassification(79, fuelTypeId, "Petrol", "PETROL", admin, weight: 2),
                    Factory.CreateClassification(80, fuelTypeId, "Electric", "ELECTRIC", admin, weight: 3),
                    Factory.CreateClassification(81, fuelTypeId, "Petrol + gas (LPG)", "PLPG", admin, weight: 4),
                    Factory.CreateClassification(82, fuelTypeId, "Petrol + gas (CNG)", "PCNG", admin, weight: 5),
                    Factory.CreateClassification(83, fuelTypeId, "Gas (LPG)", "LPG", admin, weight: 6),
                    Factory.CreateClassification(84, fuelTypeId, "Gas (CNG)", "CNG", admin, weight: 7),
                    Factory.CreateClassification(85, fuelTypeId, "Hybrid", "HYBRID", admin, weight: 8),
                    Factory.CreateClassification(86, fuelTypeId, "Ethanol", "ETHANOL", admin, weight: 9)
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
                    Factory.CreateClassification(87, vehicleBodyTypeId, "Sedan", "SEDAN", admin,  1, "vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(88, vehicleBodyTypeId, "Hatchback", "HATCHBACK", admin,  2,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(89, vehicleBodyTypeId, "Touring", "TOURING", admin,  3,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(90, vehicleBodyTypeId, "Minivan", "MINIVAN", admin,  4,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(91, vehicleBodyTypeId, "Coupe", "COUPE", admin,  5,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(92, vehicleBodyTypeId, "Cabriolet", "CABRIOLET", admin,  6,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(93, vehicleBodyTypeId, "Limousine", "LIMOUSINE", admin,  7,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification(94, vehicleBodyTypeId, "Limousine", "TOURING", admin,  1,"SUV", "SUV"),
                    Factory.CreateClassification(95, vehicleBodyTypeId, "Pickup", "PICKUP", admin,  2,"SUV", "SUV"),
                    Factory.CreateClassification(96, vehicleBodyTypeId, "Small Commercial", "SMALL_COMMERCIAL_VEHICLE", admin, 1, "commercial vehicle", "COMMERCIAL_VEHICLE" ),
                    Factory.CreateClassification(97, vehicleBodyTypeId, "Commercial Vehicle", "COMMERCIAL_VEHICLE", admin,  2, "commercial vehicle","COMMERCIAL_VEHICLE"),
                    Factory.CreateClassification(98, vehicleBodyTypeId, "Rigid", "RIGID", admin,3, "commercial vehicle",  "COMMERCIAL_VEHICLE"),
                    Factory.CreateClassification(99, vehicleBodyTypeId, "Saddle", "SADDLE", admin,  1,"truck", "TRUCK"),
                    Factory.CreateClassification(100, vehicleBodyTypeId, "Rigid", "RIGID", admin,  2, "truck","TRUCK"),
                    Factory.CreateClassification(101, vehicleBodyTypeId, "Chassis", "CHASSIS", admin, 3,"truck",  "TRUCK"),
                    Factory.CreateClassification(102, vehicleBodyTypeId, "Classical motorcycle", "CLASSICAL", admin, 1,"motorcycle",  "MOTO"),
                    Factory.CreateClassification(103, vehicleBodyTypeId, "Scooter", "SCOOTER", admin,  2, "motorcycle","MOTO"),
                    Factory.CreateClassification(104, vehicleBodyTypeId, "Moped", "MOPED", admin,  3, "motorcycle","MOTO"),
                    Factory.CreateClassification(105, vehicleBodyTypeId, "Bike", "BIKE", admin,  4,"motorcycle", "MOTO"),
                    Factory.CreateClassification(106, vehicleBodyTypeId, "Cruiser/Chopper", "CRUISERCHOPPER", admin,  5, "motorcycle","MOTO"),
                    Factory.CreateClassification(107, vehicleBodyTypeId, "Touring", "TOURING", admin,  6, "motorcycle","MOTO"),
                    Factory.CreateClassification(108, vehicleBodyTypeId, "Motocross Bike", "MOTOCROSS", admin,  7,"motorcycle", "MOTO"),
                    Factory.CreateClassification(109, vehicleBodyTypeId, "Enduro/Supermoto", "ENDURO", admin,  8,"motorcycle", "MOTO"),
                    Factory.CreateClassification(110, vehicleBodyTypeId, "Trial", "TRIAL", admin, 9, "motorcycle", "MOTO"),
                    Factory.CreateClassification(111, vehicleBodyTypeId, "ATV", "ATV", admin,  10, "motorcycle","MOTO"),
                    Factory.CreateClassification(112, vehicleBodyTypeId, "Buggy", "BUGGY", admin,  11,"motorcycle", "MOTO"),
                    Factory.CreateClassification(113, vehicleBodyTypeId, "Moped Car", "MOPEDCAR", admin,  12,"motorcycle", "MOTO"),
                    Factory.CreateClassification(114, vehicleBodyTypeId, "Other", "OTHER", admin,  13, "motorcycle","MOTO"),
                    Factory.CreateClassification(115, vehicleBodyTypeId, "Launch/Motorboat", "MOTORBOAT", admin,  1,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification(116, vehicleBodyTypeId, "Yacht", "YACHT", admin,  2,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification(117, vehicleBodyTypeId, "Waterscooter", "WATERSCOOTER", admin,  3,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification(118, vehicleBodyTypeId, "Other", "OTHER", admin,  4,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification(119, vehicleBodyTypeId, "Light Trailer", "LIGHT", admin,  1, "trailer type","TRAILER"),
                    Factory.CreateClassification(120, vehicleBodyTypeId, "Semi-Trailer", "SEMI", admin,  2,"trailer type", "TRAILER"),
                    Factory.CreateClassification(121, vehicleBodyTypeId, "Trailer", "TRAILER", admin,  3,"trailer type", "TRAILER"),
                    Factory.CreateClassification(122, vehicleBodyTypeId, "Caravan", "CARAVAN", admin,  1,"caravan type", "TRAILER"),
                    Factory.CreateClassification(123, vehicleBodyTypeId, "Trailer Tent", "TRAILERTENT", admin,  2, "caravan type","TRAILER")
                }
            };
            #endregion

            context.ClassificationTypes.AddOrUpdate(x => x.Id,
                classificationTypePaymentType,
                classificationTypeDrivetrain,
                classificationTypeTransmission,
                classificationTypePaymentStatus,
                classificationTypeManufacturer,
                classificationTypeFuel,
                classificationTypeBody
                );
            
            // ADD ALL NEW CLASSIFICATIONS HERE
            // --------------------------------

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
                    CreatorId = user.Id,
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
                    CreatorId = _admin.Id,
                    IsActive = isActive,
                    Weight = weight,
                    ModifierUserIp = ModifierUserIp
                };
            }
        }
    }
}
