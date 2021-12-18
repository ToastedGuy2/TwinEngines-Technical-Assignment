using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Entities
{
    [Table("Customer")]
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int TypeId { get; set; }
        public CustomerType Type { get; set; }
        [Required]
        public DateTime ContractDate { get; set; }
        [Required]
        public Decimal CreditLimit { get; set; }
        [Required]
        public bool IsItActive { get; set; }
        public DateTime DeletedDate { get; set; }

    }
}