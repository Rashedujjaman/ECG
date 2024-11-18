namespace ECG.Server.Models
{
    public class Milestone
    {
    public int Id { get; set; }
        public string? Title { get; set; }
        public DateTime? UploadDate { get; set; }
        public virtual ICollection<MilestoneFile>? MilestoneFiles { get; set; }

    }
}
