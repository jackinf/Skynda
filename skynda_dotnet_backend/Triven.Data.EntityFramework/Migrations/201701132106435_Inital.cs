namespace X3Project.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Inital : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AssignmentAddressModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AssignmentId_FK = c.Int(nullable: false),
                        Street = c.String(),
                        City = c.String(),
                        ZipCode = c.String(),
                        Country = c.String(),
                        Longitude = c.String(),
                        Latitude = c.String(),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AssignmentModels", t => t.AssignmentId_FK, cascadeDelete: true)
                .Index(t => t.AssignmentId_FK);
            
            CreateTable(
                "dbo.AssignmentModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EarliestPickupDate = c.DateTime(nullable: false),
                        LatestPickupDate = c.DateTime(),
                        EarliestDeliveryDate = c.DateTime(),
                        LatestDeliveryDate = c.DateTime(),
                        PickupStartedAt = c.DateTime(),
                        PickupCompleatedAt = c.DateTime(),
                        DeliveryStartedAt = c.DateTime(),
                        DeliveryCompleatedAt = c.DateTime(),
                        WeightInKg = c.String(),
                        VolumeInM3 = c.String(),
                        LoadMeters = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        PickupRank = c.Int(nullable: false),
                        DeliveryRank = c.Int(nullable: false),
                        Status = c.String(),
                        AssignmentProcess = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        UpdatedBy = c.Int(nullable: false),
                        DeletedBy = c.Int(nullable: false),
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
                        Status = c.Int(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
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
                "dbo.PartnerUsers",
                c => new
                    {
                        PartnerId_FK = c.Int(nullable: false),
                        UserId_FK = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.PartnerId_FK, t.UserId_FK })
                .ForeignKey("dbo.Partner", t => t.PartnerId_FK, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId_FK, cascadeDelete: true)
                .Index(t => t.PartnerId_FK)
                .Index(t => t.UserId_FK);
            
            CreateTable(
                "dbo.Partner",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CompanyName = c.String(),
                        VatNumber = c.String(),
                        Address = c.String(),
                        ZipCode = c.String(),
                        Country = c.String(),
                        InvoicingAddress = c.String(),
                        Iban = c.String(),
                        Bic = c.String(),
                        PrimaryEmail = c.String(),
                        PrimaryPhone = c.String(),
                        IsActive = c.Boolean(nullable: false),
                        Status = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        UpdatedBy = c.Int(nullable: false),
                        DeletedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.PartnerContactPersonModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PartnerId_FK = c.Int(nullable: false),
                        IsCeo = c.Boolean(nullable: false),
                        Job = c.String(),
                        Status = c.Int(nullable: false),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        UpdatedBy = c.Int(nullable: false),
                        DeletedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .ForeignKey("dbo.Partner", t => t.PartnerId_FK, cascadeDelete: true)
                .Index(t => t.PartnerId_FK)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.Vehicle",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PartnerId_FK = c.Int(nullable: false),
                        RegNumber = c.String(),
                        PhoneNumber = c.String(),
                        Type = c.String(),
                        EurClass = c.String(),
                        RegistrationCountry = c.String(),
                        PassengerCapacity = c.Int(nullable: false),
                        LoadCapacity = c.String(),
                        CargoLength = c.Decimal(nullable: false, precision: 18, scale: 2),
                        CargoWidth = c.Decimal(nullable: false, precision: 18, scale: 2),
                        CargoHeight = c.Decimal(nullable: false, precision: 18, scale: 2),
                        BoxOrCurtain = c.String(),
                        SideOpen = c.Boolean(nullable: false),
                        RoofOpen = c.Boolean(nullable: false),
                        CoolType = c.Boolean(nullable: false),
                        TailLifter = c.Boolean(nullable: false),
                        Status = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        UpdatedBy = c.Int(nullable: false),
                        DeletedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .ForeignKey("dbo.Partner", t => t.PartnerId_FK, cascadeDelete: true)
                .Index(t => t.PartnerId_FK)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.VehicleProperyModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VechicleId_FK = c.Int(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Vehicle", t => t.VechicleId_FK, cascadeDelete: true)
                .Index(t => t.VechicleId_FK);
            
            CreateTable(
                "dbo.AssignmentPalletModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AssignmentId_FK = c.Int(nullable: false),
                        Amount = c.Int(nullable: false),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AssignmentModels", t => t.AssignmentId_FK, cascadeDelete: true)
                .Index(t => t.AssignmentId_FK);
            
            CreateTable(
                "dbo.AssignmentVehicleModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AssignmentId_FK = c.Int(nullable: false),
                        VehicleId_FK = c.Int(nullable: false),
                        DriverId_FK = c.Int(nullable: false),
                        Status = c.String(),
                        UpdateOn = c.DateTime(),
                        UpdatedBy = c.Int(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.DriverModels", t => t.DriverId_FK, cascadeDelete: true)
                .ForeignKey("dbo.Vehicle", t => t.VehicleId_FK, cascadeDelete: true)
                .ForeignKey("dbo.AssignmentModels", t => t.AssignmentId_FK, cascadeDelete: true)
                .Index(t => t.AssignmentId_FK)
                .Index(t => t.VehicleId_FK)
                .Index(t => t.DriverId_FK);
            
            CreateTable(
                "dbo.DriverModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FistName = c.String(nullable: false),
                        LastName = c.String(),
                        DrivingLicenseNr = c.String(),
                        Email = c.String(),
                        Phone = c.String(),
                        Rating = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Status = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        UpdatedBy = c.Int(nullable: false),
                        DeletedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.AssignmentDriverInstructionModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AssignmentId_FK = c.Int(nullable: false),
                        Instruction = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AssignmentTransportDocumentModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AssignmentId_FK = c.Int(nullable: false),
                        IsMandatory = c.Boolean(nullable: false),
                        DocumentType = c.String(),
                        UploadedOn = c.DateTime(nullable: false),
                        IsValid = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AssignmentModels", t => t.AssignmentId_FK, cascadeDelete: true)
                .Index(t => t.AssignmentId_FK);
            
            CreateTable(
                "dbo.Classification",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Parent_FK = c.Int(),
                        Status = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        UpdatedBy = c.Int(nullable: false),
                        DeletedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Classification", t => t.Parent_FK)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .Index(t => t.Parent_FK)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
            CreateTable(
                "dbo.ClassificationValue",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Classification_FK = c.Int(nullable: false),
                        Value = c.String(),
                        Position = c.Int(nullable: false),
                        ClassificationParent_FK = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Classification", t => t.Classification_FK, cascadeDelete: true)
                .Index(t => t.Classification_FK);
            
            CreateTable(
                "dbo.ClassificationValuesTranslate",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Locale = c.String(nullable: false, maxLength: 128),
                        ClassificationValue_FK = c.Int(nullable: false),
                        Text = c.String(),
                        ClassificationParent_FK = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Id, t.Locale })
                .ForeignKey("dbo.ClassificationValue", t => t.ClassificationValue_FK, cascadeDelete: true)
                .Index(t => t.ClassificationValue_FK);
            
            CreateTable(
                "dbo.PartnerContactPersonContactInfoModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PartnerContactPersonId_FK = c.Int(nullable: false),
                        Phone = c.String(),
                        Email = c.String(),
                        Address = c.String(),
                        City = c.String(),
                        Country = c.String(),
                        ZipCode = c.String(),
                        WWW = c.String(),
                        Skype = c.String(),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
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
                "dbo.TodoModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                        IsDone = c.Boolean(nullable: false),
                        Deadline = c.DateTime(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        UpdatedBy = c.Int(nullable: false),
                        DeletedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatedBy, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.UpdatedBy, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.DeletedBy, cascadeDelete: false)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRoles", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserLogins", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserClaims", "UserId", "dbo.Users");
            DropForeignKey("dbo.TodoModels", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.TodoModels", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.TodoModels", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.Roles");
            DropForeignKey("dbo.ClassificationValue", "Classification_FK", "dbo.Classification");
            DropForeignKey("dbo.ClassificationValuesTranslate", "ClassificationValue_FK", "dbo.ClassificationValue");
            DropForeignKey("dbo.Classification", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.Classification", "Parent_FK", "dbo.Classification");
            DropForeignKey("dbo.Classification", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Classification", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.AssignmentTransportDocumentModels", "AssignmentId_FK", "dbo.AssignmentModels");
            DropForeignKey("dbo.AssignmentVehicleModels", "AssignmentId_FK", "dbo.AssignmentModels");
            DropForeignKey("dbo.AssignmentVehicleModels", "VehicleId_FK", "dbo.Vehicle");
            DropForeignKey("dbo.AssignmentVehicleModels", "DriverId_FK", "dbo.DriverModels");
            DropForeignKey("dbo.DriverModels", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.DriverModels", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.DriverModels", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.AssignmentModels", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.AssignmentPalletModels", "AssignmentId_FK", "dbo.AssignmentModels");
            DropForeignKey("dbo.AssignmentModels", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.AssignmentModels", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.PartnerUsers", "UserId_FK", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "PartnerId_FK", "dbo.Partner");
            DropForeignKey("dbo.VehicleProperyModels", "VechicleId_FK", "dbo.Vehicle");
            DropForeignKey("dbo.Vehicle", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.Partner", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.PartnerUsers", "PartnerId_FK", "dbo.Partner");
            DropForeignKey("dbo.Partner", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Partner", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.PartnerContactPersonModels", "PartnerId_FK", "dbo.Partner");
            DropForeignKey("dbo.PartnerContactPersonModels", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.PartnerContactPersonModels", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.PartnerContactPersonModels", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.Users", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.Users", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Users", "CreatedBy", "dbo.Users");
            DropForeignKey("dbo.UserContactInfo", "ApplicationUserId", "dbo.Users");
            DropForeignKey("dbo.AssignmentAddressModels", "AssignmentId_FK", "dbo.AssignmentModels");
            DropIndex("dbo.TodoModels", new[] { "DeletedBy" });
            DropIndex("dbo.TodoModels", new[] { "UpdatedBy" });
            DropIndex("dbo.TodoModels", new[] { "CreatedBy" });
            DropIndex("dbo.Roles", "RoleNameIndex");
            DropIndex("dbo.ClassificationValuesTranslate", new[] { "ClassificationValue_FK" });
            DropIndex("dbo.ClassificationValue", new[] { "Classification_FK" });
            DropIndex("dbo.Classification", new[] { "DeletedBy" });
            DropIndex("dbo.Classification", new[] { "UpdatedBy" });
            DropIndex("dbo.Classification", new[] { "CreatedBy" });
            DropIndex("dbo.Classification", new[] { "Parent_FK" });
            DropIndex("dbo.AssignmentTransportDocumentModels", new[] { "AssignmentId_FK" });
            DropIndex("dbo.DriverModels", new[] { "DeletedBy" });
            DropIndex("dbo.DriverModels", new[] { "UpdatedBy" });
            DropIndex("dbo.DriverModels", new[] { "CreatedBy" });
            DropIndex("dbo.AssignmentVehicleModels", new[] { "DriverId_FK" });
            DropIndex("dbo.AssignmentVehicleModels", new[] { "VehicleId_FK" });
            DropIndex("dbo.AssignmentVehicleModels", new[] { "AssignmentId_FK" });
            DropIndex("dbo.AssignmentPalletModels", new[] { "AssignmentId_FK" });
            DropIndex("dbo.VehicleProperyModels", new[] { "VechicleId_FK" });
            DropIndex("dbo.Vehicle", new[] { "DeletedBy" });
            DropIndex("dbo.Vehicle", new[] { "UpdatedBy" });
            DropIndex("dbo.Vehicle", new[] { "CreatedBy" });
            DropIndex("dbo.Vehicle", new[] { "PartnerId_FK" });
            DropIndex("dbo.PartnerContactPersonModels", new[] { "DeletedBy" });
            DropIndex("dbo.PartnerContactPersonModels", new[] { "UpdatedBy" });
            DropIndex("dbo.PartnerContactPersonModels", new[] { "CreatedBy" });
            DropIndex("dbo.PartnerContactPersonModels", new[] { "PartnerId_FK" });
            DropIndex("dbo.Partner", new[] { "DeletedBy" });
            DropIndex("dbo.Partner", new[] { "UpdatedBy" });
            DropIndex("dbo.Partner", new[] { "CreatedBy" });
            DropIndex("dbo.PartnerUsers", new[] { "UserId_FK" });
            DropIndex("dbo.PartnerUsers", new[] { "PartnerId_FK" });
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.UserRoles", new[] { "UserId" });
            DropIndex("dbo.UserLogins", new[] { "UserId" });
            DropIndex("dbo.UserContactInfo", new[] { "ApplicationUserId" });
            DropIndex("dbo.UserClaims", new[] { "UserId" });
            DropIndex("dbo.Users", new[] { "DeletedBy" });
            DropIndex("dbo.Users", new[] { "UpdatedBy" });
            DropIndex("dbo.Users", new[] { "CreatedBy" });
            DropIndex("dbo.Users", "UserNameIndex");
            DropIndex("dbo.AssignmentModels", new[] { "DeletedBy" });
            DropIndex("dbo.AssignmentModels", new[] { "UpdatedBy" });
            DropIndex("dbo.AssignmentModels", new[] { "CreatedBy" });
            DropIndex("dbo.AssignmentAddressModels", new[] { "AssignmentId_FK" });
            DropTable("dbo.TodoModels");
            DropTable("dbo.Roles");
            DropTable("dbo.PartnerContactPersonContactInfoModels");
            DropTable("dbo.ClassificationValuesTranslate");
            DropTable("dbo.ClassificationValue");
            DropTable("dbo.Classification");
            DropTable("dbo.AssignmentTransportDocumentModels");
            DropTable("dbo.AssignmentDriverInstructionModels");
            DropTable("dbo.DriverModels");
            DropTable("dbo.AssignmentVehicleModels");
            DropTable("dbo.AssignmentPalletModels");
            DropTable("dbo.VehicleProperyModels");
            DropTable("dbo.Vehicle");
            DropTable("dbo.PartnerContactPersonModels");
            DropTable("dbo.Partner");
            DropTable("dbo.PartnerUsers");
            DropTable("dbo.UserRoles");
            DropTable("dbo.UserLogins");
            DropTable("dbo.UserContactInfo");
            DropTable("dbo.UserClaims");
            DropTable("dbo.Users");
            DropTable("dbo.AssignmentModels");
            DropTable("dbo.AssignmentAddressModels");
        }
    }
}
