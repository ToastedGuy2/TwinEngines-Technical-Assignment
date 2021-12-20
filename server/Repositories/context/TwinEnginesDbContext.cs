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
        public DbSet<Customer> Customers { get; set; }
        public DbSet<CustomerType> Types { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<CustomerType>().HasData(
            new CustomerType()
            {
                Id = 1,
                Name = "Prospecto"
            },
            new CustomerType()
            {
                Id = 2,
                Name = "Cliente"
            });
            var r = new Random();
            modelBuilder.Entity<Customer>().HasData(
            new Customer()
            {
                Id = 1,
                Name = "Roberto Solorzano",
                TypeId = 1,
                ContractDate = DateTime.Now,
                CreditLimit = r.Next(500, 2500),
                IsActive = true,
            },
            new Customer()
            {
                Id = 2,
                Name = "Kevin Jose Ordoñez Zelaya",
                TypeId = 2,
                ContractDate = DateTime.Now,
                CreditLimit = r.Next(500, 2500),
                IsActive = true,
            },
            new Customer()
            {
                Id = 3,
                Name = "Daniel Webb",
                TypeId = 1,
                ContractDate = DateTime.Now,
                CreditLimit = r.Next(500, 2500),
                IsActive = true,
            },
            new Customer()
            {
                Id = 4,
                Name = "Javier Delgado",
                TypeId = 2,
                ContractDate = DateTime.Now,
                CreditLimit = r.Next(500, 2500),
                IsActive = true,
            },
            new Customer()
            {
                Id = 5,
                Name = "Dummy Data",
                TypeId = 2,
                ContractDate = DateTime.Now,
                CreditLimit = r.Next(500, 2500),
                IsActive = true,
            });
        }
    }
}