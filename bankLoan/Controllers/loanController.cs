using bankLoan.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace bankLoan.Controllers
{
    public class loanController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage Post([FromBody]domainCustomer inCus)
        {
            if (ModelState.IsValid)
            {
                DB database = new DB();
                bool OK = database.createCustomer(inCus);

                if (OK)
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                }
                else
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        ReasonPhrase = "Could not register customer (NB: Only 1 application per customer!)"
                    };
                }
            }
            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.BadRequest,
                ReasonPhrase = "Could not register customer in database."
            };
        }

        [HttpGet]
        public HttpResponseMessage Get()
        {
            DB database = new DB();
            var result = database.getCustomers();

            if (result == null)
            {
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.Conflict,
                    ReasonPhrase = "Something wrong happend on server, please try again later"
                };
            }
            
            var Json = new JavaScriptSerializer();
            string list = Json.Serialize(result);

            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(list)
            };

        }
    }
}