using CCEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;
using RoutePrefixAttribute = System.Web.Http.RoutePrefixAttribute;

namespace WebApplicationFramework1.Controllers
{

    public class InnerDTO
    {
        public string Name;
        public DateTime Date;
        public decimal? Amount;
    }
    public class ValueDTO
    {
        public string Name;
        public DateTime Date;
        public decimal? Amount;
        public List<InnerDTO> childs;
    }


    [RoutePrefix("api/Values")]
    public class ValuesController : ApiController
    {
        [HttpGet]
        [Route("CarrierList")]
        public IList<ValueDTO> GetCarriers()
        {
            IList<Carrier> list = null;
            using (CallCenterDBEntities ccContext = new CallCenterDBEntities())
            {
                var carriersInDB = ccContext.Batches.Select(s => s.carrierId).Distinct().ToArray();
                var carriers = ccContext.Carriers.Where(w => w.carrierDoNotDisplay != true && w.inactive != true && carriersInDB.Contains(w.carrierId)).OrderBy(o => o.abbrevName).ToList();

                list = carriers.ToList();
            }

            IList<ValueDTO> seed = new List<ValueDTO> {
                 new ValueDTO{
                     Name = "name1",
                     Amount = 1.1m,
                      Date = DateTime.Now,
                       childs = new List<InnerDTO>{
                           new InnerDTO{
                                Name = "child1",
                          }

                       }

                 }
            };
            return seed;
        }

        [HttpGet]
        [Route("CarrierAsync")]
        [ResponseType(typeof(IList<Carrier>))]
        public async Task<IHttpActionResult> GetCarriersa()
        {

            IList<Carrier> list = null;
            using (CallCenterDBEntities ccContext = new CallCenterDBEntities())
            {
                var carriersInDB = ccContext.Batches.Select(s => s.carrierId).Distinct().ToArray();
                var carriers = ccContext.Carriers.Where(w => w.carrierDoNotDisplay != true && w.inactive != true && carriersInDB.Contains(w.carrierId)).OrderBy(o => o.abbrevName).ToList();
                list = carriers.ToList();
            }
            return Ok(list);
        }



        // GET api/values
        public IEnumerable<string> Get()
        {
            using (CallCenterDBEntities ccContext = new CallCenterDBEntities())
            {
                var carriersInDB = ccContext.Batches.Select(s => s.carrierId).Distinct().ToArray();
                var carriers = ccContext.Carriers.Where(w => w.carrierDoNotDisplay != true && w.inactive != true && carriersInDB.Contains(w.carrierId)).OrderBy(o => o.abbrevName).ToList();


            }
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
