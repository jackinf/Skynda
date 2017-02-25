using System.Data.Entity.Migrations;

namespace Triven.Data.EntityFramework.Migrations
{
    public partial class UpdateDatabaseTablesNames : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.AssignmentAddressModels", newName: "AssignmentAddress");
            RenameTable(name: "dbo.AssignmentModels", newName: "Assignment");
            RenameTable(name: "dbo.PartnerContactPersonModels", newName: "PartnerContactPerson");
            RenameTable(name: "dbo.PartnerContactPersonContactInfoModels", newName: "PartnerContactPersonContactInfo");
            RenameTable(name: "dbo.VehicleProperyModels", newName: "VehiclePropery");
            RenameTable(name: "dbo.AssignmentPalletModels", newName: "AssignmentPallet");
            RenameTable(name: "dbo.AssignmentVehicleModels", newName: "AssignmentVehicle");
            RenameTable(name: "dbo.DriverModels", newName: "Driver");
            RenameTable(name: "dbo.AssignmentDriverInstructionModels", newName: "AssignmentDriverInstruction");
            RenameTable(name: "dbo.AssignmentTransportDocumentModels", newName: "AssignmentTransportDocument");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.AssignmentTransportDocument", newName: "AssignmentTransportDocumentModels");
            RenameTable(name: "dbo.AssignmentDriverInstruction", newName: "AssignmentDriverInstructionModels");
            RenameTable(name: "dbo.Driver", newName: "DriverModels");
            RenameTable(name: "dbo.AssignmentVehicle", newName: "AssignmentVehicleModels");
            RenameTable(name: "dbo.AssignmentPallet", newName: "AssignmentPalletModels");
            RenameTable(name: "dbo.VehiclePropery", newName: "VehicleProperyModels");
            RenameTable(name: "dbo.PartnerContactPersonContactInfo", newName: "PartnerContactPersonContactInfoModels");
            RenameTable(name: "dbo.PartnerContactPerson", newName: "PartnerContactPersonModels");
            RenameTable(name: "dbo.Assignment", newName: "AssignmentModels");
            RenameTable(name: "dbo.AssignmentAddress", newName: "AssignmentAddressModels");
        }
    }
}
