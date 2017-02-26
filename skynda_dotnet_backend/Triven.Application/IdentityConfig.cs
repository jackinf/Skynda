using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Triven.Application.Services.Messages;
using Triven.Data.EntityFramework;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.ViewModels.Email;

namespace Triven.Application
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.
    public class ApplicationUserManager : AppUserManager
    {
        public ApplicationUserManager(IAppUserStore store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new AppUserStore(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<AppUser, int>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            manager.EmailService = new EmailService();
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<AppUser, int>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            
            return manager;
        }
    }

    /// <summary>
    /// Sends email to new partner to confrim email
    /// </summary>
    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            return configSendGridasync(message);
        }

        public Task SendAsync(EmailBaseViewModel viewModel)
        {
            return configSendGridasync(new IdentityMessage
            {
                Destination = viewModel.GetSender(),
                Subject = viewModel.GetSubject(),
                Body = viewModel.GetContent()
            });
        }

        private Task configSendGridasync(IdentityMessage message)
        {
            var myMessage = new MailMessage();
            myMessage.To.Add(message.Destination);
            myMessage.From = new MailAddress(
                                "noreply@speys.com", "Speys");
            myMessage.Subject = message.Subject;

            string text = message.Body;
            string html = message.Body;
            myMessage.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(text, null, MediaTypeNames.Text.Plain));
            myMessage.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(html, null, MediaTypeNames.Text.Html));

            // Create a SMTP for sending email.
            var transportWeb = new MessageSmtpSenderCommand(myMessage);

            // Send the email.
            if (transportWeb.Send())
            {
                return Task.FromResult(myMessage);
            }
            else
            {
                return Task.FromResult(0);
            }
        }
    }
}
