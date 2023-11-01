import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LoginModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate()

  const closeModal = () => {
    setOpen(false);
  };

  const handleLogin = () =>navigate('/sign-in')

  return (
    <div>
      {open && (
        <div className='fixed inset-0 flex items-center justify-center'>
          <div
            className='fixed inset-0 z-50 bg-gray-500 bg-opacity-75'
            onClick={closeModal}
          />

          <div className='relative z-50 max-w-sm md:max-w-lg p-5 bg-white rounded-lg shadow-xl'>
            <button
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
              onClick={closeModal}
              ref={cancelButtonRef}
            >
              <FaTimes />
            </button>

            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Please Login
            </h2>
            <div className='text-gray-600 text-[16px] mb-4'>
              Please log in to your account to save the PDF file.
            </div>
            <div className='flex justify-end mt-8'>
              <button
                type='button'
                onClick={closeModal}
                className='px-4 py-2 text-sm bg-gray-300 rounded-md mr-2 font-medium text-gray-500'
              >
                Close
              </button>

              <button
                type='button'
                onClick={handleLogin}
                className='px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary'
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
