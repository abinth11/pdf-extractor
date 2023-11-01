
function PdfExtractLoader() {
  return (
    <div className='w-full flex justify-center items-start min-h-screen pt-5 md:pt-20'>
      <div className='flex flex-col  h-screen p-8'>
        <div className='flex justify-center items-start'>
          <div className='w-20 h-20 border-t-4 border-l-4 border-r-4 border-red-500 border-solid rounded-full animate-spin'></div>
        </div>
        <h1 className='text-2xl font-semibold mt-3'>
          Extracting pages...
        </h1>
      </div>
    </div>
  );
}

export default PdfExtractLoader;
