using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Mail;
using System.Data.SqlClient;
//using greentrade2.Account;
using Microsoft.AspNet.Identity.Owin;

using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Mail;
using System.Net.Mime;
using System.Configuration;
using Microsoft.AspNet.Identity;
using greentrade2.Models;

namespace greentrade2.Controllers
{
    public class PhoneSelectionController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SubmitPhoneForm(string brand, string series, string carrier, string color, int GB, string condition)
        {
            int phoneId = 0;
            decimal offer = 0;
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                con.Open();
                //
                // The following code shows how you can use an SqlCommand based on the SqlConnection.
                //
                using (SqlCommand cmd = new SqlCommand(@"SELECT Top 1 PhoneID, offer 
                                                            from Phones 
                                                            where Brand = @brand 
                                                                and Series = @series 
                                                                and Carrier = @carrier 
                                                                and Color = @color 
                                                                and GB = @GB 
                                                                and Condition = @condition", con))
                {
                    cmd.Parameters.Add(new SqlParameter("@brand", brand));
                    cmd.Parameters.Add(new SqlParameter("@series", series));
                    cmd.Parameters.Add(new SqlParameter("@carrier", carrier));
                    cmd.Parameters.Add(new SqlParameter("@color", color));
                    cmd.Parameters.Add(new SqlParameter("@GB", GB));
                    cmd.Parameters.Add(new SqlParameter("@condition", condition));
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            phoneId = reader.GetInt32(0);
                            offer = reader.GetDecimal(1);
                        }
                    }
                }
            }
            Session["phoneId"] = phoneId;
            Session["offer"] = offer;

            //check if user is logged in to see where to route to
            string userFirstName = "";
            bool loggedIn = (System.Web.HttpContext.Current.User != null) && (System.Web.HttpContext.Current.User.Identity.IsAuthenticated);
            if (loggedIn)
            {
                userFirstName = System.Web.HttpContext.Current.User.Identity.Name;
            }

            return Json(new { success = true, offer, loggedIn, userFirstName });
        }

        public JsonResult SelectTimeSlot(string timeSlot, string brand, string series, string carrier, string color, int GB, string condition, decimal offer)
        {
            var contextUser = System.Web.HttpContext.Current.User;
            
            if (!contextUser.Identity.IsAuthenticated)
            {
                return Json(new { success = false });
            }

            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindById(contextUser.Identity.GetUserId());

            int phoneId = (int)Session["phoneId"];

            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                con.Open();
                //
                // The following code shows how you can use an SqlCommand based on the SqlConnection.
                //
                using (SqlCommand cmd = new SqlCommand(@"INSERT INTO PhoneSubmissions ([UserID]
                                                                                ,[PhoneID]
                                                                                ,[AddressID]
                                                                                ,[TimeSlotSelected]
                                                                                ,[SubmissionTime])
                                                                  VALUES (@userID, @phoneID, @addressID, @timeSlotSelected, @submissionTime)", con))
                {
                    cmd.Parameters.Add(new SqlParameter("@userID", user.Id));
                    cmd.Parameters.Add(new SqlParameter("@phoneID", phoneId));
                    cmd.Parameters.Add(new SqlParameter("@addressID", carrier)); //TODO : where to get addressID
                    cmd.Parameters.Add(new SqlParameter("@color", color));
                    cmd.Parameters.Add(new SqlParameter("@GB", GB));
                    cmd.Parameters.Add(new SqlParameter("@condition", condition));
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            phoneId = reader.GetInt32(0);
                            offer = reader.GetDecimal(1);
                        }
                    }
                }
            }

            return Json(new { success = true });
        }
            
        public JsonResult LogIn(string email, string pw, bool rememberMe = false)
        {

            var signinManager = HttpContext.GetOwinContext().GetUserManager<ApplicationSignInManager>();

            // This doen't count login failures towards account lockout
            // To enable password failures to trigger lockout, change to shouldLockout: true
            var result = signinManager.PasswordSignIn(email, pw, rememberMe, shouldLockout: false);
            bool success = false;

            switch (result)
            {
                case SignInStatus.Success:
                    success = true;
                    break;
                case SignInStatus.LockedOut:
                    break;
                case SignInStatus.RequiresVerification:
                    //Response.Redirect(String.Format("/Account/TwoFactorAuthenticationSignIn?ReturnUrl={0}&RememberMe={1}",
                    //                                Request.QueryString["ReturnUrl"],
                    //                                RememberMe.Checked),
                    //                  true);
                    break;
                case SignInStatus.Failure:
                default:

                    //FailureText.Text = "Invalid login attempt";
                    //ErrorMessage.Visible = true;
                    break;
            }

            return Json(new { success });
        }

        public JsonResult blahh(string emailTo, string name)
        {
            var fromAddress = new MailAddress("efriedman000@gmail.com", "Green Trade");
            var toAddress = new MailAddress(emailTo, "To Name");
            const string fromPassword = "";
            const string subject = "Your request has been received!";
            string body = "Hi" + name + ",\n\nThank you for your interest in blah lblah";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }

            return Json(new { Success = true });
        }
    }
}