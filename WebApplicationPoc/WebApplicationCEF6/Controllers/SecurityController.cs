using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApplicationCEF6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        /*
        // POST: /Security/LogIn
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult LogIn(LogOnModel model)
        {
            if (ModelState.IsValid)
            {
                            var remote = this.HttpContext.Connection.RemoteIpAddress;
                var ipAddress = remote == "::1" ? "127.0.0.1" : remote;
                var result = Interview.ValidatePolicyWithPIN(model.UserName, model.Password, ipAddress);

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

                else if (result.ErrorContainerList.Any())//RR: If there are any error message in the list show.
                {
                    foreach (var item in result.ErrorContainerList)

                        ModelState.AddModelError("", item.Message.ToString());
                }
                else
                {
                    ModelState.AddModelError("", string.Format("Could not find policy with {0} and PIN provided.", CarrierCustomParameter.GetParameter("PolicyIdentifierName")));
                }
            }

            // If we got this far, something failed, redisplay form
            return View("LogIn", "_LayoutPlain", model);
        }

        //
        // GET: /Security/LogOut

        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return Redirect(Url.Content("~/"));

        }
        */
    }

    public class LogOnModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }

    }
}