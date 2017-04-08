namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class temp_url_fields_for_reviews : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.VehicleReview", "VideoUrl", c => c.String());
            AddColumn("dbo.VehicleReview", "LogoUrl", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.VehicleReview", "LogoUrl");
            DropColumn("dbo.VehicleReview", "VideoUrl");
        }
    }
}
