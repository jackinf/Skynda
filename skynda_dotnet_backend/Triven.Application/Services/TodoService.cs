using System.Collections.Generic;
using AutoMapper;
using Triven.Domain.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModelInterfaces;

namespace Triven.Application.Services
{
    /// <summary>
    /// Service for TodoModels
    /// </summary>
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _repository;

        public TodoService(ITodoRepository repository)
        {
            _repository = repository;
        }
        
        /// <summary>
        /// Get all entities
        /// </summary>
        /// <returns></returns>
        public IEnumerable<TTodoViewModel> GetAll<TTodoViewModel>() where TTodoViewModel : ITodoViewModel
        {
            var entities = _repository.GetAll();
            return Mapper.Map<IEnumerable<TTodoViewModel>>(entities);
        }

        /// <summary>
        /// Get a single entity
        /// </summary>
        /// <param name="id">Entity's id</param>
        /// <returns></returns>
        public TTodoViewModel Get<TTodoViewModel>(int id) where TTodoViewModel : ITodoViewModel
        {
            var entity = _repository.Get(id);
            return Mapper.Map<TTodoViewModel>(entity);
        }

        /// <summary>
        /// Add a new entity
        /// </summary>
        /// <typeparam name="TViewModel">Data, which we will put into entity for an update</typeparam>
        /// <param name="viewModel">Data for entity</param>
        /// <returns></returns>
        public IResult<ITodoModel> Add<TViewModel>(TViewModel viewModel) where TViewModel : ITodoViewModel
        {
            var model = Mapper.Map<ITodoModel>(viewModel);
            // TODO: Validation goes here.
            var result = _repository.Add(model);
            return result;
        }

        /// <summary>
        /// Update the existing enitty
        /// </summary>
        /// <typeparam name="TViewModel">Data, which we will put into entity for an update</typeparam>
        /// <param name="id">Entity to update</param>
        /// <param name="viewModel">Data for entity</param>
        /// <returns></returns>
        public IResult<ITodoModel> Update<TViewModel>(int id, TViewModel viewModel) where TViewModel : ITodoViewModel
        {
            var model = _repository.Get(id);
            Mapper.Map(viewModel, model);
            // TODO: Validation goes here.
            return _repository.Update(id, model);
        }

        /// <summary>
        /// Archive the object
        /// </summary>
        /// <param name="id">ITodoModel id</param>
        /// <returns>Success</returns>
        public bool Delete(int id) => _repository.Delete(id);
    }
}