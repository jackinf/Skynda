using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using X3Project.Domain.Models;
using X3Project.Domain.Models.Base;

namespace X3Project.Data.EntityFramework.Models.Base
{
    public abstract class BaseModel : IBaseModel
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }
}