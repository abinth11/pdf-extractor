import { IoMdArrowRoundBack } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import PdfViewer from "./PdfViewer";

type Props = { pdfUrl: string; setViewExtractedPdf: (val: boolean) => void };

function ViewExtractedPdf({ pdfUrl, setViewExtractedPdf }: Props) {
  const handleDownloadPdf = () => {
    if (pdfUrl) {
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = pdfUrl;
      a.download = "downloaded.pdf";
      document.body.appendChild(a);
      a.click();

      // Clean up by revoking the temporary URL
      URL.revokeObjectURL(pdfUrl);
    }
  };
  return (
    <div className='p-10 lg:py-15 lg:px-20 h-[41rem] w-full'>
      <div className='w-full flex justify-between items-center mb-2'>
        <button
          onClick={() => {
            setViewExtractedPdf(false);
          }}
          className='text-primary flex shadow-black hover:text-secondary  font-semibold'
        >
          <IoMdArrowRoundBack className='mt-1 mr-1 w-4 h-4' />
          <span>Back</span>
        </button>
        <button
          onClick={handleDownloadPdf}
          className='text-primary flex shadow-black hover:text-secondary  font-semibold'
        >
          <HiDownload className='mt-1 mr-1 w-4 h-4' />
          <span>Download</span>
        </button>
      </div>
      <PdfViewer pdfData={pdfUrl} />
    </div>
  );
}

export default ViewExtractedPdf;
