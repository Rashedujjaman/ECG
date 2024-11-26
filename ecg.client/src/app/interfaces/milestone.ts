import { MilestoneFile } from './milestone-file';
export interface Milestone {
  id: number,
  title: string,
  files: MilestoneFile[],
  uploadDate?: Date
}
