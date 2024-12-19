namespace ECG.Server.Models
{
    public class SolidTyreRib
    {
        public int Id { get; set; }
        public string? Size { get; set; }
        public string? Rimsize { get; set; }
        public string? Weight { get; set; }
        public int? MM { get; set; }
        public int? Width { get; set; }
        public int? LoadBearing { get; set; }
        public int? Steering { get; set; }
        public int? Category { get; set; }
        public bool? isDeleted { get; set; }
    }
}
