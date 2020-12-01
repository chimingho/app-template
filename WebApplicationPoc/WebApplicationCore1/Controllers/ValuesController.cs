using CCEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CCModel;

namespace WebApplicationCore1.Controllers
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

    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        [HttpGet]
        [Route("CarrierList")]
        public IList<ValueDTO> GetCarriers()
        {

            IList<Carrier> list = null;
            /*
            using (var ccContext = new CallCenterDBEntities())
            {
                var carriersInDB = ccContext.Batches.Select(s => s.carrierId).Distinct().ToArray();
                var carriers = ccContext.Carriers.Where(w => w.carrierDoNotDisplay != true && w.inactive != true && carriersInDB.Contains(w.carrierId)).OrderBy(o => o.abbrevName).ToList();

                list = carriers.ToList();
            }
            */

            var model = new PageNodeModel(new Guid(LogicTree.HELP_TREE_GUID), "pageNodeTypeCode", CCModel.Interview.Current.RecordIdentifier);


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


        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
