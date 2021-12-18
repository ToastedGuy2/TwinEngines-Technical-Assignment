using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Entities;
using Services;
using Web.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _service;
        private readonly IMapper _mapper;

        public CustomersController(ICustomerService service, IMapper mapper)
        {
            this._service = service ?? throw new ArgumentNullException(nameof(service));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<CustomerDTO>>> GetCustomers()
        {
            var customers = await _service.GetAllAsync();
            var response = _mapper.Map<IEnumerable<CustomerDTO>>(customers);
            return Ok(response);
        }

        [HttpGet("{id}", Name = "GetCustomerById")]
        public async Task<ActionResult<CustomerDTO>> GetCustomerById(int id)
        {
            var customer = await _service.GetByIdAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            var response = _mapper.Map<CustomerDTO>(customer);

            return Ok(response);
        }

        [HttpPost("")]
        public async Task<ActionResult<CustomerDTO>> PostCustomer(CustomerForCreationDTO model)
        {
            var customer = _mapper.Map<Customer>(model);
            await _service.InsertAsync(customer);
            await _service.SaveChangesAsync();
            // TODO: ADD Customer
            var response = _mapper.Map<CustomerDTO>(customer);
            return CreatedAtRoute("GetCustomerById", new { id = response.Id }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer model)
        {
            // TODO: Your code here
            await Task.Yield();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomerById(int id)
        {
            // TODO: Your code here
            await Task.Yield();

            return null;
        }
    }
}