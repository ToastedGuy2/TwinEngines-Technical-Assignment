using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Entities;
using server.Repositories.context;

namespace Repositories
{
    public class CustomerTypeRepository : ICustomerTypeRepository
    {
        private readonly TwinEnginesDbContext _db;
        public CustomerTypeRepository(TwinEnginesDbContext db)
        {
            this._db = db ?? throw new ArgumentNullException(nameof(db));
        }


        public async Task<IEnumerable<CustomerType>> GetAllAsync()
        {
            return await _db.Types.ToListAsync();
        }

        public async Task<CustomerType> GetByIdAsync(int id)
        {
            return await _db.Types.FindAsync(id);
        }
    }
}