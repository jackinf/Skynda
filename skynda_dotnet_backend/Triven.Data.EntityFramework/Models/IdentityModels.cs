using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using X3Project.Data.EntityFramework.Models.Assignmnet;
using X3Project.Data.EntityFramework.Models.Classification;
using X3Project.Data.EntityFramework.Models.Driver;
using X3Project.Data.EntityFramework.Models.MessageTemplate;
using X3Project.Data.EntityFramework.Models.Partner;
using X3Project.Data.EntityFramework.Models.User;
using X3Project.Data.EntityFramework.Models.Vehicle;
using X3Project.Domain.Constants;
using X3Project.Domain.Models;

//using Microsoft.AspNet.Identity.Owin;

namespace X3Project.Data.EntityFramework.Models
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

            modelBuilder.Entity<ClassificationModel>()
                    .HasOptional(i => i.ParentItem)
                    .WithMany(i => i.ChildItems)
                    .HasForeignKey(i => i.Parent_FK);
            //Partner
            modelBuilder.Entity<PartnerContactPersonModel>()
                .HasRequired(c => c.Partner)
                .WithMany(t => t.ContactPersons)
                .HasForeignKey(i => i.PartnerId_FK);

            modelBuilder.Entity<PartnerModel>()
                .HasMany(s => s.PartnerUsers)
                .WithMany(c => c.UserPartners)
                .Map(cs =>
                {
                    cs.MapLeftKey("PartnerId_FK");
                    cs.MapRightKey("UserId_FK");
                    cs.ToTable("PartnerUsers");
                });

            modelBuilder.Entity<VehicleModel>()
               .HasRequired(c => c.Partner)
               .WithMany(t => t.Vehicles)
               .HasForeignKey(i => i.PartnerId_FK);

            RemoveCascadeDelete(modelBuilder);


        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        /// <summary>
        /// Users
        /// </summary>
        //public DbSet<ApplicationUser> AppUsers { get; set; }
        //public DbSet<AppRole> AppRoles { get; set; }
        //public DbSet<AppUserLogin> AppUserLogins { get; set; }
        //public DbSet<AppUserRole> AppUserRoles { get; set; }
        //public DbSet<AppUserClaim> AppUserClaims { get; set; }

        public DbSet<TodoModel> Todos { get; set; }

        /// <summary>
        /// Partner
        /// </summary>
        public DbSet<PartnerModel> Partners { get; set; }

        public DbSet<PartnerContactPersonModel> PartnerContactPersons { get; set; }
        public DbSet<PartnerContactPersonContactInfoModel> PartnerContactPersonContactInfos { get; set; }

        /// <summary>
        /// Vehicle
        /// </summary>
        public DbSet<VehicleModel> Vehicles { get; set; }
        public DbSet<VehicleProperyModel> VehicleProperties { get; set; }

        /// <summary>
        /// Drivers
        /// </summary>
        public DbSet<DriverModel> Drivers { get; set; }

        /// <summary>
        /// Assignments
        /// </summary>
        public DbSet<AssignmentModel> Assignments { get; set; }
        public DbSet<AssignmentVehicleModel> AssignmentVehicles { get; set; }
        public DbSet<AssignmentAddressModel> AssignmentAddresses { get; set; }
        public DbSet<AssignmentPalletModel> AssignmentPallets { get; set; }
        public DbSet<AssignmentTransportDocumentModel> AssignmentTransportDocuments { get; set; }
        public DbSet<AssignmentDriverInstructionModel> AssignmentDriverInstructions { get; set; }

        /// <summary>
        /// User
        /// </summary>
        public DbSet<UserContactInfo> UserContactInfos { get; set; }

        /// <summary>
        /// Classification
        /// </summary>
        public DbSet<ClassificationModel> Classification { get; set; }
        public DbSet<ClassificationValueModel> ClassificationValues { get; set; }
        public DbSet<ClassificationValueTranslateModel> ClassificationValuesTranslates { get; set; }

        /// <summary>
        /// Message templates
        /// </summary>
        public DbSet<MessageTemplateModel> MessageTemplate { get; set; }

        /// <summary>
        /// Removes cascade delete from tables
        /// </summary>
        /// <param name="modelBuilder"></param>
        private void RemoveCascadeDelete(DbModelBuilder modelBuilder)
        {
            //Remove cascade on delete
            modelBuilder.Entity<AssignmentModel>()
           .HasOptional(s => s.Creator).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<AssignmentModel>()
           .HasOptional(s => s.Modifier).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<AssignmentModel>()
           .HasOptional(s => s.Remover).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<PartnerModel>()
           .HasOptional(s => s.Creator).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<PartnerModel>()
           .HasOptional(s => s.Modifier).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<PartnerModel>()
           .HasOptional(s => s.Remover).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<PartnerContactPersonModel>()
           .HasOptional(s => s.Creator).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<PartnerContactPersonModel>()
           .HasOptional(s => s.Modifier).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<PartnerContactPersonModel>()
           .HasOptional(s => s.Remover).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<VehicleModel>()
           .HasOptional(s => s.Creator).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<VehicleModel>()
           .HasOptional(s => s.Modifier).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<VehicleModel>()
           .HasOptional(s => s.Remover).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<DriverModel>()
           .HasOptional(s => s.Creator).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<DriverModel>()
           .HasOptional(s => s.Modifier).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<DriverModel>()
           .HasOptional(s => s.Remover).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<ClassificationModel>()
           .HasOptional(s => s.Creator).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<ClassificationModel>()
           .HasOptional(s => s.Modifier).WithMany().WillCascadeOnDelete(false);

            //Remove cascade on delete
            modelBuilder.Entity<ClassificationModel>()
           .HasOptional(s => s.Remover).WithMany().WillCascadeOnDelete(false);
        }
    }
}