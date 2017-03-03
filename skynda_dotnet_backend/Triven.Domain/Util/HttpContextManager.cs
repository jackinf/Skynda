using System.Web;

namespace Triven.Domain.Util
{
    public class HttpContextManager
    {
        private static HttpContextBase _contextBase;
        public static HttpContextBase Current
        {
            get
            {
                if (_contextBase != null)
                {
                    return _contextBase;
                }

                return HttpContext.Current == null ? null : new HttpContextWrapper(HttpContext.Current);
            }
        }

        public void SetHttpContext(HttpContextBase contextBase)
        {
            _contextBase = contextBase;
        }
    }
}