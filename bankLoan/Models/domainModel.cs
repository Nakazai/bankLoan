using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace bankLoan.Models
{
    public class domainCustomer
    {
        [Required(ErrorMessage = "Social Security Number is required.")]
        [RegularExpression("[0-9]{11}", ErrorMessage = "Social Security Number must be entered (11 digits)")]
        public string SSN { get; set; }

        [Required(ErrorMessage = "Phone Number is required.")]
        [RegularExpression("[0-9]{8}", ErrorMessage = "Phone Number must be entered (8 digits)")]
        public string phoneNum { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [RegularExpression("[a-zA-Z0-9 .-]+@[a-zA-Z]+\\.[a-zA-Z]{2,}", ErrorMessage = "Email must be entered (bill33@live.com)")]
        public string email { get; set; }

        [Required(ErrorMessage = "Loan Amount is required.")]
        [RegularExpression("[0-9]{3,9}", ErrorMessage = "Loan Amount must be entered (3-6 digits)")]
        public int loanAmount { get; set; }

        [Required(ErrorMessage = "Number of Years is required.")]
        [RegularExpression("[0-9]{1,2}", ErrorMessage = "Number of Years must be entered (1-2 digit(s))")]
        public int numOfYears { get; set; }
    }
}