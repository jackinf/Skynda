using System;
using System.Collections.Generic;
using X3Project.Domain.Models;
using X3Project.Domain.Results;
using X3Project.Domain.ViewModels;

namespace X3Project.Domain.Services
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