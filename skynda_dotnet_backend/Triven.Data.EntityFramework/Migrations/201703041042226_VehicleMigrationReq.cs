namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class VehicleMigrationReq : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Vehicle", "ApplicationUser_Id", "dbo.Users");
            DropForeignKey("dbo.Vehicle", "MainImage_Id", "dbo.Image");
            DropForeignKey("dbo.Vehicle", "VehicleModel_Id", "dbo.VehicleModel");
            DropIndex("dbo.Vehicle", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Vehicle", new[] { "MainImage_Id" });
            DropIndex("dbo.Vehicle", new[] { "VehicleModel_Id" });
            AlterColumn("dbo.Vehicle", "VinCode", c => c.String());
            AlterColumn("dbo.Vehicle", "RegistrationNumber", c => c.String());
            AlterColumn("dbo.Vehicle", "ColorOutsideHex", c => c.String());
            AlterColumn("dbo.Vehicle", "ApplicationUser_Id", c => c.Int());
            AlterColumn("dbo.Vehicle", "MainImage_Id", c => c.Int());
            AlterColumn("dbo.Vehicle", "VehicleModel_Id", c => c.Int());
            CreateIndex("dbo.Vehicle", "ApplicationUser_Id");
            CreateIndex("dbo.Vehicle", "MainImage_Id");
            CreateIndex("dbo.Vehicle", "VehicleModel_Id");
            AddForeignKey("dbo.Vehicle", "ApplicationUser_Id", "dbo.Users", "Id");
            AddForeignKey("dbo.Vehicle", "MainImage_Id", "dbo.Image", "Id");
            AddForeignKey("dbo.Vehicle", "VehicleModel_Id", "dbo.VehicleModel", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vehicle", "VehicleModel_Id", "dbo.VehicleModel");
            DropForeignKey("dbo.Vehicle", "MainImage_Id", "dbo.Image");
            DropForeignKey("dbo.Vehicle", "ApplicationUser_Id", "dbo.Users");
            DropIndex("dbo.Vehicle", new[] { "VehicleModel_Id" });
            DropIndex("dbo.Vehicle", new[] { "MainImage_Id" });
            DropIndex("dbo.Vehicle", new[] { "ApplicationUser_Id" });
            AlterColumn("dbo.Vehicle", "VehicleModel_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Vehicle", "MainImage_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Vehicle", "ApplicationUser_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Vehicle", "ColorOutsideHex", c => c.String(nullable: false));
            AlterColumn("dbo.Vehicle", "RegistrationNumber", c => c.String(nullable: false));
            AlterColumn("dbo.Vehicle", "VinCode", c => c.String(nullable: false));
            CreateIndex("dbo.Vehicle", "VehicleModel_Id");
            CreateIndex("dbo.Vehicle", "MainImage_Id");
            CreateIndex("dbo.Vehicle", "ApplicationUser_Id");
            AddForeignKey("dbo.Vehicle", "VehicleModel_Id", "dbo.VehicleModel", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Vehicle", "MainImage_Id", "dbo.Image", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Vehicle", "ApplicationUser_Id", "dbo.Users", "Id", cascadeDelete: true);
        }
    }
}
