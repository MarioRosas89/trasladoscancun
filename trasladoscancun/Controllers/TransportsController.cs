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
        public async Task<IEnumerable<Places>> Get()
        {
            _logger.LogInformation("Entro");
            Utils.SendWhatsapp("Entro un usuario");
             return await _context.Places.Select(x => x).ToListAsync();
        }

    }
}
