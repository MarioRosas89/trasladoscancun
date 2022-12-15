using System.Net.Mail;
using System.Net;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

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
                mail.From = new MailAddress("mariorosas103@hotmail.com");
                mail.Subject = "Confirmacion de reserva";
                mail.Body = bodyTemplate;
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient("smtp.office365.com", 587);
                
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("mariorosas103@hotmail.com", "Micro1145");
                //gqkwmpplnvyxljpg
                smtp.Send(mail);

            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static void SendWhatsapp()
        {
            try
            {
                TwilioClient.Init("AC3215d39b66916f302ea3ffbd8c0e1bad", "df3e822b16ba8c80b4a14c6f1177704e");

                var send = MessageResource.Create(
                    body: "Hello there!",
                    from: new Twilio.Types.PhoneNumber("whatsapp:+18586677180"),
                    to: new Twilio.Types.PhoneNumber("whatsapp:+529982396905")
                );

            }
            catch (Exception)
            {

                throw;
            }
            

            
        }
    }
}

