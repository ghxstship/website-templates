import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CoursesGrid } from "@/components/learning/LearningClient";
import { COURSES } from "@/lib/learning";

export const metadata: Metadata = { title: "Courses" };

export default function CoursesPage() {
  return (
    <div className="fadein">
      <PageHeader kicker={`${COURSES.length} courses`} title="Courses" />
      <CoursesGrid />
    </div>
  );
}
