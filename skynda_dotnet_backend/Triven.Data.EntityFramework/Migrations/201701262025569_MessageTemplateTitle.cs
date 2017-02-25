namespace X3Project.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
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
