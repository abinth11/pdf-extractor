import { useEffect, useState } from "react";
import PdfApi from "../api/pdfApi";
import PdfViewer from "../components/pdv-viewer/PdfViewer";

type Props = {};

function ExtractPage({}: Props) {
  const [pdfData, setPdfData] = useState<string | null>(null); // Use Uint8Array to store binary data
  const [selectedMode, setSelectedMode] = useState<string>("range");
  const [from, setFrom] = useState<string>(""); // Initialize with "0" to ensure it's a positive number.
  const [to, setTo] = useState<string>(""); // Initialize with "0" to ensure it's a positive number.
  const [numberOfPages, setNumberOfPages] = useState<number>(10);
  const pdfApi = new PdfApi();

  const fetchPdf = async () => {
    try {
      const response = await pdfApi.fetchPdfById(
        "76be22c5-c9f0-4d95-bf3c-fcbdc628bd95.pdf"
      );
      if (response?.data) {
        // Set the binary PDF data received from the server in the state
        const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        console.log(url)
        setPdfData(url)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPdf();
  }, []);

  useEffect(() => {}, []);

  const selectedClass =
    "border-primary border-2 focus:scale-105 focus:ring-2 ring-primary";

  return (
    <div className='flex justify-between items-center w-full h-screen overflow-hidden overflow-y-hidden'>
      <div className='w-9/12 h-full'>
        ExtractPage
        {pdfData && (
        <PdfViewer pdfData={pdfData}/>
      )}
      </div>
      <div className='w-3/12 h-full border-l border-slate-300'>
        <div className='w-full h-2/6'>
          <div className='flex p-5 justify-center items-center border-b border-slate-300'>
            <h1 className='text-2xl font-semibold'>Extract</h1>
          </div>
          <div className='p-5 w-full'>
            <h3 className='font-semibold text-lg'>Mode</h3>
            <div className='mt-2 flex justify-between gap-x-3 w-full'>
              <div
                className={`p-4 w-1/2 shadow-sm bg-light_shade transform transition-transform duration-300 rounded-lg border cursor-pointer ${
                  selectedMode === "range"
                    ? selectedClass
                    : "hover:border-light_black border-2"
                }`}
                onClick={() => {
                  setSelectedMode("range");
                }}
              >
                Extract by range
              </div>
              <div
                className={`p-4 bg-light_shade shadow-sm w-1/2 transform transition-transform duration-300 rounded-lg border cursor-pointer ${
                  selectedMode === "random"
                    ? selectedClass
                    : "hover:border-light_black border-2"
                }`}
                onClick={() => {
                  setSelectedMode("random");
                }}
              >
                Extract random
              </div>
            </div>
            {selectedMode === "range" ? (
              <div className='w-full mt-8'>
                <div className='w-full'>Select a range to extract:</div>
                <div className='flex mt-3 justify-between w-full gap-x-3'>
                  <div className='flex border border-slate-300 w-1/2 rounded-lg'>
                    <div className=' w-1/2 border-r border-slate-300 h-full flex items-center justify-center p-2'>
                      from:
                    </div>
                    <div className='w-1/2'>
                      <input
                        type='number'
                        name='from'
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setFrom(value.toString());
                          }
                        }}
                        value={from}
                        className='w-[4.2rem] ml-2 h-full p-1  appearance-none outline-none focus:none'
                      />
                    </div>
                  </div>
                  <div className='flex border border-slate-300 w-1/2 rounded-lg'>
                    <div className=' w-1/2 border-r border-slate-300 h-full flex items-center justify-center p-2'>
                      to:
                    </div>
                    <div className='w-1/2'>
                      <input
                        value={to}
                        name='to'
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setTo(value.toString());
                          }
                        }}
                        type='number'
                        className='w-[4.2rem] ml-2 h-full p-1  appearance-none outline-none focus:none'
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col mt-8'>
                <div className='w-full'>
                  Mark the checkboxes to extract random pages:
                </div>
                <div className='mt-3 w-full flex flex-wrap h-[17.5rem] p-2 shadow-md border overflow-y-scroll bg-light_shade'>
                  {Array.from({ length: numberOfPages }).map((val, index) => (
                    <label
                      key={index}
                      className='flex items-center flex-col space-x-2 mr-2 mt-2'
                    >
                      <input
                        type='checkbox'
                        className='form-checkbox text-primary h-5 w-5 border-primary'
                      />
                      <span className='text-md'>{index + 1}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex  h-4/6 justify-center items-center  mt-20 p-5'>
          <button className='bg-primary hover:bg-secondary text-xl px-[3.5rem] py-[1rem] rounded-xl text-white font-semibold'>
            Extract PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExtractPage;