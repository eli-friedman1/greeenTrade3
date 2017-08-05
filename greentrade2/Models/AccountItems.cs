using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace greentrade2.Models
{
    public class AccountItems
    {
        public string contactEmail { get; set; }
        public int phoneId { get; set; }
        public int addressId { get; set; }
        public string timeSlot { get; set; }
        public string submissionTime { get; set; }
        public string status { get; set; }
        public decimal priceOffered { get; set; }
        public decimal paymentPreference { get; set; }
        public decimal paymentEmail { get; set; }

        public string brand { get; set; }
        public string series { get; set; }
        public string carrier { get; set; }
        public string color { get; set; }
        public int GB { get; set; }
        public string condition { get; set; }

        public string address1 { get; set; }
        public string address2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
        public string phoneNumber { get; set; }
        
    }
}