namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Feature_TempSolution : DbMigration
    {
        public override void Up()
        {
            Sql("DELETE FROM dbo.Feature");
            AddColumn("dbo.Feature", "NameEng", c => c.String());
            AddColumn("dbo.Feature", "CategoryName", c => c.String());
        }
        
        public override void Down()
        {
            Sql("DELETE FROM dbo.Feature");
            DropColumn("dbo.Feature", "CategoryName");
            DropColumn("dbo.Feature", "NameEng");
        }
    }
}
