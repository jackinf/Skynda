using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Configuration;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace X3Project.Application.Services.Messages
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
