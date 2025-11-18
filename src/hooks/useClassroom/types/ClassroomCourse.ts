export interface DriveFolder {
  id: string;
  title: string;
  alternateLink: string;
}

export interface MaterialDriveFile {
  driveFile: {
    id: string;
    title: string;
    alternateLink: string;
    thumbnailUrl: string;
  };
}

export interface MaterialYouTubeVideo {
  youTubeVideo: {
    id: string;
    title: string;
    alternateLink: string;
    thumbnailUrl: string;
  };
}

export interface MaterialLink {
  link: {
    url: string;
    title: string;
    thumbnailUrl: string;
  };
}

export interface MaterialForm {
  form: {
    formUrl: string;
    responseUrl: string;
    title: string;
    thumbnailUrl: string;
  };
}

export type CourseMaterial =
  | MaterialDriveFile
  | MaterialYouTubeVideo
  | MaterialLink
  | MaterialForm;

export interface CourseMaterialItem {
  title: string;
  materials: CourseMaterial[];
}

export interface CourseMaterialSet {
  title: string;
  materials: CourseMaterialItem[];
}

export type CourseState =
  | "ACTIVE"
  | "ARCHIVED"
  | "PROVISIONED"
  | "DECLINED";

export type CalculationType =
  | "TOTAL_POINTS"
  | "WEIGHTED_CATEGORIES"
  | "WEIGHTED_BY_CATEGORY";

export type DisplaySetting =
  | "SHOW"
  | "HIDE";

export interface GradeCategory {
  id: string;
  name: string;
  weight: number;
}

export interface GradeBookSettings {
  calculationType: CalculationType;
  displaySetting: DisplaySetting;
  gradeCategories: GradeCategory[];
}

export interface ClassroomCourse {
  id: string;
  name: string;
  section?: string;
  descriptionHeading?: string;
  description?: string;
  room?: string;
  ownerId: string;
  creationTime: string;
  updateTime: string;
  enrollmentCode?: string;
  courseState: CourseState;
  alternateLink: string;
  teacherGroupEmail?: string;
  courseGroupEmail?: string;
  teacherFolder?: DriveFolder;
  courseMaterialSets?: CourseMaterialSet[];
  guardiansEnabled: boolean;
  calendarId?: string;
  gradeBookSettings?: GradeBookSettings;
}
