using System.Data.Entity.Migrations;

namespace Triven.Data.EntityFramework.Migrations
{
    public partial class MessageTemplateTitle : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.MessageTemplate", "Title", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.MessageTemplate", "Title");
        }
    }
}
