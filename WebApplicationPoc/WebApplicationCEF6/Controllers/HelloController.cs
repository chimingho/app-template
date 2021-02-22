using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using CCEntities;
using CCModel;
using Microsoft.AspNetCore.Authorization;

namespace VISU.WebResponse.API.Controllers
{
    /// <summary>
    /// Health check class
    /// </summary>
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            return Ok("alive!");
        }

        [HttpGet]
        [Route("GetCarriers")]
        public ActionResult<IList<Carrier>> GetCarriers()
        {

            IList<Carrier> list = null;

            using (var ccContext = new CallCenterDBEntities())
            {
                var carriersInDB = ccContext.Batches.Select(s => s.carrierId).Distinct().ToArray();
                var carriers = ccContext.Carriers.Where(w => w.carrierDoNotDisplay != true && w.inactive != true && carriersInDB.Contains(w.carrierId)).OrderBy(o => o.abbrevName).ToList();

                list = (from c in carriers
                        select new Carrier
                        {
                            carrierId = c.carrierId,
                            carrierName = c.carrierName
                        }).ToList();


            }

            return Ok(list);
        }



    }
}
