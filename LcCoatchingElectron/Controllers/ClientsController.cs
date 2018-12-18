using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LcCoatchingElectron.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;


namespace LcCoatchingElectron.Controllers
{
    [Route("api/[controller]")]
    public class ClientsController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            DbContext context = HttpContext.RequestServices.GetService(typeof(DbContext)) as DbContext;

            return View(context.GetClients());
        }

        [HttpGet("[action]")]
        public IEnumerable<Client> GetAllClients()
        {
            DbContext context = HttpContext.RequestServices.GetService(typeof(DbContext)) as DbContext;
            return context.GetClients();
        }
   
    }
}

