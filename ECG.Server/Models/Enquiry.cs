namespace ECG.Server.Models
{
    public class Enquiry
    {
        public int Id { get; set; }
        public  required string  Name { get; set; }
        public required string Email { get; set; }
        public required string Address { get; set; }
        public required string MobileNo { get; set; }
        public required string Message { get; set; }
        public DateTimeOffset? DateTime { get; set; }

    }
}
