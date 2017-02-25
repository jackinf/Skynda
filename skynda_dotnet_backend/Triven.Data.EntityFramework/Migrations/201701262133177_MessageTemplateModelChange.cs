using System.Data.Entity.Migrations;

namespace Triven.Data.EntityFramework.Migrations
{
    public partial class MessageTemplateModelChange : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.MessageTemplate");
            AddPrimaryKey("dbo.MessageTemplate", new[] { "Id", "Name", "Locale" });
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.MessageTemplate");
            AddPrimaryKey("dbo.MessageTemplate", new[] { "Name", "Locale" });
        }
    }
}
