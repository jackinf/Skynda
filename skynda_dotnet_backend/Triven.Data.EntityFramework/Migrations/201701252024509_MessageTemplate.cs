namespace X3Project.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MessageTemplate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MessageTemplate",
                c => new
                    {
                        Name = c.String(nullable: false, maxLength: 128),
                        Locale = c.String(nullable: false, maxLength: 128),
                        Message = c.String(),
                        Fields = c.String(),
                        UpdatedOn = c.DateTime(),
                        DeletedOn = c.DateTime(),
                        CreatedOn = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedBy = c.Int(),
                        DeletedBy = c.Int(),
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => new { t.Name, t.Locale, t.Id })
                .ForeignKey("dbo.Users", t => t.CreatedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.DeletedBy)
                .Index(t => t.CreatedBy)
                .Index(t => t.UpdatedBy)
                .Index(t => t.DeletedBy);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.MessageTemplate", "DeletedBy", "dbo.Users");
            DropForeignKey("dbo.MessageTemplate", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.MessageTemplate", "CreatedBy", "dbo.Users");
            DropIndex("dbo.MessageTemplate", new[] { "DeletedBy" });
            DropIndex("dbo.MessageTemplate", new[] { "UpdatedBy" });
            DropIndex("dbo.MessageTemplate", new[] { "CreatedBy" });
            DropTable("dbo.MessageTemplate");
        }
    }
}
