using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;
using server.Repositories.context;

namespace Repositories
{
    public class CustomerTypeRepository : ICustomerTypeRepository
    {
        private TwinEnginesDbContext _db;
        public CustomerTypeRepository(TwinEnginesDbContext db)
        {
            this._db = db ?? throw new ArgumentNullException(nameof(db));
        }
        public IEnumerable<CustomerType> GetAll()
        {
            return _db.Types;
        }
    }
}