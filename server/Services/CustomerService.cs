using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories;
using server.Entities;

namespace Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _repository;
        public CustomerService(ICustomerRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        public async Task<IEnumerable<Customer>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Customer> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task InsertAsync(Customer customer)
        {
            customer.IsActive = true;
            await _repository.InsertAsync(customer);
            await _repository.SaveChangesAsync();
        }


        public async Task UpdateAsync(Customer customer)
        {
            _repository.Update(customer);
            await _repository.SaveChangesAsync();
        }
        public async Task DeleteAsync(Customer customer)
        {
            customer.IsActive = false;
            customer.DeletedDate = DateTime.Now;
            _repository.Update(customer);
            await _repository.SaveChangesAsync();
        }
    }
}