using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Entities;
using Services;

namespace Web.Controllers
{
    [EnableCors("_myAllowSpecificOrigins")]
    [ApiController]
    [Route("api/[controller]")]
    public class TypesController : ControllerBase
    {
        private readonly ICustomerTypeService _typeService;

        public TypesController(ICustomerTypeService typeService)
        {
            this._typeService = typeService;
        }
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<CustomerType>>> GetCustomerType()
        {
            var types = await _typeService.GetAllAsync();

            return Ok(types);
        }

    }
}