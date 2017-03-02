using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.UnitOfWorks;

//using Microsoft.AspNet.Identity.Owin;

namespace Triven.Data.EntityFramework
{

    public class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, int, AppUserLogin, AppUserRole, AppUserClaim>, IDbContext
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
            //modelBuilder.Entity<UserContactInfo>().ToTable("UserContactInfo").HasKey(x => x.Id); // TODO: Not needed

            //Contact info relation TODO: Not needed
            //modelBuilder.Entity<UserContactInfo>()
            //    .HasRequired(n => n.ApplicationUser)
            //    .WithMany(a => a.ContactInfos)
            //    .HasForeignKey(n => n.ApplicationUserId)
            //    .WillCascadeOnDelete(false);
        }

        public DbSet<Classification> Classifications { get; set; }
        public DbSet<ClassificationType> ClassificationTypes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleDescription> VehicleDescriptions { get; set; }
        public DbSet<VehicleFault> VehicleFaults { get; set; }
        public DbSet<VehicleFeature> VehicleFeatures { get; set; }
        public DbSet<VehicleImage> VehicleImages { get; set; }
        public DbSet<VehicleModel> VehicleModels { get; set; }
        public DbSet<VehicleReport> VehicleReports { get; set; }
        public DbSet<VehicleReportItem> VehicleReportItems { get; set; }
        public DbSet<VehicleReview> VehicleReviews { get; set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }


    }
}