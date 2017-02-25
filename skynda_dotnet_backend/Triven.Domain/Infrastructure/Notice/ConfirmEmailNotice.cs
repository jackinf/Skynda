using Triven.Domain.Constants;

namespace Triven.Domain.Infrastructure.Notice
{
    public sealed class ConfirmEmailNotice : NoticeBase
    {
        public const string VarUrl = "{URL}";
        public const string VarEmail = "{EMAIL}";
        public const string VarCompanyName = "{COMPANY_NAME}";

        public ConfirmEmailNotice()
        {
            Name = MessageTemplates.ConfirmEmail.ToString();
            Fields = new[] { VarUrl, VarEmail, VarCompanyName };
        }
    }
}
