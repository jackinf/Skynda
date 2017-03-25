namespace Triven.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addForeignKeytoClassification : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Classification", "ClassificationType_Id", "dbo.ClassificationType");
            DropIndex("dbo.Classification", new[] { "ClassificationType_Id" });
            RenameColumn(table: "dbo.Classification", name: "ClassificationType_Id", newName: "ClassificationTypeId");
            AlterColumn("dbo.Classification", "ClassificationTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.Classification", "ClassificationTypeId");
            AddForeignKey("dbo.Classification", "ClassificationTypeId", "dbo.ClassificationType", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Classification", "ClassificationTypeId", "dbo.ClassificationType");
            DropIndex("dbo.Classification", new[] { "ClassificationTypeId" });
            AlterColumn("dbo.Classification", "ClassificationTypeId", c => c.Int());
            RenameColumn(table: "dbo.Classification", name: "ClassificationTypeId", newName: "ClassificationType_Id");
            CreateIndex("dbo.Classification", "ClassificationType_Id");
            AddForeignKey("dbo.Classification", "ClassificationType_Id", "dbo.ClassificationType", "Id");
        }
    }
}
