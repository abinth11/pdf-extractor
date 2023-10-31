import { FaDownload } from "react-icons/fa";
import { selectPdfUrl } from "../../features/slices/pdfSlice";
import { useSelector } from "react-redux";
import PdfViewer from "../../components/pdf-viewer/PdfViewer";
import { LuView } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {};

function PdfDownloadPage({}: Props) {
  const pdfUrl = useSelector(selectPdfUrl);
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
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <div className='p-10 flex items-center justify-center flex-col'>
        <h1 className='text-3xl font-semibold'>
          Successfully extracted pages...
        </h1>
        <div className='md:mt-10 mt-5 flex items-center '>
          <div title="Go back" className="bg-gray-500 rounded-full p-1 mr-2.5  hover:cursor-pointer hover:bg-primary" >
            <IoMdArrowRoundBack className='text-white w-7 h-7' />
          </div>
          <button
            className='bg-primary flex items-center justify-center hover:bg-secondary text-2xl px-[4.5rem] py-[1.5rem] rounded-xl text-white font-semibold'
            onClick={handleDownloadPdf}
          >
            <FaDownload className='h-7 w-7 mr-1.5' />
            Download File
          </button>
          <div title="View pdf" className='bg-primary rounded-full p-1 ml-2.5 hover:bg-secondary hover:cursor-pointer' >
            <LuView className='text-white w-7 h-7 ' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfDownloadPage;
