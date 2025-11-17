export interface CourseTeacher {
  courseId: string;
  userId: string;
  profile: {
    id: string;
    name: {
      givenName: string;
      familyName: string;
      fullName: string;
    };
    emailAddress: string;
    photoUrl: string;
    permissions: [
      {
        permission: "PERMISSION_UNSPECIFIED" | "CREATE_COURSE";
      }
    ];
    verifiedTeacher: boolean;
  };
}
