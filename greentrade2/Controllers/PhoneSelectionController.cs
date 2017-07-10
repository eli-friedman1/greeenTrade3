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
using System.Data;

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

        public JsonResult SelectTimeSlot(DateTime timeSlot)
        {
            var contextUser = System.Web.HttpContext.Current.User;
            
            if (!contextUser.Identity.IsAuthenticated)
            {
                return Json(new { success = false });
            }

            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindById(contextUser.Identity.GetUserId());
            int? addressId = user.DefaultAddressID;

            string address1 = "", address2 = "", city = "", state = "", zip = "";
            if(addressId != null)
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(@"SELECT Top 1 Address1, Address2, City, State, Zip 
                                                            from Addresses 
                                                            where AddressID = @addressId", con))
                    {
                        cmd.Parameters.Add(new SqlParameter("@addressId", addressId));
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                address1 = reader.GetString(0);
                                address2 = reader.IsDBNull(1) ? null : reader.GetString(1);
                                city = reader.GetString(2);
                                state = reader.GetString(3);
                                zip = reader.GetString(4);
                            }
                        }
                    }
                }
            }
            int phoneId = (int)Session["phoneId"];
            if (Session["phoneSubmissionId"] == null)
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(@"INSERT INTO PhoneSubmissions ([UserID]
                                                                                ,[PhoneID]
                                                                                ,[AddressID]
                                                                                ,[TimeSlotSelected]
                                                                                ,[SubmissionTime])
                                                                  VALUES (@userID, @phoneID, @addressID, @timeSlotSelected, @submissionTime)
                                                                  SET @ID = SCOPE_IDENTITY();", con))
                    {
                        cmd.Parameters.Add(new SqlParameter("@userID", user.Id));
                        cmd.Parameters.Add(new SqlParameter("@phoneID", phoneId));
                        cmd.Parameters.Add(new SqlParameter("@addressID", addressId));
                        cmd.Parameters.Add(new SqlParameter("@timeSlotSelected", timeSlot));
                        cmd.Parameters.Add(new SqlParameter("@submissionTime", DateTime.Now.ToUniversalTime()));

                        SqlParameter param = new SqlParameter("@ID", SqlDbType.Int, 4);
                        param.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(param);

                        cmd.ExecuteNonQuery();

                        Session["phoneSubmissionId"] = (int?)cmd.Parameters["@ID"].Value;
                    }
                }
            }
            else
            {
                int phoneSubmissionId = (int)Session["phoneSubmissionId"];
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(@"UPDATE PhoneSubmissions
                                                                SET [TimeSlotSelected] = @timeSlotSelected
                                                                WHERE [PhoneSubmissionID] = @phoneSubmissionID
                                                                  ", con))
                    {
                        cmd.Parameters.Add(new SqlParameter("@timeSlotSelected", timeSlot));
                        cmd.Parameters.Add(new SqlParameter("@phoneSubmissionID", phoneSubmissionId));

                        cmd.ExecuteNonQuery();
                    }
                }
            }
            return Json(new { success = true, address1, address2, city, state, zip });
        }

        public JsonResult UpdateSubmissionAddress(string address, string city, string state, string zip, string phone)
        {
            var contextUser = System.Web.HttpContext.Current.User;

            if (!contextUser.Identity.IsAuthenticated)
            {
                return Json(new { success = false });
            }

            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindById(contextUser.Identity.GetUserId());

            if (Session["phoneSubmissionId"] == null)
            {
                //log user out or return error
            }

            int phoneSubmissionId = (int)Session["phoneSubmissionId"];
            int? newAddressId = 0;

            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(@"INSERT INTO Addresses ([UserID]
                                                                                    ,[Address1]
                                                                                    ,[City]
                                                                                    ,[State]
                                                                                    ,[Zip]
                                                                                    ,[PhoneNumber])
                                                                  VALUES (@UserID, @address, @city, @state, @zip, @phone) 
                                                                    SET @ID = SCOPE_IDENTITY();", con))
                {
                    cmd.Parameters.Add(new SqlParameter("@UserID", user.Id));
                    cmd.Parameters.Add(new SqlParameter("@address", address));
                    cmd.Parameters.Add(new SqlParameter("@city", city));
                    cmd.Parameters.Add(new SqlParameter("@state", state));
                    cmd.Parameters.Add(new SqlParameter("@zip", zip));
                    cmd.Parameters.Add(new SqlParameter("@phone", phone));

                    SqlParameter param = new SqlParameter("@ID", SqlDbType.Int, 4);
                    param.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(param);

                    cmd.ExecuteNonQuery();

                    newAddressId = (int?)cmd.Parameters["@ID"].Value;
                }

                using (SqlCommand cmd = new SqlCommand(@"UPDATE PhoneSubmissions
                                                                SET [AddressID] = @newAddressId
                                                                WHERE [PhoneSubmissionID] = @phoneSubmissionID
                                                                  ", con))
                {
                    cmd.Parameters.Add(new SqlParameter("@newAddressId", newAddressId));
                    cmd.Parameters.Add(new SqlParameter("@phoneSubmissionID", phoneSubmissionId));

                    cmd.ExecuteNonQuery();
                }
            }
            return Json(new { success = true, address, city, state, zip });
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