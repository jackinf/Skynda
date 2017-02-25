using System;
using System.Configuration;
using System.Net.Configuration;
using System.Net.Mail;

namespace Triven.Application.Services.Messages
{
    public class MessageSmtpSenderCommand
    {
        private readonly MailMessage _message;

        public MessageSmtpSenderCommand(MailMessage message)
        {
            _message = message;
        }

        public virtual bool Send()
        {
            try
            {
                //var credentials = new NetworkCredential(
                //    ConfigurationManager.AppSettings["mailAccount"],
                //    ConfigurationManager.AppSettings["mailPassword"]
                //    );
                var smtpSection = (SmtpSection)ConfigurationManager.GetSection("system.net/mailSettings/smtp");
                SmtpClient smtpClient = new SmtpClient(smtpSection.Network.Host);
                //System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("tsoorukant@gmail.com", "");
                //smtpClient.Credentials = credentials;
                smtpClient.EnableSsl = false;


                smtpClient.Send(_message);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
