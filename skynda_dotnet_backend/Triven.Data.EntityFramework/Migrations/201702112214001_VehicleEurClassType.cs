using System.Data.Entity.Migrations;

namespace Triven.Data.EntityFramework.Migrations
{
    public partial class VehicleEurClassType : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Vehicle", "EurClass", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Vehicle", "EurClass", c => c.String());
        }
    }
}
