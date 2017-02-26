namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Classification",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        IsImported = c.Boolean(nullable: false),
                        Weight = c.Int(nullable: false),
                        Value = c.String(),
                        Name = c.String(),
                        ClassificationTypeId = c.Int(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        Value2 = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ClassificationType", t => t.ClassificationTypeId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .Index(t => t.ClassificationTypeId)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.ClassificationType",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                        FirstName = c.String(),
                        LastName = c.String(),
                        DriverId = c.Int(),
                        IsActive = c.Boolean(),
                        IsAdmin = c.Boolean(),
                        DefaultLanguage = c.String(),
                        Status = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex")
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.UserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.UserContactInfo",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ApplicationUserId = c.Int(nullable: false),
                        Phone = c.String(),
                        Email = c.String(),
                        Address = c.String(),
                        City = c.String(),
                        Country = c.String(),
                        ZipCode = c.String(),
                        WWW = c.String(),
                        Skype = c.String(),
                        Type = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.ApplicationUserId)
                .Index(t => t.ApplicationUserId);
            
            CreateTable(
                "dbo.UserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.Roles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Feature",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        IsImported = c.Boolean(nullable: false),
                        Weight = c.Int(nullable: false),
                        Value = c.String(),
                        Name = c.String(),
                        IsActive = c.Boolean(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.Image",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Url = c.String(),
                        BlobName = c.String(),
                        ContainerName = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.Subscription",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsActive = c.Boolean(nullable: false),
                        Email = c.String(),
                        UserId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.VehicleDescription",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Content = c.String(),
                        VehicleId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .ForeignKey("dbo.Vehicle", t => t.VehicleId, cascadeDelete: false)
                .Index(t => t.VehicleId)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.Vehicle",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VinCode = c.String(nullable: false),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        RegistrationNumber = c.String(nullable: false),
                        Mileage = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ColorOutsideHex = c.String(nullable: false),
                        ColorInsideHex = c.String(),
                        FuelCity = c.Decimal(nullable: false, precision: 18, scale: 2),
                        FuelHighway = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Problems = c.String(),
                        CompressionRatio = c.Int(nullable: false),
                        CompressionType = c.String(),
                        Configuration = c.String(),
                        Cylinders = c.String(),
                        Displacement = c.String(),
                        Size = c.Int(nullable: false),
                        Torque = c.Int(nullable: false),
                        TotalValves = c.Int(nullable: false),
                        Safetystars = c.Int(nullable: false),
                        SafetyUrl = c.String(),
                        Additional = c.String(),
                        OwnerId = c.Int(nullable: false),
                        MainImageId = c.Int(nullable: false),
                        ModelId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.OwnerId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Image", t => t.MainImageId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .ForeignKey("dbo.VehicleModel", t => t.ModelId, cascadeDelete: true)
                .Index(t => t.OwnerId)
                .Index(t => t.MainImageId)
                .Index(t => t.ModelId)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.VehicleFeature",
                c => new
                    {
                        FeatureId = c.Int(nullable: false),
                        VehicleId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => new { t.FeatureId, t.VehicleId })
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Feature", t => t.FeatureId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .ForeignKey("dbo.Vehicle", t => t.VehicleId, cascadeDelete: false)
                .Index(t => t.FeatureId)
                .Index(t => t.VehicleId)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.VehicleImage",
                c => new
                    {
                        VehicleId = c.Int(nullable: false),
                        ImageId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => new { t.VehicleId, t.ImageId })
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Image", t => t.ImageId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .ForeignKey("dbo.Vehicle", t => t.VehicleId, cascadeDelete: false)
                .Index(t => t.VehicleId)
                .Index(t => t.ImageId)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.VehicleReport",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Description = c.String(),
                        VehicleId = c.Int(nullable: false),
                        Inspector = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .ForeignKey("dbo.Vehicle", t => t.VehicleId, cascadeDelete: false)
                .Index(t => t.VehicleId)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.VehicleFault",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                        ImageId = c.Int(nullable: false),
                        VehicleReportId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Image", t => t.ImageId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .ForeignKey("dbo.VehicleReport", t => t.VehicleReportId, cascadeDelete: true)
                .Index(t => t.ImageId)
                .Index(t => t.VehicleReportId)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.VehicleReportItem",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsPass = c.Boolean(nullable: false),
                        Title = c.String(),
                        Text = c.String(),
                        ParentId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .ForeignKey("dbo.VehicleReport", t => t.ParentId, cascadeDelete: true)
                .Index(t => t.ParentId)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.VehicleReview",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LogoId = c.Int(nullable: false),
                        VideoId = c.Int(nullable: false),
                        Rating = c.Int(nullable: false),
                        VehicleId = c.Int(nullable: false),
                        Text = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .ForeignKey("dbo.Vehicle", t => t.VehicleId, cascadeDelete: false)
                .Index(t => t.VehicleId)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.VehicleModel",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        Title = c.String(),
                        HorsePower = c.Int(nullable: false),
                        Doors = c.Int(nullable: false),
                        Seats = c.Int(nullable: false),
                        ModelCode = c.String(nullable: false),
                        Engine = c.String(nullable: false),
                        Year = c.Int(nullable: false),
                        VehicleManufacturerId = c.Int(nullable: false),
                        TransmissionId = c.Int(nullable: false),
                        DrivetrainId = c.Int(nullable: false),
                        VehicleBodyId = c.Int(nullable: false),
                        FuelTypeId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Classification", t => t.DrivetrainId, cascadeDelete: false)
                .ForeignKey("dbo.Classification", t => t.FuelTypeId, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .ForeignKey("dbo.Classification", t => t.TransmissionId, cascadeDelete: false)
                .ForeignKey("dbo.Classification", t => t.VehicleBodyId, cascadeDelete: false)
                .ForeignKey("dbo.Classification", t => t.VehicleManufacturerId, cascadeDelete: false)
                .Index(t => t.VehicleManufacturerId)
                .Index(t => t.TransmissionId)
                .Index(t => t.DrivetrainId)
                .Index(t => t.VehicleBodyId)
                .Index(t => t.FuelTypeId)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vehicle", "ModelId", "dbo.VehicleModel");
            DropForeignKey("dbo.VehicleModel", "VehicleManufacturerId", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "VehicleBodyId", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "TransmissionId", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleModel", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleModel", "FuelTypeId", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "DrivetrainId", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleReview", "VehicleId", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleReview", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleReview", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleReview", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleReport", "VehicleId", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleReportItem", "ParentId", "dbo.VehicleReport");
            DropForeignKey("dbo.VehicleReportItem", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleReportItem", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleReportItem", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleReport", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleReport", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleFault", "VehicleReportId", "dbo.VehicleReport");
            DropForeignKey("dbo.VehicleFault", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleFault", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleFault", "ImageId", "dbo.Image");
            DropForeignKey("dbo.VehicleFault", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleReport", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "MainImageId", "dbo.Image");
            DropForeignKey("dbo.VehicleImage", "VehicleId", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleImage", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleImage", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleImage", "ImageId", "dbo.Image");
            DropForeignKey("dbo.VehicleImage", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleFeature", "VehicleId", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleFeature", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleFeature", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleFeature", "FeatureId", "dbo.Feature");
            DropForeignKey("dbo.VehicleFeature", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "VehicleId", "dbo.Vehicle");
            DropForeignKey("dbo.Vehicle", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "OwnerId", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserLogins", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserClaims", "UserId", "dbo.Users");
            DropForeignKey("dbo.Subscription", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.Subscription", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Subscription", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.Roles");
            DropForeignKey("dbo.Image", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.Image", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Image", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.Feature", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.Feature", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Feature", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.Classification", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.Classification", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Classification", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.Classification", "ClassificationTypeId", "dbo.ClassificationType");
            DropForeignKey("dbo.ClassificationType", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.ClassificationType", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.ClassificationType", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.Users", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.Users", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Users", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.UserContactInfo", "ApplicationUserId", "dbo.Users");
            DropIndex("dbo.VehicleModel", new[] { "DeletedBy" });
            DropIndex("dbo.VehicleModel", new[] { "UpdatedBy" });
            DropIndex("dbo.VehicleModel", new[] { "CreatedBy" });
            DropIndex("dbo.VehicleModel", new[] { "FuelTypeId" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleBodyId" });
            DropIndex("dbo.VehicleModel", new[] { "DrivetrainId" });
            DropIndex("dbo.VehicleModel", new[] { "TransmissionId" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleManufacturerId" });
            DropIndex("dbo.VehicleReview", new[] { "DeletedBy" });
            DropIndex("dbo.VehicleReview", new[] { "UpdatedBy" });
            DropIndex("dbo.VehicleReview", new[] { "CreatedBy" });
            DropIndex("dbo.VehicleReview", new[] { "VehicleId" });
            DropIndex("dbo.VehicleReportItem", new[] { "DeletedBy" });
            DropIndex("dbo.VehicleReportItem", new[] { "UpdatedBy" });
            DropIndex("dbo.VehicleReportItem", new[] { "CreatedBy" });
            DropIndex("dbo.VehicleReportItem", new[] { "ParentId" });
            DropIndex("dbo.VehicleFault", new[] { "DeletedBy" });
            DropIndex("dbo.VehicleFault", new[] { "UpdatedBy" });
            DropIndex("dbo.VehicleFault", new[] { "CreatedBy" });
            DropIndex("dbo.VehicleFault", new[] { "VehicleReportId" });
            DropIndex("dbo.VehicleFault", new[] { "ImageId" });
            DropIndex("dbo.VehicleReport", new[] { "DeletedBy" });
            DropIndex("dbo.VehicleReport", new[] { "UpdatedBy" });
            DropIndex("dbo.VehicleReport", new[] { "CreatedBy" });
            DropIndex("dbo.VehicleReport", new[] { "VehicleId" });
            DropIndex("dbo.VehicleImage", new[] { "DeletedBy" });
            DropIndex("dbo.VehicleImage", new[] { "UpdatedBy" });
            DropIndex("dbo.VehicleImage", new[] { "CreatedBy" });
            DropIndex("dbo.VehicleImage", new[] { "ImageId" });
            DropIndex("dbo.VehicleImage", new[] { "VehicleId" });
            DropIndex("dbo.VehicleFeature", new[] { "DeletedBy" });
            DropIndex("dbo.VehicleFeature", new[] { "UpdatedBy" });
            DropIndex("dbo.VehicleFeature", new[] { "CreatedBy" });
            DropIndex("dbo.VehicleFeature", new[] { "VehicleId" });
            DropIndex("dbo.VehicleFeature", new[] { "FeatureId" });
            DropIndex("dbo.Vehicle", new[] { "DeletedBy" });
            DropIndex("dbo.Vehicle", new[] { "UpdatedBy" });
            DropIndex("dbo.Vehicle", new[] { "CreatedBy" });
            DropIndex("dbo.Vehicle", new[] { "ModelId" });
            DropIndex("dbo.Vehicle", new[] { "MainImageId" });
            DropIndex("dbo.Vehicle", new[] { "OwnerId" });
            DropIndex("dbo.VehicleDescription", new[] { "DeletedBy" });
            DropIndex("dbo.VehicleDescription", new[] { "UpdatedBy" });
            DropIndex("dbo.VehicleDescription", new[] { "CreatedBy" });
            DropIndex("dbo.VehicleDescription", new[] { "VehicleId" });
            DropIndex("dbo.Subscription", new[] { "DeletedBy" });
            DropIndex("dbo.Subscription", new[] { "UpdatedBy" });
            DropIndex("dbo.Subscription", new[] { "CreatedBy" });
            DropIndex("dbo.Roles", "RoleNameIndex");
            DropIndex("dbo.Image", new[] { "DeletedBy" });
            DropIndex("dbo.Image", new[] { "UpdatedBy" });
            DropIndex("dbo.Image", new[] { "CreatedBy" });
            DropIndex("dbo.Feature", new[] { "DeletedBy" });
            DropIndex("dbo.Feature", new[] { "UpdatedBy" });
            DropIndex("dbo.Feature", new[] { "CreatedBy" });
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.UserRoles", new[] { "UserId" });
            DropIndex("dbo.UserLogins", new[] { "UserId" });
            DropIndex("dbo.UserContactInfo", new[] { "ApplicationUserId" });
            DropIndex("dbo.UserClaims", new[] { "UserId" });
            DropIndex("dbo.Users", new[] { "DeletedBy" });
            DropIndex("dbo.Users", new[] { "UpdatedBy" });
            DropIndex("dbo.Users", new[] { "CreatedBy" });
            DropIndex("dbo.Users", "UserNameIndex");
            DropIndex("dbo.ClassificationType", new[] { "DeletedBy" });
            DropIndex("dbo.ClassificationType", new[] { "UpdatedBy" });
            DropIndex("dbo.ClassificationType", new[] { "CreatedBy" });
            DropIndex("dbo.Classification", new[] { "DeletedBy" });
            DropIndex("dbo.Classification", new[] { "UpdatedBy" });
            DropIndex("dbo.Classification", new[] { "CreatedBy" });
            DropIndex("dbo.Classification", new[] { "ClassificationTypeId" });
            DropTable("dbo.VehicleModel");
            DropTable("dbo.VehicleReview");
            DropTable("dbo.VehicleReportItem");
            DropTable("dbo.VehicleFault");
            DropTable("dbo.VehicleReport");
            DropTable("dbo.VehicleImage");
            DropTable("dbo.VehicleFeature");
            DropTable("dbo.Vehicle");
            DropTable("dbo.VehicleDescription");
            DropTable("dbo.Subscription");
            DropTable("dbo.Roles");
            DropTable("dbo.Image");
            DropTable("dbo.Feature");
            DropTable("dbo.UserRoles");
            DropTable("dbo.UserLogins");
            DropTable("dbo.UserContactInfo");
            DropTable("dbo.UserClaims");
            DropTable("dbo.Users");
            DropTable("dbo.ClassificationType");
            DropTable("dbo.Classification");
        }
    }
}
