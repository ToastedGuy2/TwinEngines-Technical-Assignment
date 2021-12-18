using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;
using server.Repositories.context;

namespace Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private TwinEnginesDbContext _db;
        public CustomerRepository(TwinEnginesDbContext db)
        {
            this._db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public IEnumerable<Customer> GetAll()
        {
            return _db.Customers;
        }

        public Customer GetById(int id)
        {
            return _db.Customers.Find(id);
        }

        public void Insert(Customer customer)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }
            _db.Customers.Add(customer);
        }


        public void Update(Customer customer)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }
            _db.Customers.Update(customer);
        }
        public void Save()
        {
            _db.SaveChanges();
        }
    }
}