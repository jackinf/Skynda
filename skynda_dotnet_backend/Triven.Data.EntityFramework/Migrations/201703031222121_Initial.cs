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
                        IsActive = c.Boolean(nullable: false),
                        Value2 = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        ClassificationType_Id = c.Int(),
                        Creator_Id = c.Int(),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ClassificationType", t => t.ClassificationType_Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .Index(t => t.ClassificationType_Id)
                .Index(t => t.Creator_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id);
            
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
                        ModifierUserIp = c.String(),
                        Creator_Id = c.Int(),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .Index(t => t.Creator_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id);
            
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
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
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
                        IsActive = c.Boolean(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        Creator_Id = c.Int(),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .Index(t => t.Creator_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id);
            
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
                        ModifierUserIp = c.String(),
                        Creator_Id = c.Int(),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .Index(t => t.Creator_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id);
            
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
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        ApplicationUser_Id = c.Int(),
                        Creator_Id = c.Int(),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.ApplicationUser_Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .Index(t => t.ApplicationUser_Id)
                .Index(t => t.Creator_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id);
            
            CreateTable(
                "dbo.VehicleDescription",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Content = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        Creator_Id = c.Int(),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                        Vehicle_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .ForeignKey("dbo.Vehicle", t => t.Vehicle_Id)
                .Index(t => t.Creator_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id)
                .Index(t => t.Vehicle_Id);
            
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
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        ApplicationUser_Id = c.Int(nullable: false),
                        Creator_Id = c.Int(),
                        MainImage_Id = c.Int(nullable: false),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                        VehicleModel_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.ApplicationUser_Id, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Image", t => t.MainImage_Id, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .ForeignKey("dbo.VehicleModel", t => t.VehicleModel_Id, cascadeDelete: false)
                .Index(t => t.ApplicationUser_Id)
                .Index(t => t.Creator_Id)
                .Index(t => t.MainImage_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id)
                .Index(t => t.VehicleModel_Id);
            
            CreateTable(
                "dbo.VehicleFeature",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        Creator_Id = c.Int(),
                        Feature_Id = c.Int(nullable: false),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                        Vehicle_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Feature", t => t.Feature_Id, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .ForeignKey("dbo.Vehicle", t => t.Vehicle_Id, cascadeDelete: false)
                .Index(t => t.Creator_Id)
                .Index(t => t.Feature_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id)
                .Index(t => t.Vehicle_Id);
            
            CreateTable(
                "dbo.VehicleImage",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        Creator_Id = c.Int(),
                        Image_Id = c.Int(nullable: false),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                        Vehicle_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Image", t => t.Image_Id, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .ForeignKey("dbo.Vehicle", t => t.Vehicle_Id, cascadeDelete: false)
                .Index(t => t.Creator_Id)
                .Index(t => t.Image_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id)
                .Index(t => t.Vehicle_Id);
            
            CreateTable(
                "dbo.VehicleReport",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Description = c.String(),
                        Inspector = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        Creator_Id = c.Int(),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                        Vehicle_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .ForeignKey("dbo.Vehicle", t => t.Vehicle_Id, cascadeDelete: false)
                .Index(t => t.Creator_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id)
                .Index(t => t.Vehicle_Id);
            
            CreateTable(
                "dbo.VehicleFault",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        Creator_Id = c.Int(),
                        Image_Id = c.Int(),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                        VehicleReport_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Image", t => t.Image_Id)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .ForeignKey("dbo.VehicleReport", t => t.VehicleReport_Id)
                .Index(t => t.Creator_Id)
                .Index(t => t.Image_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id)
                .Index(t => t.VehicleReport_Id);
            
            CreateTable(
                "dbo.VehicleReportItem",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsPass = c.Boolean(nullable: false),
                        Title = c.String(),
                        Text = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        Creator_Id = c.Int(),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                        Parent_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .ForeignKey("dbo.VehicleReport", t => t.Parent_Id, cascadeDelete: false)
                .Index(t => t.Creator_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id)
                .Index(t => t.Parent_Id);
            
            CreateTable(
                "dbo.VehicleReview",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LogoId = c.Int(nullable: false),
                        VideoId = c.Int(nullable: false),
                        Rating = c.Int(nullable: false),
                        Text = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        Creator_Id = c.Int(),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                        Vehicle_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .ForeignKey("dbo.Vehicle", t => t.Vehicle_Id)
                .Index(t => t.Creator_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id)
                .Index(t => t.Vehicle_Id);
            
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
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        ModifierUserIp = c.String(),
                        Creator_Id = c.Int(),
                        Drivetrain_Id = c.Int(nullable: false),
                        FuelType_Id = c.Int(nullable: false),
                        Modifier_Id = c.Int(),
                        Remover_Id = c.Int(),
                        Transmission_Id = c.Int(nullable: false),
                        VehicleBody_Id = c.Int(nullable: false),
                        VehicleManufacturer_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Classification", t => t.Drivetrain_Id, cascadeDelete: false)
                .ForeignKey("dbo.Classification", t => t.FuelType_Id, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.Modifier_Id)
                .ForeignKey("dbo.Users", t => t.Remover_Id)
                .ForeignKey("dbo.Classification", t => t.Transmission_Id, cascadeDelete: false)
                .ForeignKey("dbo.Classification", t => t.VehicleBody_Id, cascadeDelete: false)
                .ForeignKey("dbo.Classification", t => t.VehicleManufacturer_Id, cascadeDelete: false)
                .Index(t => t.Creator_Id)
                .Index(t => t.Drivetrain_Id)
                .Index(t => t.FuelType_Id)
                .Index(t => t.Modifier_Id)
                .Index(t => t.Remover_Id)
                .Index(t => t.Transmission_Id)
                .Index(t => t.VehicleBody_Id)
                .Index(t => t.VehicleManufacturer_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vehicle", "VehicleModel_Id", "dbo.VehicleModel");
            DropForeignKey("dbo.VehicleModel", "VehicleManufacturer_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "VehicleBody_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "Transmission_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleModel", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleModel", "FuelType_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "Drivetrain_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleReview", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleReview", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleReview", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleReview", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleReport", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleReportItem", "Parent_Id", "dbo.VehicleReport");
            DropForeignKey("dbo.VehicleReportItem", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleReportItem", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleReportItem", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleReport", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleReport", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleFault", "VehicleReport_Id", "dbo.VehicleReport");
            DropForeignKey("dbo.VehicleFault", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleFault", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleFault", "Image_Id", "dbo.Image");
            DropForeignKey("dbo.VehicleFault", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleReport", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "MainImage_Id", "dbo.Image");
            DropForeignKey("dbo.VehicleImage", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleImage", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleImage", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleImage", "Image_Id", "dbo.Image");
            DropForeignKey("dbo.VehicleImage", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleFeature", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleFeature", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleFeature", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleFeature", "Feature_Id", "dbo.Feature");
            DropForeignKey("dbo.VehicleFeature", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.Vehicle", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "ApplicationUser_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.VehicleDescription", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserLogins", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserClaims", "UserId", "dbo.Users");
            DropForeignKey("dbo.Subscription", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.Subscription", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.Subscription", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.Subscription", "ApplicationUser_Id", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.Roles");
            DropForeignKey("dbo.Image", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.Image", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.Image", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.Feature", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.Feature", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.Feature", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.Classification", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.Classification", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.Classification", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.ClassificationType", "Remover_Id", "dbo.Users");
            DropForeignKey("dbo.ClassificationType", "Modifier_Id", "dbo.Users");
            DropForeignKey("dbo.ClassificationType", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.UserContactInfoes", "ApplicationUser_Id", "dbo.Users");
            DropForeignKey("dbo.Classification", "ClassificationType_Id", "dbo.ClassificationType");
            DropIndex("dbo.VehicleModel", new[] { "VehicleManufacturer_Id" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleBody_Id" });
            DropIndex("dbo.VehicleModel", new[] { "Transmission_Id" });
            DropIndex("dbo.VehicleModel", new[] { "Remover_Id" });
            DropIndex("dbo.VehicleModel", new[] { "Modifier_Id" });
            DropIndex("dbo.VehicleModel", new[] { "FuelType_Id" });
            DropIndex("dbo.VehicleModel", new[] { "Drivetrain_Id" });
            DropIndex("dbo.VehicleModel", new[] { "Creator_Id" });
            DropIndex("dbo.VehicleReview", new[] { "Vehicle_Id" });
            DropIndex("dbo.VehicleReview", new[] { "Remover_Id" });
            DropIndex("dbo.VehicleReview", new[] { "Modifier_Id" });
            DropIndex("dbo.VehicleReview", new[] { "Creator_Id" });
            DropIndex("dbo.VehicleReportItem", new[] { "Parent_Id" });
            DropIndex("dbo.VehicleReportItem", new[] { "Remover_Id" });
            DropIndex("dbo.VehicleReportItem", new[] { "Modifier_Id" });
            DropIndex("dbo.VehicleReportItem", new[] { "Creator_Id" });
            DropIndex("dbo.VehicleFault", new[] { "VehicleReport_Id" });
            DropIndex("dbo.VehicleFault", new[] { "Remover_Id" });
            DropIndex("dbo.VehicleFault", new[] { "Modifier_Id" });
            DropIndex("dbo.VehicleFault", new[] { "Image_Id" });
            DropIndex("dbo.VehicleFault", new[] { "Creator_Id" });
            DropIndex("dbo.VehicleReport", new[] { "Vehicle_Id" });
            DropIndex("dbo.VehicleReport", new[] { "Remover_Id" });
            DropIndex("dbo.VehicleReport", new[] { "Modifier_Id" });
            DropIndex("dbo.VehicleReport", new[] { "Creator_Id" });
            DropIndex("dbo.VehicleImage", new[] { "Vehicle_Id" });
            DropIndex("dbo.VehicleImage", new[] { "Remover_Id" });
            DropIndex("dbo.VehicleImage", new[] { "Modifier_Id" });
            DropIndex("dbo.VehicleImage", new[] { "Image_Id" });
            DropIndex("dbo.VehicleImage", new[] { "Creator_Id" });
            DropIndex("dbo.VehicleFeature", new[] { "Vehicle_Id" });
            DropIndex("dbo.VehicleFeature", new[] { "Remover_Id" });
            DropIndex("dbo.VehicleFeature", new[] { "Modifier_Id" });
            DropIndex("dbo.VehicleFeature", new[] { "Feature_Id" });
            DropIndex("dbo.VehicleFeature", new[] { "Creator_Id" });
            DropIndex("dbo.Vehicle", new[] { "VehicleModel_Id" });
            DropIndex("dbo.Vehicle", new[] { "Remover_Id" });
            DropIndex("dbo.Vehicle", new[] { "Modifier_Id" });
            DropIndex("dbo.Vehicle", new[] { "MainImage_Id" });
            DropIndex("dbo.Vehicle", new[] { "Creator_Id" });
            DropIndex("dbo.Vehicle", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.VehicleDescription", new[] { "Vehicle_Id" });
            DropIndex("dbo.VehicleDescription", new[] { "Remover_Id" });
            DropIndex("dbo.VehicleDescription", new[] { "Modifier_Id" });
            DropIndex("dbo.VehicleDescription", new[] { "Creator_Id" });
            DropIndex("dbo.Subscription", new[] { "Remover_Id" });
            DropIndex("dbo.Subscription", new[] { "Modifier_Id" });
            DropIndex("dbo.Subscription", new[] { "Creator_Id" });
            DropIndex("dbo.Subscription", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Roles", "RoleNameIndex");
            DropIndex("dbo.Image", new[] { "Remover_Id" });
            DropIndex("dbo.Image", new[] { "Modifier_Id" });
            DropIndex("dbo.Image", new[] { "Creator_Id" });
            DropIndex("dbo.Feature", new[] { "Remover_Id" });
            DropIndex("dbo.Feature", new[] { "Modifier_Id" });
            DropIndex("dbo.Feature", new[] { "Creator_Id" });
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.UserRoles", new[] { "UserId" });
            DropIndex("dbo.UserLogins", new[] { "UserId" });
            DropIndex("dbo.UserContactInfoes", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.UserClaims", new[] { "UserId" });
            DropIndex("dbo.Users", "UserNameIndex");
            DropIndex("dbo.ClassificationType", new[] { "Remover_Id" });
            DropIndex("dbo.ClassificationType", new[] { "Modifier_Id" });
            DropIndex("dbo.ClassificationType", new[] { "Creator_Id" });
            DropIndex("dbo.Classification", new[] { "Remover_Id" });
            DropIndex("dbo.Classification", new[] { "Modifier_Id" });
            DropIndex("dbo.Classification", new[] { "Creator_Id" });
            DropIndex("dbo.Classification", new[] { "ClassificationType_Id" });
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
