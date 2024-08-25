/**
 * This type represents a course object.
 */
export interface Course {
  id?: string;
  name: string;
  duration: number;
  totalModules: number;
  totalModulesCompleted?: number;
}
