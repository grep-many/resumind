import Navbar from "@/components/Navbar";
import React from "react";
import FileUploader from "../components/FileUploader";

const Upload = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [statusText, setStatusText] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-description");
  };

  return (
    <main className='bg-[url("/images/bg-main.svg")] bg-cover'>
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="images/resume-scan.gif" alt="scanning..." className="w-full" />
            </>
          ) : (
            <>Drop your resume for an ATS score and improvement tips</>
          )}
          {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  id="job-description"
                  className="resize-none"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Job Description</label>
                <FileUploader onFileSelect={handleFileSelect} file={file} />
              </div>
              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
