﻿namespace ECG.Server.Models
{
    public class ResetPasswordRequest
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
