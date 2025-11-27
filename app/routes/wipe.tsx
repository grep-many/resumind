import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "@/lib";
import Navbar from "~/app/components/Navbar";

const WipeApp = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [wiping, setWiping] = useState(false);

  const loadFiles = async () => {
    setLoadingFiles(true);
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
    setLoadingFiles(false);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    setWiping(true);
    try {
      for (const file of files) {
        await fs.delete(file.path);
      }
      await kv.flush();
      await loadFiles();
    } finally {
      setWiping(false);
      navigate("/");
    }
  };

  return (
    <main className='min-h-screen bg-[url("/resumind/images/bg-main.svg")] bg-cover'>
      <Navbar />

      <section className="main-section py-16">
        <div className="page-heading">
          <h1>Wipe App Data</h1>
          <h2 className="max-w-2xl">
            Remove all stored files and cached app data. This action cannot be undone.
          </h2>
        </div>

        {/* Status */}
        <div className="mt-4 text-center text-lg opacity-80">
          Authenticated as: <span className="font-semibold">{auth.user?.username}</span>
        </div>

        {/* File List */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <h3 className="mb-4 text-2xl font-semibold">Existing Files</h3>

          {loadingFiles && <img src="/resumind/images/resume-scan-2.gif" className="w-[150px]" />}

          {!loadingFiles && files.length === 0 && (
            <p className="text-lg opacity-70">No files found.</p>
          )}

          {!loadingFiles && files.length > 0 && (
            <div className="flex w-full max-w-xl flex-col gap-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex justify-between rounded-lg border bg-white/60 p-4 shadow-sm backdrop-blur"
                >
                  <p className="font-medium">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Wipe Button */}
        <div className="mt-12 flex justify-center">
          <button
            className={`primary-button px-8 py-3 text-xl font-semibold ${
              wiping ? "opacity-50" : ""
            }`}
            disabled={wiping}
            onClick={handleDelete}
          >
            {wiping ? "Wiping..." : "Wipe App Data"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default WipeApp;
