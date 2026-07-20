import { notFound } from "next/navigation";
import { COURSES } from "@/lib/learning";
import { CourseDetail } from "@/components/learning/LearningClient";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) notFound();
  return <div className="fadein"><CourseDetail course={course} /></div>;
}
