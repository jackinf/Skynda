namespace Triven.Domain.ViewModels.Email
{
    public class EmailQuestionViewModel : EmailBaseViewModel
    {
        public string HowCanWeHelp { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public override string GetSubject() => "There is a question";
        public override string GetSender() => Email;
        public override string GetContent() => "User " + Name + " (" + Email + ") a question: " + HowCanWeHelp;
    }
}