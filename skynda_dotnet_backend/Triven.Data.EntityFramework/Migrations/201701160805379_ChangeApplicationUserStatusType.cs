using System.Data.Entity.Migrations;

namespace Triven.Data.EntityFramework.Migrations
{
    public partial class ChangeApplicationUserStatusType : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Users", "Status", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Users", "Status", c => c.Int());
        }
    }
}
