using System.Collections.Generic;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Feature;

namespace Triven.Domain.Services
{
    public interface IFeatureService
    {
        ServiceResult<IList<FeatureViewModel>> GetAll();
        ServiceResult<List<FeatureAdminSelectViewModel>> GetAllForAdminSelect();
        ServiceResult<FeatureViewModel> Get(int id);
        ServiceResult<FeatureViewModel> Create(FeatureViewModel viewModel);
        ServiceResult<FeatureViewModel> Update(int id, FeatureViewModel viewModel);
        ServiceResult<bool> Delete(int id);
        ServiceResult<List<object>> GetAllBy(int vehicleId);
    }
}