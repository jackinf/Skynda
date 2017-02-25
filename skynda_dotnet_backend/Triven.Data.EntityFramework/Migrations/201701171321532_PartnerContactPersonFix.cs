using System.Data.Entity.Migrations;

namespace Triven.Data.EntityFramework.Migrations
{
    public partial class PartnerContactPersonFix : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PartnerContactPersonModels", "Status", c => c.String());
            CreateIndex("dbo.PartnerContactPersonContactInfoModels", "PartnerContactPersonId_FK");
            AddForeignKey("dbo.PartnerContactPersonContactInfoModels", "PartnerContactPersonId_FK", "dbo.PartnerContactPersonModels", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PartnerContactPersonContactInfoModels", "PartnerContactPersonId_FK", "dbo.PartnerContactPersonModels");
            DropIndex("dbo.PartnerContactPersonContactInfoModels", new[] { "PartnerContactPersonId_FK" });
            AlterColumn("dbo.PartnerContactPersonModels", "Status", c => c.Int(nullable: false));
        }
    }
}
