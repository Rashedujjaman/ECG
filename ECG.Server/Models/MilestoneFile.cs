namespace ECG.Server.Models
{
    public class MilestoneFile
    {
        public int Id { get; set; }
        public int MilestoneId { get; set; }
        public string? FileName { get; set; }
        public byte[]? FileData { get; set; }
        public DateTimeOffset? UploadDate { get; set; }

    }
}
