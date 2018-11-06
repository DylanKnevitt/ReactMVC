using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Model
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ComplexDetails { get; set; }
        public string StreetName { get; set; }
        public string Suburb { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string ContactCountryCode { get; set; }
        public string ContactNumber { get; set; }
        public string ContactExtension { get; set; }
        public string EmailAddress { get; set; }
        public string TwitterHandle { get; set; }
        public string GithubPage { get; set; }
    }
}
