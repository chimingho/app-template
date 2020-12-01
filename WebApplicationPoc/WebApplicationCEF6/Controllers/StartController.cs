using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CCEntities;
using Interview = CCModel.Interview;
using CCModel;
using System.ComponentModel.DataAnnotations;

namespace System.Web
{
    public static class HttpContext
    {
        private static Microsoft.AspNetCore.Http.IHttpContextAccessor m_httpContextAccessor;

        /*
        public HttpContext(Microsoft.AspNetCore.Http.IHttpContextAccessor httpContextAccessor)
        {
            m_httpContextAccessor = httpContextAccessor;
        }
        */

        public static void Configure(Microsoft.AspNetCore.Http.IHttpContextAccessor httpContextAccessor)
        {
            m_httpContextAccessor = httpContextAccessor;
        }


        public static Microsoft.AspNetCore.Http.HttpContext Current
        {
            get
            {
                return m_httpContextAccessor.HttpContext;
            }
        }

    }
}

namespace WebApplicationCEF6.Controllers
{
    /*
    public class Interview : CCModel.Interview {
        public int CarrierId { get; set; }
        public Interview(int carrierId, CallCenterRep csr, string applicationTypeCd): base(carrierId, csr, applicationTypeCd)
        {
        }


        public new static Interview Current
        {
            get
            {
//                var session = new HttpSessionStateWrapper(HttpContext.Current.Session);

//                if (session[Interview.SESSION_KEY] == null)
//                {
                    //var rep = CallCenterRep.GetAuthenticated(System.Web.HttpContext.Current.User.Identity.Name);
                    int carrierId = -1;
 //                   var toParse = session["CarrierId"] ?? carrierId;
                    //int.TryParse(toParse.ToString(), out carrierId);

                //                    session[Interview.SESSION_KEY] = new Interview(carrierId, rep, ConfigurationManager.AppSettings["ApplicationTypeCd"]);
                //                }

                //                return session[Interview.SESSION_KEY] as Interview;
                return new Interview(carrierId, null, "Web");
            }
        }


    }
    */
    [Route("api/[controller]")]
    [ApiController]
    public class StartController : ControllerBase
    {
        private const string _GREETING_INBOUND_MODULE = "GreetingInboundModule";
        private const string _GREETING_OUTBOUND_MODULE = "GreetingOutboundModule";
        private const string _GREETING_WEBRESPONSE_MODULE = "GreetingWebResponseModule";
        private const string _GREETING_MCPRO_MODULE = "GreetingMCProModule";

        private const string _QUESTIONS = "Questions";


        // GET: api/Default/5
        [Route("{id}")]
        //[HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {

            //var test = this.HttpContext.Session.GetString("test");

            //var name = this.HttpContext.User.Identity.Name;
            return "value";
        }


        [HttpGet]
        [Route("webresponse")]

        public async Task<ActionResult<Interview>> WebResponse(int carrierId, string userName)
        {
            var interview = Interview.GetInterview(carrierId, userName, "Web");
            interview.RecordIdentifier.CarrierId = carrierId;

            var remote = this.HttpContext.Connection.RemoteIpAddress;
            interview.IPAddress = remote.ToString();

            interview.TypeOfCall = Interview.CallType.WebResponse;

            return interview;
        }

        /* webresponse doesn't use it
         * 
         *
        public ActionResult WebResponseRedirect(string carrierId, string polnum, string pin)
        {
            this.WebResponse(carrierId);

            var ipAddress = Request.ServerVariables["REMOTE_ADDR"] == "::1" ? "127.0.0.1" : Request.ServerVariables["REMOTE_ADDR"];
            var result = Interview.ValidatePolicyWithPIN(polnum, pin, ipAddress);

            if (result.PageDirection != null)
            {
                FormsAuthentication.SetAuthCookie(Interview.Current.RecordIdentifier.QpcIdNum, true);
                if (Interview.Current.Policy.IsCCDone)
                {
                    Interview.Current.SaveResults(23, null);
                    return RedirectToAction("HelpPage", "Help", new { pageNodeTypeCode = "GreetingWebDone" });
                }
                else
                {
                    return RedirectToAction("StartModule", "Questions", new { moduleTypeCd = "GreetingWebResponseModule" });
                }
            }
            else
            {
                ModelState.AddModelError("", string.Format("Could not find policy with {0} and PIN provided.", CarrierCustomParameter.GetParameter("PolicyIdentifierName")));
            }

            return RedirectToAction("LogIn", "Security");
        }
        */
        [HttpGet]
        [Route("inbound")]
        [Route("inbound/{carrierId}/{recordingId}/{qpcIdNum}")]

        public ActionResult Inbound(string carrierId, string recordingId, string qpcIdNum)
        {
            ActionResult inboundActionResult = null;
            //Session["CarrierId"] = carrierId;
            var interview = Interview.GetInterview(int.Parse(carrierId), "test", "Web");
            interview.StartDateTime = DateTime.Now; //RR: Added to fix interview duration not stopping issue.
            interview.StartWrapUpDateTime = null; //RR: Added to fix negative interview suration.
            if (!string.IsNullOrWhiteSpace(qpcIdNum))
            {
                inboundActionResult = _InboundSetupWithQpcIdNum(carrierId, recordingId, qpcIdNum, interview);
            }

            interview.AppHelper.logRunning("Start URL", Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(HttpContext.Request));

            return inboundActionResult ?? _InboundSetup(carrierId, recordingId, interview);
        }


        private ActionResult _InboundSetupWithQpcIdNum(string carrierId, string recordingId, string qpcIdNum, Interview interview)
        {
            ActionResult result = null;
            var recordIdentifier = RecordIdentifier.FindByQpcIdNum(qpcIdNum, int.Parse(carrierId));

#if NET472
            if (recordIdentifier != null)
            {
                //Map carrier program for inbound calls for carriers having different programs with same parent carrier
                var carrierProgram = Customizable.GetCarrierProgram(carrierId.ToString());
                if (carrierProgram != null)
                    recordIdentifier.CarrierId = carrierProgram.carrierId;
                    //Session["CarrierId"] = carrierProgram.carrierId;
                else
                    recordIdentifier.CarrierId = int.Parse(carrierId);
                    //Session["CarrierId"] = int.Parse(carrierId);

                var remote = this.HttpContext.Connection.RemoteIpAddress;
                var local = this.HttpContext.Connection.LocalIpAddress;
                interview.IPAddress = remote.ToString();
                interview.RecordingId = recordingId;
                interview.BeginInterviewInbound(recordIdentifier);
                var objectNo = recordIdentifier.ObjectNumber; //with objNo updated in BeginInterviewInbound.  Gets reset in star

                LogicTree.StartModule(interview.RecordIdentifier, _GREETING_INBOUND_MODULE);
                var tree = LogicTree.StartNewTree("GreetingInboundTree", interview.InterviewId, interview.RecordIdentifier);
                interview.RecordIdentifier.ObjectNumber = objectNo;

                result = RedirectToAction("View", _QUESTIONS, new { sectionTreeGuid = tree.sectionTreeGuid, pageNodeTypeCd = interview.Policy.IsCCDone ? "GreetingCCDone" : "ChooseInsured", objectNumber = interview.RecordIdentifier.ObjectNumber });
            }

#endif
            return result;
        }

        private ActionResult _InboundSetup(string carrierId, string recordingId, Interview interview)
        {

#if NET472
            //Map carrier program for inbound calls for carriers having different programs with same parent carrier
            var carrierProgram = Customizable.GetCarrierProgram(carrierId);
            if (carrierProgram != null)
            {
                //Session["CarrierId"] = carrierProgram.carrierId;
                interview.RecordIdentifier.ProgramId = carrierProgram.programId;
                interview.RecordIdentifier.CarrierId = carrierProgram.carrierId;
            }

            else
            {
                //Session["CarrierId"] = int.Parse(carrierId); ;
                interview.RecordIdentifier.CarrierId = int.Parse(carrierId);
            }

            //Session["CarrierId"] = int.Parse(carrierId);
            //  Interview.Current.RecordIdentifier.CarrierId = int.Parse(carrierId);
            
            //TODO:: Interview.Current.IPAddress = Request.UserHostAddress;
            interview.TypeOfCall = Interview.CallType.Inbound;
            interview.RecordingId = recordingId;
            interview.RecordIdentifier.GetCustomizationGroupMembership(interview.ApplicationTypeCd);

            return RedirectToAction("StartModule", _QUESTIONS, new { moduleTypeCd = _GREETING_INBOUND_MODULE });
#else
            return Ok();
#endif
        }




    }


}