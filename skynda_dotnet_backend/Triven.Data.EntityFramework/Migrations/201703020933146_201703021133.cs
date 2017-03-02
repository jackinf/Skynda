namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _201703021133 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Vehicle", "Problems");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Vehicle", "Problems", c => c.String());
        }
    }
}
