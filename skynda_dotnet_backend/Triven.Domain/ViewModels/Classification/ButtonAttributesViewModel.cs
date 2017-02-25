namespace Triven.Domain.ViewModels.Classification
{
    public class ButtonAttributesModel : ClassificationBaseModel
    {
        public string Name { get; set; }
        public int Value { get; set; }
        public bool IsToggled { get; set; }
    }
}