namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Vehicle_VehicleStatus : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Vehicle", "VehicleStatus", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Vehicle", "VehicleStatus");
        }
    }
}
