import React, { useState, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import './App.css';
import { Label } from "./components/ui/label"
import { Button } from "@/components/ui/button"
import { useDropzone } from 'react-dropzone'

function App() {
  type ConvertedImage = {
    name: string;
    blob: Blob;
    webpUrl: string;
  };
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);

  const handleFiles = async (files: File[]) => {
    // const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        if(!ctx) return;

        ctx.drawImage(image, 0, 0);
        // Convert to WebP
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpName = `${file.name.split(".")[0]}.webp`;
              const webpUrl = URL.createObjectURL(blob);
              setConvertedImages((prev) => [
                ...prev,
                { name: webpName, blob, webpUrl },
              ]);
            }
          },
          "image/webp",
          0.8 // quality
        );
      };
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFiles(files);
  };


  const handleDownloadZip = async () => {
    const zip = new JSZip();
    const folder = zip.folder("webp-images");

    if(!folder) return;

    convertedImages.forEach((img) => {
      const newName = img.name.replace(/\.webp$/, "-converted.webp");
      folder.file(newName, img.blob);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "converted-images.zip");
    window.location.reload()
  };

  return (
    <div className="max-w-[1400px] min-h-screen mx-auto flex flex-col gap-5 justify-center align-center">
      <h1 className="text-center">Multi-Image to WebP Converter + ZIP</h1>
      <Label {...getRootProps()} htmlFor="image-upload" className="block max-w-sm rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 text-center hover:border-blue-500 transition duration-200">
        <input
          // {...getInputProps()}
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-2 h-8 w-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 15a4 4 0 004 4h10a4 4 0 004-4m-4-4l-4-4m0 0L8 11m4-4v12"
          />
        </svg>
        <span className="text-sm text-black">
          {isDragActive
            ? 'Drop the files here ...'
            : 'Click to upload images or drag and drop'} 
        </span>
      </Label>

      {convertedImages.length > 0 && (
        <>
          <Button variant="outline" className="mx-auto" onClick={handleDownloadZip}>Download All as ZIP</Button>
        </>
      )}
    </div>
  );
}

export default App;
