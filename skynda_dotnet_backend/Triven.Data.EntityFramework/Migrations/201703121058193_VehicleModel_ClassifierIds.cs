namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class VehicleModel_ClassifierIds : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.VehicleModel", new[] { "Drivetrain_Id" });
            DropIndex("dbo.VehicleModel", new[] { "FuelType_Id" });
            DropIndex("dbo.VehicleModel", new[] { "Transmission_Id" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleBody_Id" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleManufacturer_Id" });
            RenameColumn(table: "dbo.VehicleModel", name: "Drivetrain_Id", newName: "DrivetrainId");
            RenameColumn(table: "dbo.VehicleModel", name: "FuelType_Id", newName: "FuelTypeId");
            RenameColumn(table: "dbo.VehicleModel", name: "Transmission_Id", newName: "TransmissionId");
            RenameColumn(table: "dbo.VehicleModel", name: "VehicleBody_Id", newName: "VehicleBodyId");
            RenameColumn(table: "dbo.VehicleModel", name: "VehicleManufacturer_Id", newName: "VehicleManufacturerId");
            AlterColumn("dbo.VehicleModel", "DrivetrainId", c => c.Int(nullable: false));
            AlterColumn("dbo.VehicleModel", "FuelTypeId", c => c.Int(nullable: false));
            AlterColumn("dbo.VehicleModel", "TransmissionId", c => c.Int(nullable: false));
            AlterColumn("dbo.VehicleModel", "VehicleBodyId", c => c.Int(nullable: false));
            AlterColumn("dbo.VehicleModel", "VehicleManufacturerId", c => c.Int(nullable: false));
            CreateIndex("dbo.VehicleModel", "VehicleManufacturerId");
            CreateIndex("dbo.VehicleModel", "TransmissionId");
            CreateIndex("dbo.VehicleModel", "DrivetrainId");
            CreateIndex("dbo.VehicleModel", "VehicleBodyId");
            CreateIndex("dbo.VehicleModel", "FuelTypeId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.VehicleModel", new[] { "FuelTypeId" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleBodyId" });
            DropIndex("dbo.VehicleModel", new[] { "DrivetrainId" });
            DropIndex("dbo.VehicleModel", new[] { "TransmissionId" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleManufacturerId" });
            AlterColumn("dbo.VehicleModel", "VehicleManufacturerId", c => c.Int());
            AlterColumn("dbo.VehicleModel", "VehicleBodyId", c => c.Int());
            AlterColumn("dbo.VehicleModel", "TransmissionId", c => c.Int());
            AlterColumn("dbo.VehicleModel", "FuelTypeId", c => c.Int());
            AlterColumn("dbo.VehicleModel", "DrivetrainId", c => c.Int());
            RenameColumn(table: "dbo.VehicleModel", name: "VehicleManufacturerId", newName: "VehicleManufacturer_Id");
            RenameColumn(table: "dbo.VehicleModel", name: "VehicleBodyId", newName: "VehicleBody_Id");
            RenameColumn(table: "dbo.VehicleModel", name: "TransmissionId", newName: "Transmission_Id");
            RenameColumn(table: "dbo.VehicleModel", name: "FuelTypeId", newName: "FuelType_Id");
            RenameColumn(table: "dbo.VehicleModel", name: "DrivetrainId", newName: "Drivetrain_Id");
            CreateIndex("dbo.VehicleModel", "VehicleManufacturer_Id");
            CreateIndex("dbo.VehicleModel", "VehicleBody_Id");
            CreateIndex("dbo.VehicleModel", "Transmission_Id");
            CreateIndex("dbo.VehicleModel", "FuelType_Id");
            CreateIndex("dbo.VehicleModel", "Drivetrain_Id");
        }
    }
}
