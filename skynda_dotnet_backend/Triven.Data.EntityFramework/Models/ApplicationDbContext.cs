using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using Triven.Data.EntityFramework.Models.Assignmnet;
using Triven.Data.EntityFramework.Models.Classification;
using Triven.Data.EntityFramework.Models.Driver;
using Triven.Data.EntityFramework.Models.MessageTemplate;
using Triven.Data.EntityFramework.Models.Partner;
using Triven.Data.EntityFramework.Models.User;
using Triven.Data.EntityFramework.Models.Vehicle;

//using Microsoft.AspNet.Identity.Owin;

namespace Triven.Data.EntityFramework.Models
{

    public class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, int, AppUserLogin, AppUserRole, AppUserClaim>
    {
        public ApplicationDbContext() : base("DefaultConnection")
        {
            // Here use initializer of your choice
            Database.SetInitializer(new CreateDatabaseIfNotExists<ApplicationDbContext>());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppUser>().ToTable("Users").HasKey(x => x.Id);
            //modelBuilder.Entity<ApplicationUser>().ToTable("Users").HasKey(x => x.Id);
            modelBuilder.Entity<AppUserRole>().ToTable("UserRoles").HasKey(x => new { x.UserId, x.RoleId });
            modelBuilder.Entity<AppUserLogin>().ToTable("UserLogins");
            modelBuilder.Entity<AppUserClaim>().ToTable("UserClaims").HasKey(x => x.Id);
            modelBuilder.Entity<AppRole>().ToTable("Roles").HasKey(x => x.Id);
            modelBuilder.Entity<UserContactInfo>().ToTable("UserContactInfo").HasKey(x => x.Id);

            //Contact info relation
            modelBuilder.Entity<UserContactInfo>()
                .HasRequired(n => n.ApplicationUser)
                .WithMany(a => a.ContactInfos)
                .HasForeignKey(n => n.ApplicationUserId)
                .WillCascadeOnDelete(false);

        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }


    }
}