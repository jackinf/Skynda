namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FoundHistoryVehicle : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Vehicle", "FoundHistory", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Vehicle", "FoundHistory");
        }
    }
}
