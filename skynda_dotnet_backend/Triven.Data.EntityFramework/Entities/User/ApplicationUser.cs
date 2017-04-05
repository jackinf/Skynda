using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Triven.Domain.Constants;
using Triven.Domain.Helpers;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Entities.User
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : AppUser, IApplicationUser
    {
        public override int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int DriverId { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; }
        public string DefaultLanguage { get; set; }
        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Status")]
        public string StatusString
        {
            get { return Status.ToString(); }
            private set { Status = value.ParseEnum<Status>(); }
        }

        [NotMapped]
        public Status Status { get; set; }

        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public DateTime? CreatedOn { get; set; }

        public string ModifierUserIp { get; set; }

        public virtual IApplicationUser Creator { get; set; }
        public virtual IApplicationUser Modifier { get; set; }
        public virtual IApplicationUser Remover { get; set; }
        
        /// <summary>
        /// Needed for password validation 
        /// NB! Do not remove attributes
        /// </summary>
        [NotMapped]
        public string Password { get; set; }
        [NotMapped]
        public string PasswordConfirm { get; set; }        

        public string GetFullName()
        {
            string name = FirstName;
            if (!string.IsNullOrEmpty(LastName))
                name += " " + LastName;
            return name;
        }
        [Obsolete("Not needed")]
        public virtual List<UserContactInfo> ContactInfos { get; set; } = new List<UserContactInfo>();
    }


    public class AppUser :
            IdentityUser<int, AppUserLogin, AppUserRole, AppUserClaim>,
            IUser<int>
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(AppUserManager manager,
            string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class AppUserLogin : IdentityUserLogin<int>
    {
    }

    public class AppUserRole : IdentityUserRole<int>
    {
    }

    public class AppUserClaim : IdentityUserClaim<int>
    {
    }

    public class AppRole : IdentityRole<int, AppUserRole>
    {
    }
    public class AppClaimsPrincipal : ClaimsPrincipal
    {
        public AppClaimsPrincipal(ClaimsPrincipal principal) : base(principal)
        {
        }

        public int UserId
        {
            get { return int.Parse(this.FindFirst(ClaimTypes.Sid).Value); }
        }
    }

    public interface IAppUserStore : IUserStore<AppUser, int>
    {
    }

    public class AppUserStore :
        UserStore<AppUser, AppRole, int, AppUserLogin, AppUserRole, AppUserClaim>,
        IAppUserStore
    {
        public AppUserStore() : base(new ApplicationDbContext())
        {
        }

        public AppUserStore(ApplicationDbContext context) : base(context)
        {
        }
    }

    public class AppUserManager : UserManager<AppUser, int>
    {
        public AppUserManager(IAppUserStore store) : base(store)
        {
        }
    }

    public class ApplicationRoleManager : RoleManager<AppRole, int>
    {
        public ApplicationRoleManager(IRoleStore<AppRole, int> roleStore) : base(roleStore)
        {
        }

        public static ApplicationRoleManager Create(IdentityFactoryOptions<ApplicationRoleManager> options, IOwinContext context)
        {
            return new ApplicationRoleManager(new RoleStore<AppRole, int, AppUserRole>(context.Get<ApplicationDbContext>()));
        }
    }
}
