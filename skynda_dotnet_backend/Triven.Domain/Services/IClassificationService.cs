using System.Collections.Generic;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Classification;

namespace Triven.Domain.Services
{
    public interface IClassificationService
    {
        ServiceResult<IList<ClassificationViewModel>> GetByType(string param);
        ServiceResult<IList<ClassificationViewModel>> GetByTypeAndVehicleBound(string param);
    }
}
