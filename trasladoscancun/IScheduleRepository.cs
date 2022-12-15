using TransferEconomic.Data;

namespace TransferEconomic
{
    public interface IScheduleRepository
    {
        Task<Schedules?> CreateSchedule(Schedules schedule);
    }
}