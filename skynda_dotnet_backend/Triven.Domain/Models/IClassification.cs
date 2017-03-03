﻿using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IClassification : IAuditableBaseModel
    {
        string Description { get; set; }
        bool IsImported { get; set; }
        int Weight { get; set; }
        string Value { get; set; }
        string Name { get; set; }
        bool IsActive { get; set; }
        string Value2 { get; set; }

    }
}