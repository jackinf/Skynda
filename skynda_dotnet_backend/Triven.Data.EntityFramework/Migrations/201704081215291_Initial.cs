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
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ClassificationType", t => t.ClassificationTypeId, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .Index(t => t.ClassificationTypeId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
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
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
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
                        ModifierUserIp = c.String(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
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
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: false)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.UserContactInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Phone = c.String(),
                        Email = c.String(),
                        Address = c.String(),
                        City = c.String(),
                        Country = c.String(),
                        ZipCode = c.String(),
                        WWW = c.String(),
                        Skype = c.String(),
                        CreatedOn = c.DateTime(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        Type = c.Int(nullable: false),
                        ApplicationUser_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.ApplicationUser_Id)
                .Index(t => t.ApplicationUser_Id);
            
            CreateTable(
                "dbo.UserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: false)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.Roles", t => t.RoleId, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: false)
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
                        NameEng = c.String(),
                        IsActive = c.Boolean(nullable: false),
                        CategoryName = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
            CreateTable(
                "dbo.Image",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Url = c.String(),
                        BlobName = c.String(),
                        ContainerName = c.String(),
                        ThumbnailUrl = c.String(),
                        ThumbnailBlobName = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
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
                        ApplicationUserId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.ApplicationUserId, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .Index(t => t.ApplicationUserId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
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
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .ForeignKey("dbo.Vehicle", t => t.VehicleId, cascadeDelete: false)
                .Index(t => t.VehicleId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
            CreateTable(
                "dbo.Vehicle",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VinCode = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        RegistrationNumber = c.String(),
                        Mileage = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ColorOutsideHex = c.String(),
                        ColorInsideHex = c.String(),
                        FuelCity = c.Decimal(nullable: false, precision: 18, scale: 2),
                        FuelHighway = c.Decimal(nullable: false, precision: 18, scale: 2),
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
                        HorsePower = c.Int(nullable: false),
                        Engine = c.String(),
                        Year = c.Int(nullable: false),
                        VehicleStatus = c.String(),
                        ApplicationUserId = c.Int(),
                        MainImageId = c.Int(nullable: false),
                        VehicleModelId = c.Int(nullable: false),
                        TransmissionId = c.Int(nullable: false),
                        FuelTypeId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.ApplicationUserId)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Classification", t => t.FuelTypeId, cascadeDelete: false)
                .ForeignKey("dbo.Image", t => t.MainImageId, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .ForeignKey("dbo.Classification", t => t.TransmissionId, cascadeDelete: false)
                .ForeignKey("dbo.VehicleModel", t => t.VehicleModelId, cascadeDelete: false)
                .Index(t => t.ApplicationUserId)
                .Index(t => t.MainImageId)
                .Index(t => t.VehicleModelId)
                .Index(t => t.TransmissionId)
                .Index(t => t.FuelTypeId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
            CreateTable(
                "dbo.VehicleFeature",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FeatureId = c.Int(nullable: false),
                        VehicleId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Feature", t => t.FeatureId, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .ForeignKey("dbo.Vehicle", t => t.VehicleId, cascadeDelete: false)
                .Index(t => t.FeatureId)
                .Index(t => t.VehicleId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
            CreateTable(
                "dbo.VehicleImage",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VehicleId = c.Int(nullable: false),
                        ImageId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Image", t => t.ImageId, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .ForeignKey("dbo.Vehicle", t => t.VehicleId, cascadeDelete: false)
                .Index(t => t.VehicleId)
                .Index(t => t.ImageId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
            CreateTable(
                "dbo.VehicleReport",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Description = c.String(),
                        Inspector = c.String(),
                        VehicleId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .ForeignKey("dbo.Vehicle", t => t.VehicleId, cascadeDelete: false)
                .Index(t => t.VehicleId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
            CreateTable(
                "dbo.VehicleFault",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                        ImageId = c.Int(),
                        VehicleReportId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Image", t => t.ImageId)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .ForeignKey("dbo.VehicleReport", t => t.VehicleReportId, cascadeDelete: false)
                .Index(t => t.ImageId)
                .Index(t => t.VehicleReportId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
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
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .ForeignKey("dbo.VehicleReport", t => t.ParentId, cascadeDelete: false)
                .Index(t => t.ParentId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
            CreateTable(
                "dbo.VehicleReview",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LogoId = c.Int(nullable: false),
                        VideoId = c.Int(nullable: false),
                        VideoUrl = c.String(),
                        LogoUrl = c.String(),
                        Rating = c.Int(nullable: false),
                        Text = c.String(),
                        VehicleId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .ForeignKey("dbo.Vehicle", t => t.VehicleId, cascadeDelete: false)
                .Index(t => t.VehicleId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
            CreateTable(
                "dbo.VehicleModel",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        Doors = c.Int(nullable: false),
                        Seats = c.Int(nullable: false),
                        ModelCode = c.String(),
                        VehicleManufacturerId = c.Int(nullable: false),
                        DrivetrainId = c.Int(nullable: false),
                        VehicleBodyId = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatorId = c.Int(),
                        ModifierId = c.Int(),
                        RemoverId = c.Int(),
                        ModifierUserIp = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId)
                .ForeignKey("dbo.Classification", t => t.DrivetrainId, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.ModifierId)
                .ForeignKey("dbo.Users", t => t.RemoverId)
                .ForeignKey("dbo.Classification", t => t.VehicleBodyId, cascadeDelete: false)
                .ForeignKey("dbo.Classification", t => t.VehicleManufacturerId, cascadeDelete: false)
                .Index(t => t.VehicleManufacturerId)
                .Index(t => t.DrivetrainId)
                .Index(t => t.VehicleBodyId)
                .Index(t => t.CreatorId)
                .Index(t => t.ModifierId)
                .Index(t => t.RemoverId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vehicle", "VehicleModelId", "dbo.VehicleModel");
            DropForeignKey("dbo.VehicleModel", "VehicleManufacturerId", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "VehicleBodyId", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.VehicleModel", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.VehicleModel", "DrivetrainId", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "TransmissionId", "dbo.Classification");
            DropForeignKey("dbo.VehicleReview", "VehicleId", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleReview", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.VehicleReview", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.VehicleReview", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.VehicleReport", "VehicleId", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleReport", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.VehicleReport", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.VehicleReportItem", "ParentId", "dbo.VehicleReport");
            DropForeignKey("dbo.VehicleReportItem", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.VehicleReportItem", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.VehicleReportItem", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.VehicleFault", "VehicleReportId", "dbo.VehicleReport");
            DropForeignKey("dbo.VehicleFault", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.VehicleFault", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.VehicleFault", "ImageId", "dbo.Image");
            DropForeignKey("dbo.VehicleFault", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.VehicleReport", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "MainImageId", "dbo.Image");
            DropForeignKey("dbo.VehicleImage", "VehicleId", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleImage", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.VehicleImage", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.VehicleImage", "ImageId", "dbo.Image");
            DropForeignKey("dbo.VehicleImage", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "FuelTypeId", "dbo.Classification");
            DropForeignKey("dbo.VehicleFeature", "VehicleId", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleFeature", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.VehicleFeature", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.VehicleFeature", "FeatureId", "dbo.Feature");
            DropForeignKey("dbo.VehicleFeature", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "VehicleId", "dbo.Vehicle");
            DropForeignKey("dbo.Vehicle", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "ApplicationUserId", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserLogins", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserClaims", "UserId", "dbo.Users");
            DropForeignKey("dbo.Subscription", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.Subscription", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.Subscription", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.Subscription", "ApplicationUserId", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.Roles");
            DropForeignKey("dbo.Image", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.Image", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.Image", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.Feature", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.Feature", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.Feature", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.Classification", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.Classification", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.Classification", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.ClassificationType", "RemoverId", "dbo.Users");
            DropForeignKey("dbo.ClassificationType", "ModifierId", "dbo.Users");
            DropForeignKey("dbo.ClassificationType", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.UserContactInfoes", "ApplicationUser_Id", "dbo.Users");
            DropForeignKey("dbo.Classification", "ClassificationTypeId", "dbo.ClassificationType");
            DropIndex("dbo.VehicleModel", new[] { "RemoverId" });
            DropIndex("dbo.VehicleModel", new[] { "ModifierId" });
            DropIndex("dbo.VehicleModel", new[] { "CreatorId" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleBodyId" });
            DropIndex("dbo.VehicleModel", new[] { "DrivetrainId" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleManufacturerId" });
            DropIndex("dbo.VehicleReview", new[] { "RemoverId" });
            DropIndex("dbo.VehicleReview", new[] { "ModifierId" });
            DropIndex("dbo.VehicleReview", new[] { "CreatorId" });
            DropIndex("dbo.VehicleReview", new[] { "VehicleId" });
            DropIndex("dbo.VehicleReportItem", new[] { "RemoverId" });
            DropIndex("dbo.VehicleReportItem", new[] { "ModifierId" });
            DropIndex("dbo.VehicleReportItem", new[] { "CreatorId" });
            DropIndex("dbo.VehicleReportItem", new[] { "ParentId" });
            DropIndex("dbo.VehicleFault", new[] { "RemoverId" });
            DropIndex("dbo.VehicleFault", new[] { "ModifierId" });
            DropIndex("dbo.VehicleFault", new[] { "CreatorId" });
            DropIndex("dbo.VehicleFault", new[] { "VehicleReportId" });
            DropIndex("dbo.VehicleFault", new[] { "ImageId" });
            DropIndex("dbo.VehicleReport", new[] { "RemoverId" });
            DropIndex("dbo.VehicleReport", new[] { "ModifierId" });
            DropIndex("dbo.VehicleReport", new[] { "CreatorId" });
            DropIndex("dbo.VehicleReport", new[] { "VehicleId" });
            DropIndex("dbo.VehicleImage", new[] { "RemoverId" });
            DropIndex("dbo.VehicleImage", new[] { "ModifierId" });
            DropIndex("dbo.VehicleImage", new[] { "CreatorId" });
            DropIndex("dbo.VehicleImage", new[] { "ImageId" });
            DropIndex("dbo.VehicleImage", new[] { "VehicleId" });
            DropIndex("dbo.VehicleFeature", new[] { "RemoverId" });
            DropIndex("dbo.VehicleFeature", new[] { "ModifierId" });
            DropIndex("dbo.VehicleFeature", new[] { "CreatorId" });
            DropIndex("dbo.VehicleFeature", new[] { "VehicleId" });
            DropIndex("dbo.VehicleFeature", new[] { "FeatureId" });
            DropIndex("dbo.Vehicle", new[] { "RemoverId" });
            DropIndex("dbo.Vehicle", new[] { "ModifierId" });
            DropIndex("dbo.Vehicle", new[] { "CreatorId" });
            DropIndex("dbo.Vehicle", new[] { "FuelTypeId" });
            DropIndex("dbo.Vehicle", new[] { "TransmissionId" });
            DropIndex("dbo.Vehicle", new[] { "VehicleModelId" });
            DropIndex("dbo.Vehicle", new[] { "MainImageId" });
            DropIndex("dbo.Vehicle", new[] { "ApplicationUserId" });
            DropIndex("dbo.VehicleDescription", new[] { "RemoverId" });
            DropIndex("dbo.VehicleDescription", new[] { "ModifierId" });
            DropIndex("dbo.VehicleDescription", new[] { "CreatorId" });
            DropIndex("dbo.VehicleDescription", new[] { "VehicleId" });
            DropIndex("dbo.Subscription", new[] { "RemoverId" });
            DropIndex("dbo.Subscription", new[] { "ModifierId" });
            DropIndex("dbo.Subscription", new[] { "CreatorId" });
            DropIndex("dbo.Subscription", new[] { "ApplicationUserId" });
            DropIndex("dbo.Roles", "RoleNameIndex");
            DropIndex("dbo.Image", new[] { "RemoverId" });
            DropIndex("dbo.Image", new[] { "ModifierId" });
            DropIndex("dbo.Image", new[] { "CreatorId" });
            DropIndex("dbo.Feature", new[] { "RemoverId" });
            DropIndex("dbo.Feature", new[] { "ModifierId" });
            DropIndex("dbo.Feature", new[] { "CreatorId" });
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.UserRoles", new[] { "UserId" });
            DropIndex("dbo.UserLogins", new[] { "UserId" });
            DropIndex("dbo.UserContactInfoes", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.UserClaims", new[] { "UserId" });
            DropIndex("dbo.Users", "UserNameIndex");
            DropIndex("dbo.ClassificationType", new[] { "RemoverId" });
            DropIndex("dbo.ClassificationType", new[] { "ModifierId" });
            DropIndex("dbo.ClassificationType", new[] { "CreatorId" });
            DropIndex("dbo.Classification", new[] { "RemoverId" });
            DropIndex("dbo.Classification", new[] { "ModifierId" });
            DropIndex("dbo.Classification", new[] { "CreatorId" });
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
            DropTable("dbo.UserContactInfoes");
            DropTable("dbo.UserClaims");
            DropTable("dbo.Users");
            DropTable("dbo.ClassificationType");
            DropTable("dbo.Classification");
        }
    }
}
