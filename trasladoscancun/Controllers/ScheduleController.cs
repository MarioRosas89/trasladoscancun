using Microsoft.AspNetCore.Mvc;
using TransferEconomic.Data;

namespace TransferEconomic.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleRepository _scheduleRepository;
        public ScheduleController(IScheduleRepository scheduleRepository)
        {
            _scheduleRepository = scheduleRepository;
        }

        [HttpPost]
        public async Task<ActionResult<Schedules>> Post([FromBody] Schedules schedule)
        {
            try
            {
                await _scheduleRepository.CreateSchedule(schedule);
                if (!string.IsNullOrEmpty(schedule.Email))
                {
                    var html = $"<h1>Confirmacion reserva<h1> <p>Desde:{schedule.From}</p><p>Hacia:{schedule.To}</p>" +
                        $"<p>Total:{schedule.Price}</p><p>Fecha:{schedule.DateSchedule}<p>";
                    //Send email to client
                    Utils.sendEmail(schedule.Email, html);
                    //Send email to driver
                    Utils.sendEmail("mrosasg103@gmail.com", html);
                    //Utils.SendWhatsapp();
                }
               
                return schedule;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data" + ex.Message);
            }
        }
    }
}
