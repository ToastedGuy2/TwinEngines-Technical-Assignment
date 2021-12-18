using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Entities;

namespace server.Repositories.context
{
    public class TwinEnginesDbContext : DbContext
    {
        public TwinEnginesDbContext(DbContextOptions<TwinEnginesDbContext> options) : base(options)
        {
        }
    }
}