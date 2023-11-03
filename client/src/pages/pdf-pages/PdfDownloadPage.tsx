import { FaDownload } from "react-icons/fa";
import { selectPdfUrl } from "../../features/slices/pdfSlice";
import { useSelector } from "react-redux";
import { LuView } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiSave } from "react-icons/fi";
import { selectIsLoggedIn } from "../../features/slices/userSlice";
import {  useNavigate, useParams } from "react-router-dom";
import LoginModal from "../../components/modal/LoginModal";
import { useState } from "react";
import PdfApi from "../../api/pdfApi";
import { notify } from "../../components/notify/notify";

type Props = {};

function PdfDownloadPage({}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [saving,setSaving] = useState<boolean>(false);
  const navigate = useNavigate()
  const user = useSelector(selectIsLoggedIn);
  const { downloadId } = useParams();
  const pdfApi = new PdfApi();
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

  const handleGoBack = ()=> navigate('/')

  const handleSaveFile = () => {
    if (user) {
      setSaving(true)
      pdfApi
        .savePdf(downloadId as string)
        .then((res:any) => {
          notify("success",res.data.message as string)
          setSaving(false)
          console.log(res);
        })
        .catch((err) => {
          setSaving(false)
          notify("error",err?.response?.data?.message as string)
        });
    } else {
      setOpen(true);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <LoginModal open={open} setOpen={setOpen} />
      <div className='p-10 flex items-center justify-center flex-col'>
        <h1 className='text-3xl font-semibold'>
          Successfully extracted pages...
        </h1>
        <div className='md:mt-10 mt-5 flex items-center '>
          <div
            title='Go back'
            onClick={handleGoBack}
            className='bg-gray-500 rounded-full p-1 mr-2.5  hover:cursor-pointer hover:bg-primary'
          >
            <IoMdArrowRoundBack className='text-white w-7 h-7' />
          </div>
          <button
            className='bg-primary flex items-center justify-center hover:bg-secondary text-xl md:text-2xl px-[4rem] md:px-[4.5rem] py-[1.2rem] md:py-[1.5rem] rounded-xl text-white font-semibold'
            onClick={handleDownloadPdf}
          >
            <FaDownload className='h-7 w-7 mr-1.5' />
            Download File
          </button>
          <div className='flex flex-col justify-between h-[4.9rem]'>
            <div
              title='View pdf'
              className='bg-primary rounded-full p-2 shadow-lg ml-2.5 hover:bg-secondary hover:cursor-pointer'
            >
              <LuView className='text-white w-5 h-5 ' />
            </div>
            <div
              onClick={handleSaveFile}
              aria-disabled={saving}
              title='Save to your account'
              className={`${saving&&"cursor-not-allowed"} bg-primary rounded-full p-2 ml-2.5 shadow-lg hover:bg-secondary hover:cursor-pointer`}
            >
              <FiSave className='text-white w-5 h-5' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfDownloadPage;
