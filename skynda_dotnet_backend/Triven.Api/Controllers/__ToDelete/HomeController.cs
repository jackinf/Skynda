using System.Web.Mvc;

namespace Triven.API.Controllers.__ToDelete
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
