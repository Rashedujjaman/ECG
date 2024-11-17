namespace ECG.Server.Models
{
    public class Enquiry
    {
        public int Id { get; set; }
        public  required string  Name { get; set; }
        public required string Email { get; set; }
        public string? Address { get; set; }
        public string? MobileNo { get; set; }
        public string? Message { get; set; }
        public DateTimeOffset? DateTime { get; set; }

    }
}
