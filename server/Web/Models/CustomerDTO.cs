using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;

namespace Web.Models
{
    public class CustomerDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CustomerType Type { get; set; }
        public DateTime ContractDate { get; set; }
        public Decimal CreditLimit { get; set; }
    }
}