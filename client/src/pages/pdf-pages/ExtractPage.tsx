import { useEffect, useState } from "react";
import PdfApi from "../../api/pdfApi";
import { useNavigate, useParams } from "react-router-dom";
import PdfViewer from "../../components/pdf-viewer/PdfViewer";
import PdfExtractLoader from "../../components/loader/PdfExtractLoader";
import { setPdfData } from "../../features/slices/pdfSlice";
import { useDispatch } from "react-redux";
import { notify } from "../../components/notify/notify";

type Props = {};

function ExtractPage({}: Props) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<"range" | "random">("range");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [random, setRandom] = useState<number[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(10);
  const [pdfExtracting, setPdfExtracting] = useState<boolean>(false);
  const { pdfId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pdfApi = new PdfApi();

  const fetchPdf = async () => {
    try {
      const response = await pdfApi.fetchPdfById(pdfId as string);
      const totalPages = response.headers["x-total-pages"];
      setNumberOfPages(totalPages);
      if (response?.data) {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setPdfUrl(fileURL as string);
      }
    } catch (err) {
      notify("error", "Something went wrong please try again later");
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
      if (selectedMode === "random" && random.length === 0) {
        notify("error", "Please select at least one page to create new pdf");
        return;
      } else if (selectedMode === "range") {
        if (from === "") {
          notify("error", "from value cannot be empty");
          return;
        }
        if (to === "") {
          notify("error", "to value cannot be empty");
        }
      }
      setPdfExtracting(true);
      const response = await pdfApi.extractPages(
        pdfId as string,
        selectedMode === "random"
          ? random
          : { from: parseInt(from), to: parseInt(to) }
      );
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      dispatch(setPdfData({ pdfUrl: fileURL }));
      setTimeout(() => {
        setPdfExtracting(false);
        navigate(`/download-pdf/${pdfId}`,{replace:true});
      }, 1000);
    } catch (err: any) {
      notify("error", "Something went wrong please try again later");
      setPdfExtracting(false);
    }
  };

  if (pdfExtracting) {
    return <PdfExtractLoader />;
  }

  const selectedClass =
    "border-primary border-2 focus:scale-105 focus:ring-2 ring-primary";

  return (
    <div className='flex flex-col md:flex-row justify-between items-start w-full h-screen overflow-y-scroll md:overflow-hidden '>
      <div className='w-full md:w-8/12 lg:w-9/12 h-[42rem] p-5'>
        {pdfUrl && <PdfViewer pdfData={pdfUrl} />}
      </div>
      <div className='w-full md:w-4/12 lg:w-3/12  h-full border-l border-slate-300'>
        <div className='w-full h-2/6'>
          <div className='flex p-5 justify-center items-center border-b border-slate-300'>
            <h1 className='text-2xl font-semibold'>Extract</h1>
          </div>
          <div className='p-5 w-full'>
            <h3 className='font-semibold text-lg'>Mode</h3>
            <div className='mt-2 flex justify-between gap-x-5 md:gap-x-2 lg:gap-x-3 w-full'>
              <div
                className={`p-3 lg:p-4 w-1/2 shadow-sm bg-light_shade transform transition-transform duration-300 rounded-lg border cursor-pointer ${
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
                className={`p-3 lg:p-4 bg-light_shade shadow-sm w-1/2 transform transition-transform duration-300 rounded-lg border cursor-pointer ${
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
                <div className='flex mt-3 flex-shrink justify-between w-full gap-x-5 lg:gap-x-3'>
                  <div className='flex border border-slate-300 w-1/2 rounded-lg'>
                    <div className=' border-r border-slate-300 h-full flex items-center justify-center  p-1 lg:p-2'>
                      from:
                    </div>
                    <div className=''>
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
                        className='w-11/12 md:w-[6.1rem]  ml-2 h-full p-1  appearance-none outline-none focus:none'
                      />
                    </div>
                  </div>
                  <div className='flex border border-slate-300 w-1/2 rounded-lg'>
                    <div className='  border-r border-slate-300 h-full flex items-center justify-center  p-1 lg:p-2'>
                      to:
                    </div>
                    <div className=''>
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
                        className='w-11/12 md:w-[7.2rem] ml-2 h-full p-1  appearance-none outline-none focus:none'
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col mt-8 mb-5'>
                <div className='w-full'>
                  Mark the checkboxes to extract random pages:
                </div>
                <div className='mt-3 w-full flex flex-wrap h-[17.5rem] p-2 shadow-md border overflow-y-scroll bg-light_shade'>
                  {Array.from({ length: numberOfPages }).fill(0).map((_, index) => (
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
        <div className='flex  h-4/6 justify-center items-center mt-24 p-5 pb-10'>
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
