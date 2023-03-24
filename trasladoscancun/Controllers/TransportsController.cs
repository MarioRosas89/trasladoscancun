using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransferEconomic.Data;

namespace TransferEconomic.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransportsController : ControllerBase
    {
        private ApplicationDbContext _context;
        private readonly ILogger<TransportsController> _logger;
        public TransportsController(ApplicationDbContext context, ILogger<TransportsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            //_logger.LogInformation("Entro");
            //Utils.SendWhatsapp("Entro un usuario");
            var result =  _context.Places.Select(x => x).ToList();
             return Ok(result);
        }

    }
}
