using System.Net.Mail;

namespace Triven.FunctionalTests.SimpleTests
{
    public class EmailTest
    {
        //[Test]
        public void should_send_email1()
        {
            System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
            mail.To.Add("hello@triven.eu");
            mail.From = new MailAddress("zeka.rum@gmail.com", "Email head", System.Text.Encoding.UTF8);
            mail.Subject = "This mail is send from asp.net application";
            mail.SubjectEncoding = System.Text.Encoding.UTF8;
            mail.Body = "This is Email <b>Body Text</b>";
            mail.BodyEncoding = System.Text.Encoding.UTF8;
            mail.IsBodyHtml = true;
            mail.Priority = MailPriority.High;

            SmtpClient client = new SmtpClient();
            client.Credentials = new System.Net.NetworkCredential("zeka.rum@gmail.com", "krmp dehy lixe ihwq");
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Send(mail);
        }
    }
}