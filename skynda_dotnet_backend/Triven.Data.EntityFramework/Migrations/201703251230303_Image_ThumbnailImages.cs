namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Image_ThumbnailImages : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Image", "ThumbnailUrl", c => c.String());
            AddColumn("dbo.Image", "ThumbnailBlobName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Image", "ThumbnailBlobName");
            DropColumn("dbo.Image", "ThumbnailUrl");
        }
    }
}
