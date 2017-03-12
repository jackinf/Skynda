namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class VehicleReport_VehicleReview_VehicleId : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.VehicleReview", new[] { "Vehicle_Id" });
            RenameColumn(table: "dbo.VehicleReport", name: "Vehicle_Id", newName: "VehicleId");
            RenameColumn(table: "dbo.VehicleReview", name: "Vehicle_Id", newName: "VehicleId");
            RenameIndex(table: "dbo.VehicleReport", name: "IX_Vehicle_Id", newName: "IX_VehicleId");
            AlterColumn("dbo.VehicleReview", "VehicleId", c => c.Int(nullable: false));
            CreateIndex("dbo.VehicleReview", "VehicleId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.VehicleReview", new[] { "VehicleId" });
            AlterColumn("dbo.VehicleReview", "VehicleId", c => c.Int());
            RenameIndex(table: "dbo.VehicleReport", name: "IX_VehicleId", newName: "IX_Vehicle_Id");
            RenameColumn(table: "dbo.VehicleReview", name: "VehicleId", newName: "Vehicle_Id");
            RenameColumn(table: "dbo.VehicleReport", name: "VehicleId", newName: "Vehicle_Id");
            CreateIndex("dbo.VehicleReview", "Vehicle_Id");
        }
    }
}
