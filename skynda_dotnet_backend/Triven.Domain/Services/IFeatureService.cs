using Triven.Domain.Results;
using Triven.Domain.ViewModels.Feature;

namespace Triven.Domain.Services
{
    public interface IFeatureService<out TResult> where TResult : IServiceResult
    {
        TResult GetAll();
        TResult GetAllForAdminSelect();
        TResult Get(int id);
        TResult Create(FeatureViewModel viewModel);
        TResult Update(int id, FeatureViewModel viewModel);
        TResult Delete(int id);
        TResult GetAllBy(int vehicleId);
    }
}