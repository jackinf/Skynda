namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FixDomainInterfaceEntitiesCrap : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Classification", "ClassificationType_Id", c => c.Int());
            AddColumn("dbo.Subscription", "ApplicationUser_Id", c => c.Int());
            AddColumn("dbo.VehicleDescription", "Vehicle_Id", c => c.Int());
            AddColumn("dbo.VehicleFault", "Image_Id", c => c.Int());
            AddColumn("dbo.VehicleFault", "VehicleReport_Id", c => c.Int());
            AddColumn("dbo.VehicleFeature", "Feature_Id", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleFeature", "Vehicle_Id", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleImage", "Image_Id", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleImage", "Vehicle_Id", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleModel", "Drivetrain_Id", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleModel", "FuelType_Id", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleModel", "Transmission_Id", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleModel", "VehicleBody_Id", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleModel", "VehicleManufacturer_Id", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleReportItem", "Parent_Id", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleReport", "Vehicle_Id", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleReview", "Vehicle_Id", c => c.Int());
            AddColumn("dbo.Vehicle", "ApplicationUser_Id", c => c.Int(nullable: false));
            AddColumn("dbo.Vehicle", "MainImage_Id", c => c.Int(nullable: false));
            AddColumn("dbo.Vehicle", "VehicleModel_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.Classification", "ClassificationType_Id");
            CreateIndex("dbo.Subscription", "ApplicationUser_Id");
            CreateIndex("dbo.VehicleDescription", "Vehicle_Id");
            CreateIndex("dbo.Vehicle", "ApplicationUser_Id");
            CreateIndex("dbo.Vehicle", "MainImage_Id");
            CreateIndex("dbo.Vehicle", "VehicleModel_Id");
            CreateIndex("dbo.VehicleFeature", "Feature_Id");
            CreateIndex("dbo.VehicleFeature", "Vehicle_Id");
            CreateIndex("dbo.VehicleImage", "Image_Id");
            CreateIndex("dbo.VehicleImage", "Vehicle_Id");
            CreateIndex("dbo.VehicleReport", "Vehicle_Id");
            CreateIndex("dbo.VehicleFault", "Image_Id");
            CreateIndex("dbo.VehicleFault", "VehicleReport_Id");
            CreateIndex("dbo.VehicleReportItem", "Parent_Id");
            CreateIndex("dbo.VehicleReview", "Vehicle_Id");
            CreateIndex("dbo.VehicleModel", "Drivetrain_Id");
            CreateIndex("dbo.VehicleModel", "FuelType_Id");
            CreateIndex("dbo.VehicleModel", "Transmission_Id");
            CreateIndex("dbo.VehicleModel", "VehicleBody_Id");
            CreateIndex("dbo.VehicleModel", "VehicleManufacturer_Id");
            AddForeignKey("dbo.Classification", "ClassificationType_Id", "dbo.ClassificationType", "Id");
            AddForeignKey("dbo.Subscription", "ApplicationUser_Id", "dbo.Users", "Id");
            AddForeignKey("dbo.Vehicle", "ApplicationUser_Id", "dbo.Users", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleDescription", "Vehicle_Id", "dbo.Vehicle", "Id");
            AddForeignKey("dbo.VehicleFeature", "Feature_Id", "dbo.Feature", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleFeature", "Vehicle_Id", "dbo.Vehicle", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleImage", "Image_Id", "dbo.Image", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleImage", "Vehicle_Id", "dbo.Vehicle", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Vehicle", "MainImage_Id", "dbo.Image", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleFault", "Image_Id", "dbo.Image", "Id");
            AddForeignKey("dbo.VehicleFault", "VehicleReport_Id", "dbo.VehicleReport", "Id");
            AddForeignKey("dbo.VehicleReportItem", "Parent_Id", "dbo.VehicleReport", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleReport", "Vehicle_Id", "dbo.Vehicle", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleReview", "Vehicle_Id", "dbo.Vehicle", "Id");
            AddForeignKey("dbo.VehicleModel", "Drivetrain_Id", "dbo.Classification", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleModel", "FuelType_Id", "dbo.Classification", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleModel", "Transmission_Id", "dbo.Classification", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleModel", "VehicleBody_Id", "dbo.Classification", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleModel", "VehicleManufacturer_Id", "dbo.Classification", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Vehicle", "VehicleModel_Id", "dbo.VehicleModel", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vehicle", "VehicleModel_Id", "dbo.VehicleModel");
            DropForeignKey("dbo.VehicleModel", "VehicleManufacturer_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "VehicleBody_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "Transmission_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "FuelType_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "Drivetrain_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleReview", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleReport", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleReportItem", "Parent_Id", "dbo.VehicleReport");
            DropForeignKey("dbo.VehicleFault", "VehicleReport_Id", "dbo.VehicleReport");
            DropForeignKey("dbo.VehicleFault", "Image_Id", "dbo.Image");
            DropForeignKey("dbo.Vehicle", "MainImage_Id", "dbo.Image");
            DropForeignKey("dbo.VehicleImage", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleImage", "Image_Id", "dbo.Image");
            DropForeignKey("dbo.VehicleFeature", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleFeature", "Feature_Id", "dbo.Feature");
            DropForeignKey("dbo.VehicleDescription", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.Vehicle", "ApplicationUser_Id", "dbo.Users");
            DropForeignKey("dbo.Subscription", "ApplicationUser_Id", "dbo.Users");
            DropForeignKey("dbo.Classification", "ClassificationType_Id", "dbo.ClassificationType");
            DropIndex("dbo.VehicleModel", new[] { "VehicleManufacturer_Id" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleBody_Id" });
            DropIndex("dbo.VehicleModel", new[] { "Transmission_Id" });
            DropIndex("dbo.VehicleModel", new[] { "FuelType_Id" });
            DropIndex("dbo.VehicleModel", new[] { "Drivetrain_Id" });
            DropIndex("dbo.VehicleReview", new[] { "Vehicle_Id" });
            DropIndex("dbo.VehicleReportItem", new[] { "Parent_Id" });
            DropIndex("dbo.VehicleFault", new[] { "VehicleReport_Id" });
            DropIndex("dbo.VehicleFault", new[] { "Image_Id" });
            DropIndex("dbo.VehicleReport", new[] { "Vehicle_Id" });
            DropIndex("dbo.VehicleImage", new[] { "Vehicle_Id" });
            DropIndex("dbo.VehicleImage", new[] { "Image_Id" });
            DropIndex("dbo.VehicleFeature", new[] { "Vehicle_Id" });
            DropIndex("dbo.VehicleFeature", new[] { "Feature_Id" });
            DropIndex("dbo.Vehicle", new[] { "VehicleModel_Id" });
            DropIndex("dbo.Vehicle", new[] { "MainImage_Id" });
            DropIndex("dbo.Vehicle", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.VehicleDescription", new[] { "Vehicle_Id" });
            DropIndex("dbo.Subscription", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Classification", new[] { "ClassificationType_Id" });
            DropColumn("dbo.Vehicle", "VehicleModel_Id");
            DropColumn("dbo.Vehicle", "MainImage_Id");
            DropColumn("dbo.Vehicle", "ApplicationUser_Id");
            DropColumn("dbo.VehicleReview", "Vehicle_Id");
            DropColumn("dbo.VehicleReport", "Vehicle_Id");
            DropColumn("dbo.VehicleReportItem", "Parent_Id");
            DropColumn("dbo.VehicleModel", "VehicleManufacturer_Id");
            DropColumn("dbo.VehicleModel", "VehicleBody_Id");
            DropColumn("dbo.VehicleModel", "Transmission_Id");
            DropColumn("dbo.VehicleModel", "FuelType_Id");
            DropColumn("dbo.VehicleModel", "Drivetrain_Id");
            DropColumn("dbo.VehicleImage", "Vehicle_Id");
            DropColumn("dbo.VehicleImage", "Image_Id");
            DropColumn("dbo.VehicleFeature", "Vehicle_Id");
            DropColumn("dbo.VehicleFeature", "Feature_Id");
            DropColumn("dbo.VehicleFault", "VehicleReport_Id");
            DropColumn("dbo.VehicleFault", "Image_Id");
            DropColumn("dbo.VehicleDescription", "Vehicle_Id");
            DropColumn("dbo.Subscription", "ApplicationUser_Id");
            DropColumn("dbo.Classification", "ClassificationType_Id");
        }
    }
}
