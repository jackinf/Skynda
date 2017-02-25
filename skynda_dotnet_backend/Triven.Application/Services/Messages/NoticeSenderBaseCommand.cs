using System.Linq;
using System.Net.Mail;
using System.Web.UI.WebControls;
using Triven.Domain.Constants;
using Triven.Domain.Infrastructure.Notice;
using Triven.Domain.Repositories.Message;

namespace Triven.Application.Services.Messages
{
    /// <summary>
    /// Send notices by email (SMTP)
    /// </summary>
    /// <typeparam name="TNotice"></typeparam>
    public sealed class NoticeSenderBaseCommand<TNotice> where TNotice : NoticeBase, new()
    {
        private MessageTemplates MessageTemplateName { get; set; }
        private Language Locale { get; set; }

        public TNotice Notice { get; set; }

        public NoticeSenderBaseCommand(MessageTemplates templateName, Language locale)
        {
            MessageTemplateName = templateName;
            Locale = locale;
            Notice = new TNotice();
        }

        /// <summary>
        /// Send notice
        /// </summary>
        /// <returns></returns>
        public bool Send()
        {
            //GetMessageTemplate();
            if (Notice.GetTemplate() == null)
                return false;

            MailMessage message = CreateMessage(Notice);
            if (!string.IsNullOrEmpty(message.Body) && message.To.Count > 0)
            {
                var smtpCmd = new MessageSmtpSenderCommand(message);
                if (smtpCmd.Send())
                    return true;
            }
            return false;
        }

        ///// <summary>
        ///// Find notice message template form database
        ///// </summary>
        ///// <returns></returns>
        //private MessageTemplateModel GetMessageTemplate()
        //{
        //    var repository = IoC.Get<IMessageRepository<MessageTemplateModel>>();
        //    var template = repository.GetByNameAndLocale(MessageTemplateName.ToString(), Locale.ToString());
        //    if (template != null)
        //        Notice.SetTemplate(template);
        //    return null;
        //}

        /// <summary>
        /// Creates mailmessage from template
        /// </summary>
        /// <param name="notice"></param>
        /// <returns></returns>
        private MailMessage CreateMessage(NoticeBase notice)
        {
            MailMessage message = new MailMessage();
            message.From = new MailAddress(
                               "no-reply@speys.com", "Speys");
            var template = notice.GetTemplate();
            if (template == null)
                return message;

            var recipients = notice.GetRecipients();
            if (recipients == null || !recipients.Any())
                return message;

            MailDefinition md = new MailDefinition();
            md.IsBodyHtml = true;
            md.Subject = template.Title;
            message = md.CreateMailMessage(recipients.FirstOrDefault().Address, notice.GetReplacementFields(), template.Message, new System.Web.UI.Control());

            //Let's add multiple recipents
            for (int i = 0; i < recipients.Count; i++)
            {
                if (i > 0)
                {
                    message.To.Add(recipients[i]);
                }
            }

            return message;
        }
    }
}
