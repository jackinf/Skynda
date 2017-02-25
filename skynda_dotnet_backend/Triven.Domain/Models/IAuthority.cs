﻿using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IAuthority : IAuditableBaseModel
    {
        string Name { get; set; }
    }
}