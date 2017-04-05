namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class More_generic_vehicle_model : DbMigration
    {
        public override void Up()
        {
            Sql("ALTER TABLE dbo.VehicleModel DROP CONSTRAINT [FK_dbo.VehicleModel_dbo.Classification_Transmission_Id]");
            Sql("ALTER TABLE dbo.VehicleModel DROP CONSTRAINT [FK_dbo.VehicleModel_dbo.Classification_FuelType_Id]");
            DropForeignKey("dbo.VehicleModel", "FuelTypeId", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "TransmissionId", "dbo.Classification");
            DropIndex("dbo.VehicleModel", new[] { "TransmissionId" });
            DropIndex("dbo.VehicleModel", new[] { "FuelTypeId" });
            DropColumn("dbo.VehicleModel", "Title");
            DropColumn("dbo.VehicleModel", "HorsePower");
            DropColumn("dbo.VehicleModel", "Engine");
            DropColumn("dbo.VehicleModel", "Year");
            DropColumn("dbo.VehicleModel", "TransmissionId");
            DropColumn("dbo.VehicleModel", "FuelTypeId");
            AddColumn("dbo.Vehicle", "HorsePower", c => c.Int(nullable: false));
            AddColumn("dbo.Vehicle", "Engine", c => c.String());
            AddColumn("dbo.Vehicle", "Year", c => c.Int(nullable: false));
            AddColumn("dbo.Vehicle", "TransmissionId", c => c.Int(nullable: false));
            AddColumn("dbo.Vehicle", "FuelTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.Vehicle", "TransmissionId");
            CreateIndex("dbo.Vehicle", "FuelTypeId");
            AddForeignKey("dbo.Vehicle", "FuelTypeId", "dbo.Classification", "Id", cascadeDelete: false);
            AddForeignKey("dbo.Vehicle", "TransmissionId", "dbo.Classification", "Id", cascadeDelete: false);
        }
        
        public override void Down()
        {
            AddColumn("dbo.VehicleModel", "FuelTypeId", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleModel", "TransmissionId", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleModel", "Year", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleModel", "Engine", c => c.String());
            AddColumn("dbo.VehicleModel", "HorsePower", c => c.Int(nullable: false));
            AddColumn("dbo.VehicleModel", "Title", c => c.String());
            DropForeignKey("dbo.Vehicle", "TransmissionId", "dbo.Classification");
            DropForeignKey("dbo.Vehicle", "FuelTypeId", "dbo.Classification");
            DropIndex("dbo.Vehicle", new[] { "FuelTypeId" });
            DropIndex("dbo.Vehicle", new[] { "TransmissionId" });
            DropColumn("dbo.Vehicle", "FuelTypeId");
            DropColumn("dbo.Vehicle", "TransmissionId");
            DropColumn("dbo.Vehicle", "Year");
            DropColumn("dbo.Vehicle", "Engine");
            DropColumn("dbo.Vehicle", "HorsePower");
            CreateIndex("dbo.VehicleModel", "FuelTypeId");
            CreateIndex("dbo.VehicleModel", "TransmissionId");
            AddForeignKey("dbo.VehicleModel", "TransmissionId", "dbo.Classification", "Id", cascadeDelete: false);
            AddForeignKey("dbo.VehicleModel", "FuelTypeId", "dbo.Classification", "Id", cascadeDelete: false);
        }
    }
}
