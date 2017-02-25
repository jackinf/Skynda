namespace X3Project.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PartnerUsers : DbMigration
    {
        public override void Up()
        {

            DropTable("dbo.PartnerUsers");
            DropForeignKey("dbo.PartnerUsers", "PartnerId_FK", "dbo.Partner");
            DropForeignKey("dbo.PartnerUsers", "UserId_FK", "dbo.Users");
            CreateTable(
                "dbo.PartnerUsers",
                c => new
                    {
                        PartnerId_FK = c.Int(nullable: false),
                        UserId_FK = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.PartnerId_FK, t.UserId_FK })
                .ForeignKey("dbo.Partner", t => t.PartnerId_FK, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId_FK, cascadeDelete: true);

        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.PartnerUsers",
                c => new
                    {
                        PartnerId_FK = c.Int(nullable: false),
                        UserId_FK = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.PartnerId_FK, t.UserId_FK });
            
            DropForeignKey("dbo.PartnerUsers", "UserId_FK", "dbo.Users");
            DropForeignKey("dbo.PartnerUsers", "PartnerId_FK", "dbo.Partner");
            DropTable("dbo.PartnerUsers");
            AddForeignKey("dbo.PartnerUsers", "UserId_FK", "dbo.Users", "Id", cascadeDelete: true);
            AddForeignKey("dbo.PartnerUsers", "PartnerId_FK", "dbo.Partner", "Id", cascadeDelete: true);
        }
    }
}
