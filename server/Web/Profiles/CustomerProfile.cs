using System;
using System.Globalization;
using System.Linq;
using AutoMapper;
using server.Entities;
using Web.Models;

namespace Web.Profiles
{
    public class CustomerProfile : Profile
    {
        public CustomerProfile()
        {
            CreateMap<Customer, CustomerDTO>();
            CreateMap<CustomerForCreationDTO, Customer>();
        }
    }
}