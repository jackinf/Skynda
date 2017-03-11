namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RequiredVehicleImgREMOVE : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.VehicleImage", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleImage", "Image_Id", "dbo.Image");
            DropIndex("dbo.VehicleImage", new[] { "Image_Id" });
            DropIndex("dbo.VehicleImage", new[] { "Vehicle_Id" });
            AlterColumn("dbo.VehicleImage", "Image_Id", c => c.Int());
            AlterColumn("dbo.VehicleImage", "Vehicle_Id", c => c.Int());
            CreateIndex("dbo.VehicleImage", "Image_Id");
            CreateIndex("dbo.VehicleImage", "Vehicle_Id");
            AddForeignKey("dbo.VehicleImage", "Vehicle_Id", "dbo.Vehicle", "Id");
            AddForeignKey("dbo.VehicleImage", "Image_Id", "dbo.Image", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.VehicleImage", "Image_Id", "dbo.Image");
            DropForeignKey("dbo.VehicleImage", "Vehicle_Id", "dbo.Vehicle");
            DropIndex("dbo.VehicleImage", new[] { "Vehicle_Id" });
            DropIndex("dbo.VehicleImage", new[] { "Image_Id" });
            AlterColumn("dbo.VehicleImage", "Vehicle_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.VehicleImage", "Image_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.VehicleImage", "Vehicle_Id");
            CreateIndex("dbo.VehicleImage", "Image_Id");
            AddForeignKey("dbo.VehicleImage", "Image_Id", "dbo.Image", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleImage", "Vehicle_Id", "dbo.Vehicle", "Id", cascadeDelete: true);
        }
    }
}
