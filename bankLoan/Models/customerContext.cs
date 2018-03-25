using System;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace bankLoan.Models
{
    public class Customer
    {
        [Key]
        public string SSN { get; set; }
        public string phoneNum { get; set; }
        public string email { get; set; }
        public int loanAmount { get; set; }
        public int numOfYears { get; set; }
    }

    public class customerContext : DbContext
    {
        public customerContext()
            : base("name=customerContext")
        { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        { }

        public DbSet<Customer> Customers { get; set; }
    }

}
