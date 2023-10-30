import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer: React.FC<{ pdfData: string }> = ({ pdfData }) => {
  const plugin = defaultLayoutPlugin() as any;
  return (
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@latest/build/pdf.worker.min.js'>
      <Viewer
        fileUrl={pdfData}
        plugins={[plugin]}
      />
    </Worker>
  );
};

export default PdfViewer;
