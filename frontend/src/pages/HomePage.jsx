// //with url
// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [url, setUrl] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const isValidUrl = (urlString) => {
//     try {
//       new URL(urlString);
//     } catch (_) {
//       return false;
//     }
//     return true;
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!isValidUrl(url)) {
//       setError('Please enter a valid URL');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setError('');

//       const response = await axios.post(
//         'http://localhost:8000/get_all/',
//         new URLSearchParams({ url }).toString(),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );

//       if (response.status === 200) {
//         const dataWithUrl = { ...response.data, url }; // Include the URL in the data
//         localStorage.setItem('articleData', JSON.stringify(dataWithUrl));
//         navigate('/analyze', { state: { url } });
//         console.log('Stored articleData:', JSON.stringify(dataWithUrl));
//       } else {
//         setError('Error processing the article. Please try again.');
//       }
//     } catch (err) {
//       setError('Error processing the article. Please try again.');
//       console.error('Error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <div className="bg-black text-white">
//         <Navbar />
//       </div>
//       <div className="flex-1 flex justify-center items-center bg-white min-h-[70vh]">
//         <div className="bg-gray-100 p-8 rounded-2xl shadow-2xl md:min-w-[34rem] md:min-h-[15rem]">
//           <h1 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-black p-1">
//             Enter URL Of Article
//           </h1>
//           <hr className="mb-6" />
//           <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
//             <div className="text-md text-gray-500">Use dev.to article URL to get better results.</div>
//             <input
//               type="url"
//               placeholder="https://dev.to/article-url"
//               className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Processing...' : 'Submit'}
//             </button>
//             {error && <div className="text-red-500 text-center">{error}</div>}
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;



//hardcoded dummy data
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidUrl = (urlString) => {
    try {
      new URL(urlString);
    } catch (_) {
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Dummy data simulating the response from the backend
      const dummyResponse = {
        summary: {
          "{": [
            "Revisions",
            "Frontend",
            "UI design",
            "Integration of CopilotKit",
            "CopilotKit implementation",
            "AI-powered assistance",
            "Backend",
          ],
        },
        tags: {
          tags: JSON.stringify([
            "CopilotKit_rajesh",
            "Tailwind",
            "Copilotkit",
            "CopilotKit",
            "Copilot",
            "MCQ",
            "CopilotKit",
            "Copilot",
            "CopilotKit",
            "StudyPal",
            "5173",
            "-137",
          ]),
        },
        sentiment: {
          sentiment: ["positive"],
        },
        topic: {
          topics: ["github repository"],
        },
      };

      const dataWithUrl = { ...dummyResponse, url }; // Include the URL in the data

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      localStorage.setItem('articleData', JSON.stringify(dataWithUrl));
      navigate('/analyze', { state: { url } });
      console.log('Stored articleData:', JSON.stringify(dataWithUrl));
    } catch (err) {
      setError('Error processing the article. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-black text-white">
        <Navbar />
      </div>
      <div className="flex-1 flex justify-center items-center bg-white min-h-[70vh]">
        <div className="bg-gray-100 p-8 rounded-2xl shadow-2xl md:min-w-[34rem] md:min-h-[15rem]">
          <h1 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-black p-1">
            Enter URL Of Article
          </h1>
          <hr className="mb-6" />
          <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
            <div className="text-md text-gray-500">Use dev.to article URL to get better results.</div>
            <input
              type="url"
              placeholder="https://dev.to/article-url"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
