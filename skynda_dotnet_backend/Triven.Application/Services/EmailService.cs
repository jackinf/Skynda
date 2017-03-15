using System;
using System.Net.Mail;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Email;

namespace Triven.Application.Services
{
    /// <summary>
    /// Sends email to new partner to confrim email
    /// </summary>
    public class EmailService : IEmailService
    {
        public ServiceResult<bool> SendEmailAboutSubscription(EmailSubscribeViewModel viewModel) => Send(viewModel);
        public ServiceResult<bool> SendEmailAboutBuyingVehicle(EmailBuyVehicleViewModel viewModel) => Send(viewModel);
        public ServiceResult<bool> SendEmailAboutSellingVehicle(EmailSellVehicleViewModel viewModel) => Send(viewModel);
        public ServiceResult<bool> SendEmailAboutQuestion(EmailQuestionViewModel viewModel) => Send(viewModel);

        private ServiceResult<bool> Send(EmailBaseViewModel viewModel)
        {
            var subject = viewModel.GetSubject();
            var body = viewModel.GetContent();

            MailMessage mail = new MailMessage();
            mail.To.Add("hello@triven.eu");
            mail.From = new MailAddress("zeka.rum@gmail.com", "Triven Notifier", System.Text.Encoding.UTF8);
            mail.Subject = subject;
            mail.SubjectEncoding = System.Text.Encoding.UTF8;
            mail.Body = body;
            mail.BodyEncoding = System.Text.Encoding.UTF8;
            mail.IsBodyHtml = true;
            mail.Priority = MailPriority.High;

            SmtpClient client = new SmtpClient();
            client.Credentials = new System.Net.NetworkCredential("zeka.rum@gmail.com", "krmp dehy lixe ihwq");
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;

            try
            {
                client.Send(mail);
                return ServiceResult<bool>.Factory.Success();
            }
            catch (Exception e)
            {
                return ServiceResult<bool>.Factory.Fail(e);
            }
        }
    }
}