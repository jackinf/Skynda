using System;

namespace Triven.Domain.ViewModels.Vehicle
{
    [Obsolete("Remove")]
    public interface ImageStorable<T>
    {
        T GetImage { get; set; }
    }
}