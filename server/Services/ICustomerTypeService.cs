using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;

namespace Services
{
    public interface ICustomerTypeService
    {
        Task<IEnumerable<CustomerType>> GetAllAsync();
    }
}