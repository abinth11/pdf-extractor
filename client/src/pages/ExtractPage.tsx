import { useEffect, useState } from "react";
import PdfApi from "../api/pdfApi";
import { useParams } from "react-router-dom";
import PdfViewer from "../components/pdv-viewer/PdfViewer";

type Props = {};

function ExtractPage({}: Props) {
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<"range" | "random">("range");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [random, setRandom] = useState<number[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(10);
  const { pdfId } = useParams();
  const pdfApi = new PdfApi();
  const fetchPdf = async () => {
    try {
      const response = await pdfApi.fetchPdfById(pdfId as string);
      const totalPages = response.headers["x-total-pages"];
      setNumberOfPages(totalPages);
      if (response?.data) {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setPdfData(fileURL as string);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchPdf();
  }, []);

  const handleCheckBoxChange = (value: number) => {
    if (random?.includes(value)) {
      setRandom(random.filter((item) => item !== value));
    } else {
      setRandom([...random, value]);
    }
  };

  const handleExtract = async () => {
    try {
      const response = await pdfApi.extractPages(
        pdfId as string,
        selectedMode === "random"
          ? random
          : { from: parseInt(from), to: parseInt(to) }
      );
      console.log(response);
      console.log(from, to);
      console.log(random);
    } catch (err) {
      console.log(err);
    }
  };

  const selectedClass =
    "border-primary border-2 focus:scale-105 focus:ring-2 ring-primary";

  return (
    <div className='flex flex-col md:flex-row justify-between items-start w-full h-screen overflow-hidden overflow-y-hidden'>
      <div className='w-full md:w-9/12 h-[42rem] p-5'>
        {pdfData && <PdfViewer pdfData={pdfData} />}
      </div>
      <div className='w-full md:w-3/12 h-full border-l border-slate-300'>
        <div className='w-full h-2/6'>
          <div className='flex p-5 justify-center items-center border-b border-slate-300'>
            <h1 className='text-2xl font-semibold'>Extract{numberOfPages}</h1>
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
                        max={numberOfPages - 1}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value > numberOfPages - 1) {
                            setFrom((numberOfPages - 1).toString());
                          } else if (!isNaN(value) && value >= 0) {
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
                        max={numberOfPages}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value > numberOfPages) {
                            setTo(numberOfPages.toString());
                          } else if (value < parseInt(from)) {
                            setTo((parseInt(from) + 1).toString());
                          } else if (!isNaN(value) && value >= 0) {
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
                        checked={random?.includes(index + 1)}
                        onChange={() => handleCheckBoxChange(index + 1)}
                        type='checkbox'
                        value={index + 1}
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
          <button
            onClick={handleExtract}
            className='bg-primary hover:bg-secondary text-xl px-[3.5rem] py-[1rem] rounded-xl text-white font-semibold'
          >
            Extract PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExtractPage;
