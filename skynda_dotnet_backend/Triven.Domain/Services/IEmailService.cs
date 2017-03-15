using Triven.Domain.Results;
using Triven.Domain.ViewModels.Email;

namespace Triven.Domain.Services
{
    public interface IEmailService
    {
        ServiceResult<bool> SendEmailAboutSubscription(EmailSubscribeViewModel viewModel);
        ServiceResult<bool> SendEmailAboutBuyingVehicle(EmailBuyVehicleViewModel viewModel);
        ServiceResult<bool> SendEmailAboutSellingVehicle(EmailSellVehicleViewModel viewModel);
        ServiceResult<bool> SendEmailAboutQuestion(EmailQuestionViewModel viewModel);
    }
}