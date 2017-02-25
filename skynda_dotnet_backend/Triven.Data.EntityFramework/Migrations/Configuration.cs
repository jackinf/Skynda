using System;
using System.Data.Entity.Migrations;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Models.MessageTemplate;
using Triven.Data.EntityFramework.Models.User;
using Triven.Data.EntityFramework.Repositories;
using Triven.Domain.Constants;
using Triven.Domain.Infrastructure.Notice;

namespace Triven.Data.EntityFramework.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            //
            //  Seed application roles
            //

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

            //
            //  Seed application admin user
            //

            string userName = "root@speys.com";
            if (context.Users.Count(x => x.Email == userName) == 0)
            {
                string password = "Hammer&Nail";
                var manager = new AppUserManager(new AppUserStore());

                var newUser = new ApplicationUser();
                newUser.UserName = newUser.Email = userName;
                newUser.FirstName = "Speys";
                newUser.LastName = "Administrator";
                newUser.Password = password;
                newUser.PasswordConfirm = password;
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

            //
            // Message template confirm email
            //

            var repository = new MessageTemplateRepository();
            if (repository.GetByNameAndLocale(MessageTemplates.ConfirmEmail.ToString(), Language.en.ToString()) == null)
            {
                var messageTemplate = new MessageTemplateModel()
                {
                    Name = MessageTemplates.ConfirmEmail.ToString(),
                    //Title = "Plase confirm your Speys account",
                    Locale = Language.en,
                    Message = "<div>Dear {COMPANY_NAME},<br/> Thank you for your registration. Please confirm your email {EMAIL} <a href='{URL}'>{URL}</a></div>",
                    Fields = "[" + ConfirmEmailNotice.VarEmail + "," + ConfirmEmailNotice.VarCompanyName + "," + ConfirmEmailNotice.VarUrl + "]"
                };
                repository.Add(messageTemplate);
                context.SaveChanges();
            }
        }
    }
}
