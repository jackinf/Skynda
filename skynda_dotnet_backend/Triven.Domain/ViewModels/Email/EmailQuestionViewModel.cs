namespace Triven.Domain.ViewModels.Email
{
    public class EmailQuestionModel
    {
        public string HowCanWeHelp { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public string GetSender()
        {
            return Email;
        }

        public string GetContent()
        {
            return "User " + Name + " (" + Email + ") a question: " + HowCanWeHelp;
        }
    }
}