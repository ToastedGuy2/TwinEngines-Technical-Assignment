using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories;
using server.Entities;

namespace Services
{
    public class CustomerTypeService : ICustomerTypeService
    {
        private readonly ICustomerTypeRepository _repository;
        public CustomerTypeService(ICustomerTypeRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }
        public async Task<IEnumerable<CustomerType>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }
    }
}