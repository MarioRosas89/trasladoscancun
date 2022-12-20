using System.Net.Mail;
using System.Net;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace TransferEconomic
{
    public static class Utils
    {
        public static void sendEmail(string toEmail, string bodyTemplate)
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.To.Add(toEmail);
                mail.From = new MailAddress("mariorosas@trasladoseconomicoscancun.com");
                mail.Subject = "Confirmacion de reserva";
                mail.Body = bodyTemplate;
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient("mail.trasladoseconomicoscancun.com", 8889);
                
                smtp.EnableSsl = false;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("mariorosas@trasladoseconomicoscancun.com", "$Yow8one");
                smtp.Send(mail);

            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static void SendWhatsapp(string message)
        {
            try
            {
                //TwilioClient.Init("AC3215d39b66916f302ea3ffbd8c0e1bad", "df3e822b16ba8c80b4a14c6f1177704e");

                //var send = MessageResource.Create(
                //    body: message,
                //    from: new Twilio.Types.PhoneNumber("whatsapp:+14155238886"),
                //    to: new Twilio.Types.PhoneNumber("whatsapp:+529982396905")
                //);
                bool isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
                if(!isDevelopment)
                {
                    var accountSid = "AC3215d39b66916f302ea3ffbd8c0e1bad";
                    var authToken = "df3e822b16ba8c80b4a14c6f1177704e";
                    TwilioClient.Init(accountSid, authToken);

                    var messageOptions = new CreateMessageOptions(
                        new PhoneNumber("whatsapp:+5219982396905"));
                    messageOptions.From = new PhoneNumber("whatsapp:+14155238886");
                    messageOptions.Body = message;

                    var messageSend = MessageResource.Create(messageOptions);
                }
                

            }
            catch (Exception ex)
            {

                throw;
            }
            

            
        }
    }
}

