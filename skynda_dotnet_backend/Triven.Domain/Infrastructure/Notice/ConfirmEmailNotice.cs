using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;
using X3Project.Domain.Infrastructure.Notice;

namespace X3Project.Domain.Infrastructure.Notice
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
