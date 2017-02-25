namespace X3Project.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PartnerContactPersonNamesFix : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PartnerContactPersonModels", "FirstName", c => c.String());
            AddColumn("dbo.PartnerContactPersonModels", "LastName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.PartnerContactPersonModels", "LastName");
            DropColumn("dbo.PartnerContactPersonModels", "FirstName");
        }
    }
}
