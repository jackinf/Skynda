namespace Triven.Domain.Constants
{
    /// <summary>
    /// Application message template names
    /// </summary>
    public enum MessageTemplates
    {
        /// <summary>
        /// Email for confirm new partner account email
        /// </summary>
        ConfirmEmail = 1,

        /// <summary>
        /// Email for admin user (partner email is confirmed)
        /// </summary>
        PartnerEmailIsConfirmed = 2
    }
}
