using System.ComponentModel.DataAnnotations;

namespace TransferEconomic.Data
{
    public class Schedules
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateSchedule { get; set; }
        public string? ClientName { get; set; }
        public string? DriverName { get; set; }
        public int Price { get; set; }
        public string? Email { get; set; }
        public string? From { get; set; }
        public string? To { get; set; }
        public string? PhoneNumber { get; set; }

    }
}
