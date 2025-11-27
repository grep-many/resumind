import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "../lib";
import React from "react";
import Summary from "../components/Summary";
import ATS from "../components/ATS";
import Details from "../components/Details";

export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "Detailed overview of your resume!" },
];

const Resume = () => {
  const { id } = useParams();
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [imageUrl, setImageUrl] = React.useState("");
  const [resumeUrl, setResumeUrl] = React.useState("");
  const [feedback, setFeedback] = React.useState<Feedback | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  React.useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };

    loadResume();
  }, [id]);

  return (
    <main className="pt-0!">
      <nav className="resume-nav sticky top-0 z-1000 bg-white/30 backdrop-blur-2xl">
        <Link to="/" className="back-button">
          <img src="/resumind/icons/back.svg" alt="logo" className="size-2.5" />
          <span className="text-sm font-semibold text-gray-800">Back to Homepage</span>
        </Link>
      </nav>
      <div className="mt-2 flex w-full flex-row max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/resumind/images/bg-small.svg') sticky top-0 h-screen items-center justify-center overflow-hidden bg-cover">
          {imageUrl && resumeUrl && (
            <div className="motion-safe:animate-in motion-safe:fade-in gradient-border h-[90%] w-fit motion-safe:duration-1000 max-2xl:h-fit max-sm:m-0">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="resume preview"
                  className="h-full w-full rounded-2xl object-contain"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl font-bold text-black!">Resume Review</h2>
          {feedback ? (
            <div className="motion-safe:animate-in motion-safe:fade-in flex flex-col gap-8 motion-safe:duration-1000">
              Summary ATS Details
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <>
              <img src="/resumind/images/resume-scan-2.gif" alt="fetching" className="w-full" />
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
