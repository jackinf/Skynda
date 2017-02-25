using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Domain.Models.Base;

namespace Triven.Data.EntityFramework.Models.Base
{
    public abstract class BaseModel : IBaseModel
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }
}