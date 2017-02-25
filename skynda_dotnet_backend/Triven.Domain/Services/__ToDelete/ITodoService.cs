using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Results;
using Triven.Domain.ViewModelInterfaces;

namespace Triven.Domain.Services
{
    public interface ITodoService
    {
        IEnumerable<TTodoViewModel> GetAll<TTodoViewModel>() where TTodoViewModel : ITodoViewModel;
        TTodoViewModel Get<TTodoViewModel>(int id) where TTodoViewModel : ITodoViewModel;
        IResult<ITodoModel> Add<TViewModel>(TViewModel viewModel) where TViewModel : ITodoViewModel; // TODO: Pole veel otsustanud, mis tüüpi response peaks service tagastama.
        IResult<ITodoModel> Update<TViewModel>(int id, TViewModel viewModel) where TViewModel : ITodoViewModel;  // TODO: Pole veel otsustanud, mis tüüpi response peaks service tagastama.
        bool Delete(int id); // TODO: Pole veel otsustanud, mis tüüpi response peaks service tagastama.
    }
}