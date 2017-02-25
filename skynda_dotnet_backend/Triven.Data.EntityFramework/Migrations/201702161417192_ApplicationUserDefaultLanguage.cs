using System.Data.Entity.Migrations;

namespace Triven.Data.EntityFramework.Migrations
{
    public partial class ApplicationUserDefaultLanguage : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "DefaultLanguage", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "DefaultLanguage");
        }
    }
}
