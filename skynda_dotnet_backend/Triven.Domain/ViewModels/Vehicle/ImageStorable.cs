namespace Triven.Domain.ViewModels.Vehicle
{
    public interface ImageStorable<T>
    {
        T GetImage { get; set; }
    }
}