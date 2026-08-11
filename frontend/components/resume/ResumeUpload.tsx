"use client";

import { ChangeEvent, useState } from "react";
import {
  CheckCircle2,
  FileText,
  Upload,
  X,
} from "lucide-react";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold">
          Resume
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Upload your latest resume in PDF format.
        </p>
      </div>

      {!file ? (
        <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-10 text-center transition-colors hover:border-primary/50 hover:bg-primary/5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>

          <h3 className="mt-4 font-semibold">
            Upload your resume
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Click to browse and select a PDF file
          </p>

          <span className="mt-3 text-xs text-muted-foreground">
            PDF only
          </span>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="mt-6 rounded-2xl border bg-muted/20 p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium">
                  {file.name}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Remove resume"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            Resume selected successfully
          </div>

          <button
            type="button"
            className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Upload Resume
          </button>
        </div>
      )}
    </div>
  );
}