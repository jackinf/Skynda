namespace Triven.Domain.ViewModels.Email
{
    public class EmailSubscribeViewModel : EmailBaseViewModel
    {
        public string Email;

        public override string GetSubject() => "Email subscription";
        public override string GetSender() => Email;
        public override string GetContent() => $"{Email} wants to be subscribed";
    }
}