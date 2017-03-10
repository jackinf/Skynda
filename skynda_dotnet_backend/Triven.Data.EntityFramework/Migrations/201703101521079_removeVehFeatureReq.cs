namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removeVehFeatureReq : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.VehicleFeature", "Vehicle_Id", "dbo.Vehicle");
            DropForeignKey("dbo.VehicleFeature", "Feature_Id", "dbo.Feature");
            DropIndex("dbo.VehicleFeature", new[] { "Feature_Id" });
            DropIndex("dbo.VehicleFeature", new[] { "Vehicle_Id" });
            AlterColumn("dbo.VehicleFeature", "Feature_Id", c => c.Int());
            AlterColumn("dbo.VehicleFeature", "Vehicle_Id", c => c.Int());
            CreateIndex("dbo.VehicleFeature", "Feature_Id");
            CreateIndex("dbo.VehicleFeature", "Vehicle_Id");
            AddForeignKey("dbo.VehicleFeature", "Vehicle_Id", "dbo.Vehicle", "Id");
            AddForeignKey("dbo.VehicleFeature", "Feature_Id", "dbo.Feature", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.VehicleFeature", "Feature_Id", "dbo.Feature");
            DropForeignKey("dbo.VehicleFeature", "Vehicle_Id", "dbo.Vehicle");
            DropIndex("dbo.VehicleFeature", new[] { "Vehicle_Id" });
            DropIndex("dbo.VehicleFeature", new[] { "Feature_Id" });
            AlterColumn("dbo.VehicleFeature", "Vehicle_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.VehicleFeature", "Feature_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.VehicleFeature", "Vehicle_Id");
            CreateIndex("dbo.VehicleFeature", "Feature_Id");
            AddForeignKey("dbo.VehicleFeature", "Feature_Id", "dbo.Feature", "Id", cascadeDelete: true);
            AddForeignKey("dbo.VehicleFeature", "Vehicle_Id", "dbo.Vehicle", "Id", cascadeDelete: true);
        }
    }
}
