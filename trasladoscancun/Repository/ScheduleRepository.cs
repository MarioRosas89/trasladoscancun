using Microsoft.EntityFrameworkCore;
using TransferEconomic.Data;

namespace TransferEconomic.Repository
{
    public class ScheduleRepository : IScheduleRepository
    {
        private readonly ApplicationDbContext _appDbContext;

        public ScheduleRepository(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Schedules?> CreateSchedule(Schedules schedule)
        {
            schedule.DateSchedule = schedule.DateSchedule;
            schedule.Price = schedule.Price;
            schedule.ClientName = schedule.ClientName;
            schedule.DriverName = "Mario Rosas";
            _appDbContext.Schedules.Add(schedule);
            await _appDbContext.SaveChangesAsync();
            return null;
        }

    }
}
