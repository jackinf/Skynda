using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Constants;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Migrations
{
    public class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        private const string ModifierUserIp = "127.0.0.1";

        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
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
            context.Features.AddOrUpdate(Factory.CreateFeature("Parking Sensors", "feature", "PARKING_SENSORS", true, 1));
            context.Features.AddOrUpdate(Factory.CreateFeature("Bluetooth", "feature", "BLUETOOTH", true, 2));
            context.Features.AddOrUpdate(Factory.CreateFeature("Sunroof", "feature", "SUNROOF", true, 3));
            context.Features.AddOrUpdate(Factory.CreateFeature("Navigation", "feature", "NAVIGATION", true, 4));
            context.Features.AddOrUpdate(Factory.CreateFeature("Keyless-Go", "feature", "KEYLESS_GO", true, 5));
            context.Features.AddOrUpdate(Factory.CreateFeature("Immobilizer", "feature", "IMMOBILIZER", true, 6));
            context.Features.AddOrUpdate(Factory.CreateFeature("Xenon Lights", "feature", "XENON_LIGHTS", true, 7));
            context.Features.AddOrUpdate(Factory.CreateFeature("Alloy Wheels", "feature", "ALLOY_WHEELS", true, 8));
            context.Features.AddOrUpdate(Factory.CreateFeature("Leather Upholstery", "feature", "Leather_Upholstery".ToUpper(), true, 9));
            context.Features.AddOrUpdate(Factory.CreateFeature("Racing Seats", "feature", "Racing_Seats".ToUpper(), true, 10));
            context.Features.AddOrUpdate(Factory.CreateFeature("Ventilated Seats", "feature", "Ventilated_Seats".ToUpper(), true, 11));
            context.Features.AddOrUpdate(Factory.CreateFeature("Seat_Heating", "feature", "Seat_Heating".ToUpper(), true, 12));
            context.Features.AddOrUpdate(Factory.CreateFeature("Mirror Heating", "feature", "Mirror_Heating".ToUpper(), true, 13));
            context.Features.AddOrUpdate(Factory.CreateFeature("Rain Sensors", "feature", "Rain_Sensors".ToUpper(), true, 14));
            context.Features.AddOrUpdate(Factory.CreateFeature("Power Steering", "feature", "Power_Steering".ToUpper(), true, 15));
            context.Features.AddOrUpdate(Factory.CreateFeature("Cruise Control", "feature", "Cruise_Control".ToUpper(), true, 16));
        }

        private static void CreateClassificationTypes(ApplicationDbContext context, ApplicationUser admin)
        {
            var classificationTypePaymentType = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.PaymentType,
                Description = "single or recurring payment",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<IClassification>
                {
                    Factory.CreateClassification("Single payment", "FULL", admin, 1),
                    Factory.CreateClassification("Recurring payment", "RECURRING", admin, 2)
                }
            };
            var classificationTypeDrivetrain = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.Drivetrain,
                Description = "vehicle drivetrain",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<IClassification>
                {
                    Factory.CreateClassification("Front-Wheel Drive", "FRONT", admin, 1),
                    Factory.CreateClassification("Rear-Wheel Drive", "REAR", admin, 2),
                    Factory.CreateClassification("Four-Wheel Drive", "ALL", admin, 3)
                }
            };
            var classificationTypeTransmission = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.Transmission,
                Description = "transmission type",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<IClassification>
                {
                    Factory.CreateClassification("Manual", "MANUAL", admin,1 ),
                    Factory.CreateClassification("Automatic", "AUTOMATIC", admin, 2),
                    Factory.CreateClassification("Semi-Automatic", "SEMIAUTOMATIC", admin,3)
                }
            };
            var classificationTypePaymentStatus = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.PaymentStatus,
                Description = "payment status",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<IClassification>
                {
                    Factory.CreateClassification("Completed", "COMPLETED", admin, 1, "payment has successfully completed"),
                    Factory.CreateClassification("Failed", "FAILED", admin, 2, "payment has failed"),
                    Factory.CreateClassification("Rejected", "REJECTED", admin, 3, "payment was rejected"),
                    Factory.CreateClassification("Pending", "PENDING", admin, 4, "status is being processed")
                }
            };
            var classificationTypeManufacturer = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.Manufacturer,
                Description = "vehicles manufacturer",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<IClassification>
                {
                    Factory.CreateClassification("Jaguar", "JAGUAR", admin, weight: 1),
                    Factory.CreateClassification("BMW", "BMW", admin, weight: 2),
                    Factory.CreateClassification("Chrysler", "CHRYSLER", admin, weight: 3),
                    Factory.CreateClassification("Citroen", "CITROEN", admin, weight: 4),
                    Factory.CreateClassification("Fiat", "FIAT", admin, weight: 5),
                    Factory.CreateClassification("Ford", "FORD", admin, weight: 6),
                    Factory.CreateClassification("Honda", "HONDA", admin, weight: 7),
                    Factory.CreateClassification("Hyundai", "HYUNDAI", admin, weight: 8),
                    Factory.CreateClassification("Kia", "KIA", admin, weight: 9),
                    Factory.CreateClassification("Lexus", "LEXUS", admin, weight: 10),
                    Factory.CreateClassification("Mazda", "MAZDA", admin, weight: 11),
                    Factory.CreateClassification("Nissan", "NISSAN", admin, weight: 12),
                    Factory.CreateClassification("Opel", "OPEL", admin, weight: 13),
                    Factory.CreateClassification("Peugeot", "PEUGEOT", admin, weight: 14),
                    Factory.CreateClassification("Renault", "RENAULT", admin, weight: 15),
                    Factory.CreateClassification("Seat", "SEAT", admin, weight: 16),
                    Factory.CreateClassification("Škoda", "SKODA", admin, weight: 17),
                    Factory.CreateClassification("Subaru", "SUBARU", admin, weight: 18),
                    Factory.CreateClassification("Volkswagen", "VOLKSWAGEN", admin, weight: 19),
                    Factory.CreateClassification("Volvo", "VOLVO", admin, weight: 20),
                    Factory.CreateClassification("Porsche", "PORSCHE", admin, weight: 21),
                    Factory.CreateClassification("Ferrari", "FERRARI", admin, weight: 22),
                }
            };
            var classificationTypeFuel = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.Fuel,
                Description = "fuel type",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<IClassification>
                {
                    Factory.CreateClassification("Diesel", "DIESEL", admin, weight: 1),
                    Factory.CreateClassification("Petrol", "PETROL", admin, weight: 2),
                    Factory.CreateClassification("Electric", "ELECTRIC", admin, weight: 3),
                    Factory.CreateClassification("Petrol + gas (LPG)", "PLPG", admin, weight: 4),
                    Factory.CreateClassification("Petrol + gas (CNG)", "PCNG", admin, weight: 5),
                    Factory.CreateClassification("Gas (LPG)", "LPG", admin, weight: 6),
                    Factory.CreateClassification("Gas (CNG)", "CNG", admin, weight: 7),
                    Factory.CreateClassification("Hybrid", "HYBRID", admin, weight: 8),
                    Factory.CreateClassification("Ethanol", "ETHANOL", admin, weight: 9)
                }
            };
            var classificationTypeBody = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.VehicleBody,
                Description = "vehicle body",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<IClassification>
                {
                    // TODO: I forgot value2 :/ no need for it ATM
                    Factory.CreateClassification("Sedan", "SEDAN", admin,  1, "vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification("Hatchback", "HATCHBACK", admin,  2,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification("Touring", "TOURING", admin,  3,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification("Minivan", "MINIVAN", admin,  4,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification("Coupe", "COUPE", admin,  5,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification("Cabriolet", "CABRIOLET", admin,  6,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification("Limousine", "LIMOUSINE", admin,  7,"vehicle", "PASSANGER_CAR"),
                    Factory.CreateClassification("Limousine", "TOURING", admin,  1,"SUV", "SUV"),
                    Factory.CreateClassification("Pickup", "PICKUP", admin,  2,"SUV", "SUV"),
                    Factory.CreateClassification("Small Commercial", "SMALL_COMMERCIAL_VEHICLE", admin, 1, "commercial vehicle", "COMMERCIAL_VEHICLE" ),
                    Factory.CreateClassification("Commercial Vehicle", "COMMERCIAL_VEHICLE", admin,  2, "commercial vehicle","COMMERCIAL_VEHICLE"),
                    Factory.CreateClassification("Rigid", "RIGID", admin,3, "commercial vehicle",  "COMMERCIAL_VEHICLE"),
                    Factory.CreateClassification("Saddle", "SADDLE", admin,  1,"truck", "TRUCK"),
                    Factory.CreateClassification("Rigid", "RIGID", admin,  2, "truck","TRUCK"),
                    Factory.CreateClassification("Chassis", "CHASSIS", admin, 3,"truck",  "TRUCK"),
                    Factory.CreateClassification("Classical motorcycle", "CLASSICAL", admin, 1,"motorcycle",  "MOTO"),
                    Factory.CreateClassification("Scooter", "SCOOTER", admin,  2, "motorcycle","MOTO"),
                    Factory.CreateClassification("Moped", "MOPED", admin,  3, "motorcycle","MOTO"),
                    Factory.CreateClassification("Bike", "BIKE", admin,  4,"motorcycle", "MOTO"),
                    Factory.CreateClassification("Cruiser/Chopper", "CRUISERCHOPPER", admin,  5, "motorcycle","MOTO"),
                    Factory.CreateClassification("Touring", "TOURING", admin,  6, "motorcycle","MOTO"),
                    Factory.CreateClassification("Motocross Bike", "MOTOCROSS", admin,  7,"motorcycle", "MOTO"),
                    Factory.CreateClassification("Enduro/Supermoto", "ENDURO", admin,  8,"motorcycle", "MOTO"),
                    Factory.CreateClassification("Trial", "TRIAL", admin, 9, "motorcycle", "MOTO"),
                    Factory.CreateClassification("ATV", "ATV", admin,  10, "motorcycle","MOTO"),
                    Factory.CreateClassification("Buggy", "BUGGY", admin,  11,"motorcycle", "MOTO"),
                    Factory.CreateClassification("Moped Car", "MOPEDCAR", admin,  12,"motorcycle", "MOTO"),
                    Factory.CreateClassification("Other", "OTHER", admin,  13, "motorcycle","MOTO"),
                    Factory.CreateClassification("Launch/Motorboat", "MOTORBOAT", admin,  1,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification("Yacht", "YACHT", admin,  2,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification("Waterscooter", "WATERSCOOTER", admin,  3,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification("Other", "OTHER", admin,  4,"water type", "WATER_VEHICLE"),
                    Factory.CreateClassification("Light Trailer", "LIGHT", admin,  1, "trailer type","TRAILER"),
                    Factory.CreateClassification("Semi-Trailer", "SEMI", admin,  2,"trailer type", "TRAILER"),
                    Factory.CreateClassification("Trailer", "TRAILER", admin,  3,"trailer type", "TRAILER"),
                    Factory.CreateClassification("Caravan", "CARAVAN", admin,  1,"caravan type", "TRAILER"),
                    Factory.CreateClassification("Trailer Tent", "TRAILERTENT", admin,  2, "caravan type","TRAILER")
                }
            };
            context.ClassificationTypes.AddOrUpdate(x => x.Name,
                classificationTypePaymentType,
                classificationTypeDrivetrain,
                classificationTypeTransmission,
                classificationTypePaymentStatus,
                classificationTypeManufacturer,
                classificationTypeFuel,
                classificationTypeBody
                );
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
                string name,
                string value,
                ApplicationUser user,
                int weight,
                string description = null,
                string value2 = null)
            {
                return new Classification
                {
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
                string name,
                string description,
                string value,
                bool isActive,
                int weight)
            {
                return new Feature
                {
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
