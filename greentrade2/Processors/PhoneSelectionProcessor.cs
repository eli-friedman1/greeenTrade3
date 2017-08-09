using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace greentrade2.Processors
{
    public class PhoneSelectionProcessor
    {
        //public static int? InsertNewPhoneSubmission()
        //{
        //    using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
        //    {
        //        con.Open();
        //        using (SqlCommand cmd = new SqlCommand(@"INSERT INTO PhoneSubmissions ([UserID]
        //                                                                        ,[PhoneID]
        //                                                                        ,[AddressID]
        //                                                                        ,[TimeSlotSelected]
        //                                                                        ,[SubmissionTime])
        //                                                          VALUES (@userID, @phoneID, @addressID, @timeSlotSelected, @submissionTime)
        //                                                          SET @ID = SCOPE_IDENTITY();", con))
        //        {
        //            cmd.Parameters.Add(new SqlParameter("@userID", user.Id));
        //            cmd.Parameters.Add(new SqlParameter("@phoneID", phoneId));
        //            cmd.Parameters.Add(new SqlParameter("@addressID", addressId));
        //            cmd.Parameters.Add(new SqlParameter("@timeSlotSelected", timeSlot));
        //            cmd.Parameters.Add(new SqlParameter("@submissionTime", DateTime.Now.ToUniversalTime()));
        //            SqlParameter param = new SqlParameter("@ID", SqlDbType.Int, 4);

        //            cmd.ExecuteNonQuery();

        //            Session["phoneSubmissionId"] = (int?)cmd.Parameters["@ID"].Value;
        //        }
        //    }
        //}

    }
}