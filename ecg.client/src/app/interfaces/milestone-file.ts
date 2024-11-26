export interface MilestoneFile {
  id: number;
  milestoneId?: number;
  fileName?: string;
  fileData?: Blob;
  uploadDate?: Date;
}
