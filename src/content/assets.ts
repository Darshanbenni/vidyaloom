export interface AssetMeta {
  src: string;
  sourcePath: string;
  width: number;
  height: number;
  alt: string;
  focalPoint: { x: number; y: number };
  aspectRatio: string;
  required: boolean;
}

export const siteAssets: Record<string, AssetMeta> = {
  heroStudents: {
    src: "assets/source/hero-students-desktop.webp",
    sourcePath: "assets/source/hero-students-desktop.webp",
    width: 1643,
    height: 957,
    alt: "Smiling Indian high school students on a modern sunlit campus",
    focalPoint: { x: 79, y: 28 },
    aspectRatio: "12:7",
    required: true,
  },
  heroStudentsMobile: {
    src: "assets/source/hero-students-mobile.webp",
    sourcePath: "assets/source/hero-students-mobile.webp",
    width: 1122,
    height: 1402,
    alt: "Indian high school student portrait on modern campus",
    focalPoint: { x: 60, y: 35 },
    aspectRatio: "4:5",
    required: false,
  },
  trainingStudents: {
    src: "assets/source/training-students.webp",
    sourcePath: "assets/source/training-students.webp",
    width: 1852,
    height: 849,
    alt: "Three Indian students collaborating on a coding project in a modern tech lab",
    focalPoint: { x: 75, y: 45 },
    aspectRatio: "24:11",
    required: true,
  },
  campusAerial: {
    src: "assets/source/campus-aerial.webp",
    sourcePath: "assets/source/campus-aerial.webp",
    width: 2171,
    height: 724,
    alt: "Elevated drone aerial view of modern school campus buildings surrounded by trees",
    focalPoint: { x: 50, y: 50 },
    aspectRatio: "24:7",
    required: true,
  },
  avatarPrincipal: {
    src: "assets/source/avatar-principal.webp",
    sourcePath: "assets/source/avatar-principal.webp",
    width: 1254,
    height: 1254,
    alt: "Dr. Anjali Rao, School Principal",
    focalPoint: { x: 50, y: 50 },
    aspectRatio: "1:1",
    required: true,
  },
  avatarStudent: {
    src: "assets/source/avatar-student.webp",
    sourcePath: "assets/source/avatar-student.webp",
    width: 1254,
    height: 1254,
    alt: "Arjun Mehta, Grade 10 Student",
    focalPoint: { x: 50, y: 50 },
    aspectRatio: "1:1",
    required: true,
  },
  avatarDirector: {
    src: "assets/source/avatar-director.webp",
    sourcePath: "assets/source/avatar-director.webp",
    width: 1254,
    height: 1254,
    alt: "Mr. R. K. Sharma, Director",
    focalPoint: { x: 50, y: 50 },
    aspectRatio: "1:1",
    required: true,
  },
  dashboardPreview: {
    src: "assets/source/dashboard-preview.webp",
    sourcePath: "assets/source/dashboard-preview.webp",
    width: 1604,
    height: 980,
    alt: "Vidyaloom School Management System dashboard product preview",
    focalPoint: { x: 50, y: 50 },
    aspectRatio: "18:11",
    required: false,
  },
};
