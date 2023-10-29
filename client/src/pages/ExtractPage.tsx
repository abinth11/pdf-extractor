import { useEffect, useState } from "react";
import PdfApi from "../api/pdfApi";

type Props = {};

function ExtractPage({}: Props) {
  const [pdf, setPdf] = useState<string>("");
  const pdfApi = new PdfApi();
  const fetchPdf = async () => {
    try {
      const response = await pdfApi.fetchPdfById("76be22c5-c9f0-4d95-bf3c-fcbdc628bd95.pdf");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPdf();
  }, []);
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <div className='p-10'>ExtractPage</div>
    </div>
  );
}

export default ExtractPage;
