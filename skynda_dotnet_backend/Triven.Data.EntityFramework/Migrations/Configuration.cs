using System;
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

            //var admin = context.Users.Single(x => x.Email == EmailSteve) as ApplicationUser;
            var manager = new AppUserManager(new AppUserStore());
            var admin = manager.FindByEmail(adminEmail) as ApplicationUser;

            var classificationType_paymentType = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.PAYMENT_TYPE,
                Description = "single or recurring payment",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp
            };
            var classificationType_drivetrain = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.DRIVETRAIN,
                Description = "vehicle drivetrain",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp
            };
            var classificationType_transmission = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.TRANSMISSION,
                Description = "transmission type",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp
            };
            var classificationType_paymentStatus = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.PAYMENT_STATUS,
                Description = "payment status",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp
            };
            var classificationType_manufacturer = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.MANUFACTURER,
                Description = "vehicles manufacturer",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp
            };
            var classificationType_fuel = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.FUEL,
                Description = "fuel type",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp
            };
            var classificationType_body = new ClassificationType
            {
                Name = DatabaseConstants.ClassificationTypeName.VEHICLE_BODY,
                Description = "vehicle body",
                Creator = admin,
                CreatedOn = DateTime.Now,
                ModifierUserIp = ModifierUserIp
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
    }
}
