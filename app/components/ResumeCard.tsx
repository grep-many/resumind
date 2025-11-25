import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

type Props = {
  resume: Resume;
};

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: Props) => (
  <Link
    to={`/resume/${id}`}
    className="resume-card motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000"
  >
    <div className="resume-card-header">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold wrap-break-word text-black!">{companyName}</h2>
        <h3 className="text-lg wrap-break-word text-gray-500">{jobTitle}</h3>
      </div>
      <div className="shrink-0">
        <ScoreCircle score={feedback.overallScore} />
      </div>
    </div>
    <div className="gradient-border motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000">
      <div className="h-full w-full">
        <img
          src={imagePath}
          alt="resume"
          className="h-[350px] w-full object-cover object-top max-sm:h-[200px]"
        />
      </div>
    </div>
  </Link>
);

export default ResumeCard;
