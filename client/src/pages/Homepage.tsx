import { useRef, ChangeEvent } from 'react';

function Homepage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        // You can work with the selected PDF file here.
        console.log('Selected PDF file:', selectedFile);
      } else {
        alert('Please select a PDF file.');
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <div className='p-10 flex items-center justify-center flex-col'>
        <h1 className="text-5xl font-semibold"> Split PDF file</h1>
        <p className="text-lg text-txt_dim mt-5">
          Separate one page or a whole set for easy conversion into independent
          PDF files
        </p>
        <div className="mt-5">
          <button
            className="bg-primary hover:bg-secondary text-2xl px-[4.5rem] py-[1.5rem] rounded-xl text-white font-semibold"
            onClick={handleFileSelect}
          >
            Select PDF File
          </button>
          <input
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
