using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CCEntities;
using CCModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApplicationCEF6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly CallCenterDBEntities _db;
        //public ValuesController(CallCenterDBEntities db) {
        //    _db = db;
        //}
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<PageNodeModel>> Get()
        {


            /*
            IList<Carrier> list = null;

            var test = _db.Batches.Select(s => s.carrierId).Distinct().ToArray();

            using (var ccContext = new CallCenterDBEntities())
            {
                var carriersInDB = ccContext.Batches.Select(s => s.carrierId).Distinct().ToArray();
                var carriers = ccContext.Carriers.Where(w => w.carrierDoNotDisplay != true && w.inactive != true && carriersInDB.Contains(w.carrierId)).OrderBy(o => o.abbrevName).ToList();

                list = carriers.ToList();
            }


            using (var ccContext = new CallCenterDBEntities())
            {
                var batch = ccContext.Batches.Where(w => w.carrierId == 99).OrderByDescending(o => o.batchId).FirstOrDefault();

                try
                {
                    var model = new PageNodeModel(new Guid(LogicTree.HELP_TREE_GUID), null, null);
                    CCModel.Interview.Current.AppHelper.logError("Error resetting test policies", "test");
                }
                catch (Exception ex)
                {
                    CCModel.Interview.Current.AppHelper.logError("Error resetting test policies", ex.ToString());
                    throw;
                }


            }
            */

            var interview = CCModel.Interview.GetInterview(41, "QPC08", "Web");
            var model = new PageNodeModel(new Guid(LogicTree.HELP_TREE_GUID), "GreetingWebIntro", interview.RecordIdentifier, interview);

            return Ok(model);
            //return new string[] { "value1", "value2" };
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

        static public int Test(int i) {
            var interview = CCModel.Interview.GetInterview(41, "QPC08", "Web");
            var model = new PageNodeModel(new Guid(LogicTree.HELP_TREE_GUID), "GreetingWebIntro", interview.RecordIdentifier, interview);

            return i;
        }

    }
}
