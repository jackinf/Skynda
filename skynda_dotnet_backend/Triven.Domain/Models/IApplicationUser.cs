using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.X509Certificates;
using X3Project.Domain.Constants;
using X3Project.Domain.Models.Base;
using X3Project.Domain.Models.User;

namespace X3Project.Domain.Models
{
    public interface IApplicationUser : IAuditableBaseModel
    {
        /// <summary>
        /// First name
        /// </summary>
        string FirstName { get; set; }
        /// <summary>
        /// Last name
        /// </summary>
        string LastName { get; set; }
        /// <summary>
        /// Id for driver association
        /// </summary>
        int DriverId { get; set; }
        /// <summary>
        /// User account is active
        /// </summary>
        bool IsActive { get; set; }
        /// <summary>
        /// Is admin account
        /// </summary>
        bool IsAdmin { get; set; }
        /// <summary>
        /// Account status
        /// </summary>
        Status Status { get; set; }

        /// <summary>
        /// Default language
        /// </summary>
        string DefaultLanguage { get; set; }
        //ICollection<TContactInfo> ContactInfos { get; set; }

    }
}