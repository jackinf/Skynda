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
    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        private const string ModifierUserIp = "127.0.0.1";

        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            //
            //  Seed application roles
            //

            CreateNewRoles(context);

            //
            //  Seed application users
            //

           var adminEmail = CreateAdmin(context);
            CreateVehicleManager(context);

            //
            // Seed classifications
            //

            var admin = context.Users.Single(x => x.Email == adminEmail) as ApplicationUser;
            //var manager = new AppUserManager(new AppUserStore());
            //var admin = manager.FindByEmail(adminEmail) as ApplicationUser;

            var classificationType_paymentType = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.PAYMENT_TYPE,
                Description = "single or recurring payment",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    Factory.CreateClassification("Single payment", "FULL", admin),
                    Factory.CreateClassification("Recurring payment", "RECURRING", admin)
                }
            };
            var classificationType_drivetrain = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.DRIVETRAIN,
                Description = "vehicle drivetrain",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    Factory.CreateClassification("Front-Wheel Drive", "FRONT", admin),
                    Factory.CreateClassification("Rear-Wheel Drive", "REAR", admin),
                    Factory.CreateClassification("Four-Wheel Drive", "ALL", admin)
                }
            };
            var classificationType_transmission = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.TRANSMISSION,
                Description = "transmission type",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    Factory.CreateClassification("Manual", "MANUAL", admin),
                    Factory. CreateClassification("Automatic", "AUTOMATIC", admin),
                    Factory.CreateClassification("Semi-Automatic", "SEMIAUTOMATIC", admin)
                }
            };
            var classificationType_paymentStatus = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.PAYMENT_STATUS,
                Description = "payment status",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    Factory.CreateClassification("Completed", "COMPLETED", admin, "payment has successfully completed"),
                    Factory.CreateClassification("Failed", "FAILED", admin, "payment has failed"),
                    Factory.CreateClassification("Rejected", "REJECTED", admin, "payment was rejected"),
                    Factory.CreateClassification("Pending", "PENDING", admin, "status is being processed")
                }
            };
            var classificationType_manufacturer = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.MANUFACTURER,
                Description = "vehicles manufacturer",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
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
            var classificationType_fuel = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.FUEL,
                Description = "fuel type",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
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
            var classificationType_body = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.VEHICLE_BODY,
                Description = "vehicle body",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp,
                Classifications = new List<Classification>
                {
                    // TODO: I forgot value2 :/
                    Factory.CreateClassification("Sedan", "SEDAN",admin, "vehicle",1),
                    Factory.CreateClassification("Hatchback", "HATCHBACK",admin, "vehicle",2),
                    Factory.CreateClassification("Touring", "TOURING",admin, "vehicle",3),
                    Factory.CreateClassification("Minivan", "MINIVAN",admin, "vehicle",4),
                    Factory.CreateClassification("Coupe", "COUPE",admin, "vehicle",5),
                    Factory.CreateClassification("Cabriolet", "CABRIOLET",admin, "vehicle",6),
                    Factory.CreateClassification("Limousine", "LIMOUSINE",admin, "vehicle",7),
                    Factory.CreateClassification("Limousine", "TOURING",admin, "SUV",1),
                    Factory.CreateClassification("Pickup", "PICKUP",admin, "SUV",2),
                    Factory.CreateClassification("Small Commercial", "SMALL_COMMERCIAL_VEHICLE",admin, "commercial vehicle",1),
                    Factory.CreateClassification("Commercial Vehicle", "COMMERCIAL_VEHICLE",admin, "commercial vehicle",2),
                    Factory.CreateClassification("Rigid", "RIGID",admin, "commercial vehicle",3),
                    Factory.CreateClassification("Saddle", "SADDLE",admin, "truck",1),
                    Factory.CreateClassification("Rigid", "RIGID",admin, "truck",2),
                    Factory.CreateClassification("Chassis", "CHASSIS",admin, "truck",3),
                    Factory.CreateClassification("Classical motorcycle", "CLASSICAL",admin, "motorcycle",1),
                    Factory.CreateClassification("Scooter", "SCOOTER",admin, "motorcycle",2),
                    Factory.CreateClassification("Moped", "MOPED",admin, "motorcycle",3),
                    Factory.CreateClassification("Bike", "BIKE",admin, "motorcycle",4),
                    Factory.CreateClassification("Cruiser/Chopper", "CRUISERCHOPPER",admin, "motorcycle",5),
                    Factory.CreateClassification("Touring", "TOURING",admin, "motorcycle",6),
                    Factory.CreateClassification("Motocross Bike", "MOTOCROSS",admin, "motorcycle",7),
                    Factory.CreateClassification("Enduro/Supermoto", "ENDURO",admin, "motorcycle",8),
                    Factory.CreateClassification("Trial", "TRIAL",admin, "motorcycle",9),
                    Factory.CreateClassification("ATV", "ATV",admin, "motorcycle",10),
                    Factory.CreateClassification("Buggy", "BUGGY",admin, "motorcycle",11),
                    Factory.CreateClassification("Moped Car", "MOPEDCAR",admin, "motorcycle",12),
                    Factory.CreateClassification("Other", "OTHER",admin, "motorcycle",13),
                    Factory.CreateClassification("Launch/Motorboat", "MOTORBOAT",admin, "water type",1),
                    Factory.CreateClassification("Yacht", "YACHT",admin, "water type",2),
                    Factory.CreateClassification("Waterscooter", "WATERSCOOTER",admin, "water type",3),
                    Factory.CreateClassification("Other", "OTHER",admin, "water type",4),
                    Factory.CreateClassification("Light Trailer", "LIGHT",admin, "trailer type",1),
                    Factory.CreateClassification("Semi-Trailer", "SEMI",admin, "trailer type",2),
                    Factory.CreateClassification("Trailer", "TRAILER",admin, "trailer type",3),
                    Factory.CreateClassification("Caravan", "CARAVAN",admin, "caravan type",1),
                    Factory.CreateClassification("Trailer Tent", "TRAILERTENT",admin, "caravan type",2)
                }
            };
            context.ClassificationTypes.AddOrUpdate(x => x.Name, 
                classificationType_paymentType,
                classificationType_drivetrain,
                classificationType_transmission,
                classificationType_paymentStatus,
                classificationType_manufacturer,
                classificationType_fuel,
                classificationType_body
            );
            context.SaveChanges();
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
                    var newRole = new AppRole();
                    newRole.Name = role;
                    roleManager.Create(newRole);
                }
            }
        }

        private static string CreateAdmin(ApplicationDbContext context)
        {
            const string EmailSteve = "steve@steve.com";
            if (context.Users.Count(x => x.Email == EmailSteve) == 0)
            {
                string password = "123456aA!";
                var manager = new AppUserManager(new AppUserStore());

                var newUser = new ApplicationUser();
                newUser.Email = EmailSteve;
                newUser.UserName = "steve";
                newUser.FirstName = "Triven";
                newUser.LastName = "Administrator";
                newUser.Password = password; // this assignment is obsolete i think
                newUser.PasswordConfirm = password; // this assignment is obsolete i think
                newUser.CreatedOn = DateTime.Now;
                newUser.IsActive = true;
                newUser.IsAdmin = true;
                newUser.EmailConfirmed = true;
                newUser.Status = Status.Active;
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
            return EmailSteve;
        }

        private static void CreateVehicleManager(ApplicationDbContext context)
        {
            string emailBill = "bill@bill.com";
            if (context.Users.Count(x => x.Email == emailBill) == 0)
            {
                string password = "123456aA!";
                var manager = new AppUserManager(new AppUserStore());

                var newUser = new ApplicationUser();
                newUser.Email = emailBill;
                newUser.UserName = "bill";
                newUser.FirstName = "Triven";
                newUser.LastName = "Vehicle Manager";
                newUser.Password = password; // this assignment is obsolete i think
                newUser.PasswordConfirm = password; // this assignment is obsolete i think
                newUser.CreatedOn = DateTime.Now;
                newUser.IsActive = true;
                newUser.IsAdmin = true;
                newUser.EmailConfirmed = true;
                newUser.Status = Status.Active;
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
                string description = null,
                int weight = 1,
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
        }
    }
}
