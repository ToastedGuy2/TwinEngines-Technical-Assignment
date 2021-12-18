using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;

namespace Repositories
{
    public interface ICustomerTypeRepository
    {
        Task<IEnumerable<CustomerType>> GetAllAsync();
    }
}