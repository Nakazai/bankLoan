using bankLoan.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bankLoan
{
    public class DB
    {
        public bool createCustomer(domainCustomer inCus)
        {
            try
            {
                using (var db = new customerContext())
                {
                    var customer = new Customer()
                    {
                        SSN = inCus.SSN,
                        phoneNum = inCus.phoneNum,
                        email = inCus.email,
                        loanAmount = inCus.loanAmount,
                        numOfYears = inCus.numOfYears
                    };
                    db.Customers.Add(customer);
                    db.SaveChanges();
                    return true;
                }
            }
            catch(Exception e)
            {
                Console.Write("Error" + e);
                return false;
            }
        }

        public List<Customer> getCustomers()
        {
            try
            {
                using (var db = new customerContext())
                {
                    return db.Customers.ToList();
                }
            }
            catch
            {
                return null;
            }    
        }
    }
}