using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;

namespace Web.Models
{
    public class CustomerForCreationDTO
    {
        [Required(ErrorMessage = "This field is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "This field is required")]
        public int TypeId { get; set; }
        [Required(ErrorMessage = "This field is required")]
        public DateTime ContractDate { get; set; }
        [Required(ErrorMessage = "This field is required")]
        public Decimal CreditLimit { get; set; }
        [Required(ErrorMessage = "This field is required")]
        public bool isActive { get; set; }
    }
}