using System.Data.Entity.Migrations;

namespace Triven.Data.EntityFramework.Migrations
{
    public partial class PartnerUserForeignKey : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Partner", "UserId_FK", c => c.Int(nullable: false));
            CreateIndex("dbo.Partner", "UserId_FK");
            AddForeignKey("dbo.Partner", "UserId_FK", "dbo.Users", "Id", cascadeDelete: false);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Partner", "UserId_FK", "dbo.Users");
            DropIndex("dbo.Partner", new[] { "UserId_FK" });
            DropColumn("dbo.Partner", "UserId_FK");
        }
    }
}
