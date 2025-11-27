import React from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "@/lib";

interface Props {
  onFileSelect?: (file: File | null) => void;
  file: File | null;
}

const FileUploader = ({ onFileSelect, file }: Props) => {
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;

      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div {...getRootProps()} className="gradient-border w-full">
      <input {...getInputProps()} />
      <div className="cursor-pointer space-y-4">
        {file ? (
          <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
            <img src="images/pdf.png" alt="pdf" className="size-10" />
            <div className="flex items-center space-x-3">
              <div>
                <p className="max-w-xs truncate text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              className="cursor-pointer p-2"
              onClick={() => {
                onFileSelect?.(null);
              }}
            >
              <img src="icons/cross.svg" alt="remove" className="size-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center">
              <img src="icons/info.svg" alt="upload here" className="size-20" />
            </div>
            <p className="text-lg text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-lg text-gray-500">PDF (max 20MB)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
