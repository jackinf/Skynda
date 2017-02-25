using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.ViewModels;

namespace X3Project.Domain.ViewModels.Partner
{
    public class PartnerStatusPutViewModel : IPartnerViewModel
    {
        public string Status { get; set; }
    }
}
