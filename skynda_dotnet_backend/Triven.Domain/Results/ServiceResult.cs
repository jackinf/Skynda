namespace Triven.Domain.Results
{
    public class ServiceResult<TPayload> : ServiceBaseResult<TPayload>
    {
    }


    public class ServiceResult : ServiceBaseResult<ServiceResult>
    {
    }
}