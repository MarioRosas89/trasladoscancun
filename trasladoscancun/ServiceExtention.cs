using TransferEconomic.Repository;

namespace TransferEconomic
{
    public static class ServiceExtention
    {
        public static void RegisterRepos(this IServiceCollection collection)
        {
            collection.AddTransient<IScheduleRepository, ScheduleRepository>();
            //Add other repositories
        }
    }
}
