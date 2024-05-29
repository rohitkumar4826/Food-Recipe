import axios from 'axios'; 
import { useState } from 'react';
import Navbar from '../components/Navbar';

function Doubt(){
    const [doubt, setDoubt] = useState('');
    const [respo, setRespo] = useState('');

// Request data
const requestData = {
    contents: [
      {
        parts: [
          {
            text: doubt
          }
        ]
      }
    ]
  };
  
  // API key
  const apiKey = 'AIzaSyD5gYLkCReHoiP360_0hG2RRDE7TUUKstY';
  
  // API endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
  // Axios POST request
    const handleAsk = async () => {
        try {
            const response = await axios.post(url, requestData);
            console.log(response.data);
            setRespo(response.data.candidates[0].content.parts[0].text);
            console.log(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    console.log(doubt);
  return (
    <>
    <Navbar />
    <div className='flex flex-col flex-wrap items-center justify-center h-screen bg-gray-900 dark:bg-gray-800' 
  >
      <h1 className="text-3xl font-bold text-white mb-4 dark:text-gray-100">
        Ask Your Doubt
      </h1>
      <div className="relative rounded-lg overflow-hidden shadow-md bg-white/50 dark:bg-gray-700/50 backdrop-blur-md">
        <input
          type="text"
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
          placeholder="Enter your doubt here..."
          className=
            'w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-t-lg text-black dark:text-gray-100 peer' 
        />
        <button
          type="button"
          onClick={handleAsk}
          className=
            'w-full px-4 py-2 text-center font-bold text-white rounded-b-lg bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500  dark:bg-blue-600 dark:hover:bg-blue-800' 
        >
          Ask
        </button>
      </div>
      {respo && (
        <p className="mt-16 text-xl w-[60%] text-justify p-8 shadow-md opacity-70 overflow-y-auto backdrop-brightness-75 rounded-md text-white mt-4 dark:text-gray-100">{respo}</p>
      )}
    </div>
    </>
  );

}
export default Doubt;