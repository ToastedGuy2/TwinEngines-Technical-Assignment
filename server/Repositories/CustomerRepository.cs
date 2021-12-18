using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Entities;
using server.Repositories.context;

namespace Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly TwinEnginesDbContext _db;
        public CustomerRepository(TwinEnginesDbContext db)
        {
            this._db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<IEnumerable<Customer>> GetAllAsync()
        {
            return await _db.Customers.Include(c => c.Type).ToListAsync();
        }

        public async Task<Customer> GetByIdAsync(int id)
        {
            return await _db.Customers.Include(c => c.Type)
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task InsertAsync(Customer customer)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }
            customer.IsItActive = true;
            await _db.Customers.AddAsync(customer);
        }


        public void Update(Customer customer)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }
            _db.Customers.Update(customer);
        }
        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}