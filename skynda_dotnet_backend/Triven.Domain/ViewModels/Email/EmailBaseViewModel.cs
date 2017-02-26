namespace Triven.Domain.ViewModels.Email
{
    public abstract class EmailBaseViewModel
    {
        public abstract string GetSubject();
        public abstract string GetSender();
        public abstract string GetContent();
    }
}