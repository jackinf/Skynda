namespace X3Project.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
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
