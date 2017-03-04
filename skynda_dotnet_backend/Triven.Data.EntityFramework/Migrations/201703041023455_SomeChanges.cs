namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SomeChanges : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.VehicleModel", "Drivetrain_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "FuelType_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "Transmission_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "VehicleBody_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "VehicleManufacturer_Id", "dbo.Classification");
            DropIndex("dbo.VehicleModel", new[] { "Drivetrain_Id" });
            DropIndex("dbo.VehicleModel", new[] { "FuelType_Id" });
            DropIndex("dbo.VehicleModel", new[] { "Transmission_Id" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleBody_Id" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleManufacturer_Id" });
            AlterColumn("dbo.VehicleModel", "ModelCode", c => c.String());
            AlterColumn("dbo.VehicleModel", "Engine", c => c.String());
            AlterColumn("dbo.VehicleModel", "Drivetrain_Id", c => c.Int());
            AlterColumn("dbo.VehicleModel", "FuelType_Id", c => c.Int());
            AlterColumn("dbo.VehicleModel", "Transmission_Id", c => c.Int());
            AlterColumn("dbo.VehicleModel", "VehicleBody_Id", c => c.Int());
            AlterColumn("dbo.VehicleModel", "VehicleManufacturer_Id", c => c.Int());
            CreateIndex("dbo.VehicleModel", "Drivetrain_Id");
            CreateIndex("dbo.VehicleModel", "FuelType_Id");
            CreateIndex("dbo.VehicleModel", "Transmission_Id");
            CreateIndex("dbo.VehicleModel", "VehicleBody_Id");
            CreateIndex("dbo.VehicleModel", "VehicleManufacturer_Id");
            AddForeignKey("dbo.VehicleModel", "Drivetrain_Id", "dbo.Classification", "Id");
            AddForeignKey("dbo.VehicleModel", "FuelType_Id", "dbo.Classification", "Id");
            AddForeignKey("dbo.VehicleModel", "Transmission_Id", "dbo.Classification", "Id");
            AddForeignKey("dbo.VehicleModel", "VehicleBody_Id", "dbo.Classification", "Id");
            AddForeignKey("dbo.VehicleModel", "VehicleManufacturer_Id", "dbo.Classification", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.VehicleModel", "VehicleManufacturer_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "VehicleBody_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "Transmission_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "FuelType_Id", "dbo.Classification");
            DropForeignKey("dbo.VehicleModel", "Drivetrain_Id", "dbo.Classification");
            DropIndex("dbo.VehicleModel", new[] { "VehicleManufacturer_Id" });
            DropIndex("dbo.VehicleModel", new[] { "VehicleBody_Id" });
            DropIndex("dbo.VehicleModel", new[] { "Transmission_Id" });
            DropIndex("dbo.VehicleModel", new[] { "FuelType_Id" });
            DropIndex("dbo.VehicleModel", new[] { "Drivetrain_Id" });
            AlterColumn("dbo.VehicleModel", "VehicleManufacturer_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.VehicleModel", "VehicleBody_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.VehicleModel", "Transmission_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.VehicleModel", "FuelType_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.VehicleModel", "Drivetrain_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.VehicleModel", "Engine", c => c.String(nullable: false));
            AlterColumn("dbo.VehicleModel", "ModelCode", c => c.String(nullable: false));
            CreateIndex("dbo.VehicleModel", "VehicleManufacturer_Id");
            CreateIndex("dbo.VehicleModel", "VehicleBody_Id");
            CreateIndex("dbo.VehicleModel", "Transmission_Id");
            CreateIndex("dbo.VehicleModel", "FuelType_Id");
            CreateIndex("dbo.VehicleModel", "Drivetrain_Id");
            AddForeignKey("dbo.VehicleModel", "VehicleManufacturer_Id", "dbo.Classification", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleModel", "VehicleBody_Id", "dbo.Classification", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleModel", "Transmission_Id", "dbo.Classification", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleModel", "FuelType_Id", "dbo.Classification", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleModel", "Drivetrain_Id", "dbo.Classification", "Id", cascadeDelete: true);
        }
    }
}
