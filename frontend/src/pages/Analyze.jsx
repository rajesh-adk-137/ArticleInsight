
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Analyze = () => {
  const [articleData, setArticleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const [answerData, setAnswerData] = useState({ answer: '', explanation: '' });

  useEffect(() => {
    const fetchArticleData = () => {
      const storedData = localStorage.getItem('articleData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log('Retrieved articleData from second page:', parsedData); // Debugging line
        setArticleData(parsedData);
        setIsLoading(false);
      } else {
        setError('No article data found. Please go back and submit an article URL.');
        setIsLoading(false);
      }
    };

    fetchArticleData();
  }, []);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    if (!articleData || !articleData.url) {
      setError('Article URL is missing. Please go back and submit an article URL.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('url', articleData.url);
      formData.append('question', question);

      const response = await axios.post('http://localhost:8000/get_answer/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Send form data
        },
      });

      const { answer, explanation } = response.data.answer;
      setAnswerData({
        answer: answer[0],
        explanation: explanation[0],
      });
    } catch (err) {
      setError('Error processing the question. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <div className="bg-black text-white">
          <Navbar />
        </div>
        <div className="flex-1 flex justify-center items-center bg-white">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <div className="bg-black text-white">
          <Navbar />
        </div>
        <div className="flex-1 flex justify-center items-center bg-white">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-black text-white">
        <Navbar />
      </div>
      <AnalyzeComponent
        articleData={articleData}
        answerData={answerData}
        handleQuestionSubmit={handleQuestionSubmit}
        setQuestion={setQuestion}
        question={question}
      />
      <Footer />
    </div>
  );
};

export default Analyze;

const AnalyzeComponent = ({ articleData, answerData, handleQuestionSubmit, setQuestion, question }) => {
  return (
    <div className="container mx-auto my-12 px-4 md:px-6 lg:px-8">
      <article className="prose">
        <h1 className="text-5xl font-bold tracking-tight">{articleData.topic.topics[0]}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {JSON.parse(articleData.tags.tags).map((tag, index) => (
            <span key={index} className="rounded-md bg-gray-100 px-3 py-1 text-lg font-medium">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-4xl font-bold tracking-tight mt-10">Summary</h2>
        <ul className="mt-6 text-xl text-gray-500 list-disc list-inside">
          {Object.values(articleData.summary)[0].map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <h2 className="text-4xl font-bold tracking-tight mt-10">Sentiment Analysis</h2>
        <p className="mt-6 text-xl text-gray-500">{articleData.sentiment.sentiment[0]}</p>
      </article>
      <section className="mt-12">
        <h2 className="text-3xl font-bold">Ask a Question to AI</h2>
        <form className="mt-4 space-y-4" onSubmit={handleQuestionSubmit}>
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="question">
              Your Question Related To Article
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-lg text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 resize-none"
              id="question"
              placeholder="Enter your question here..."
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-lg font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              type="submit"
            >
              Ask AI
            </button>
          </div>
        </form>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-bold">AI Responses</h2>
        {answerData.answer && (
          <div className="mt-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-lg text-gray-700">
              <strong>Answer:</strong> {answerData.answer}
            </p>
            <p className="text-lg text-gray-500 mt-2">
              <strong>Explanation:</strong> {answerData.explanation}
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-lg font-medium text-gray-500">AI Assistant</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};










// //url hardcoded
// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import axios from 'axios';

// const Analyze = () => {
//   const [articleData, setArticleData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [question, setQuestion] = useState('');
//   const [answerData, setAnswerData] = useState({ answer: '', explanation: '' });

//   useEffect(() => {
//     const fetchArticleData = () => {
//       const storedData = localStorage.getItem('articleData');
//       if (storedData) {
//         const parsedData = JSON.parse(storedData);
//         console.log('Retrieved articleData:', parsedData); // Debugging line
//         setArticleData(parsedData);
//         setIsLoading(false);
//       } else {
//         setError('No article data found. Please go back and submit an article URL.');
//         setIsLoading(false);
//       }
//     };

//     fetchArticleData();
//   }, []);

//   const handleQuestionSubmit = async (e) => {
//     e.preventDefault();

//     const hardcodedUrl = 'https://dev.to/rajesh-adk-137/studypal-your-ai-powered-personalized-learning-companion-59d';

//     try {
//       setIsLoading(true);
//       setError('');

//       const formData = new FormData();
//       formData.append('url', hardcodedUrl);
//       formData.append('question', question);

//       const response = await axios.post('http://localhost:8000/get_answer/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const { answer, explanation } = response.data.answer;
//       setAnswerData({
//         answer: answer[0],
//         explanation: explanation[0],
//       });
//     } catch (err) {
//       setError('Error processing the question. Please try again.');
//       console.error('Error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex flex-col bg-white">
//         <div className="bg-black text-white">
//           <Navbar />
//         </div>
//         <div className="flex-1 flex justify-center items-center bg-white">
//           <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col bg-white">
//         <div className="bg-black text-white">
//           <Navbar />
//         </div>
//         <div className="flex-1 flex justify-center items-center bg-white">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//             <span className="block sm:inline">{error}</span>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <div className="bg-black text-white">
//         <Navbar />
//       </div>
//       <AnalyzeComponent
//         articleData={articleData}
//         answerData={answerData}
//         handleQuestionSubmit={handleQuestionSubmit}
//         setQuestion={setQuestion}
//         question={question}
//       />
//       <Footer />
//     </div>
//   );
// };

// export default Analyze;

// const AnalyzeComponent = ({ articleData, answerData, handleQuestionSubmit, setQuestion, question }) => {
//   return (
//     <div className="container mx-auto my-12 px-4 md:px-6 lg:px-8">
//       <article className="prose">
//         <h1 className="text-5xl font-bold tracking-tight">{articleData.topic.topics[0]}</h1>
//         <div className="mt-4 flex flex-wrap items-center gap-2">
//           {JSON.parse(articleData.tags.tags).map((tag, index) => (
//             <span key={index} className="rounded-md bg-gray-100 px-3 py-1 text-lg font-medium">
//               {tag}
//             </span>
//           ))}
//         </div>
//         <h2 className="text-4xl font-bold tracking-tight mt-10">Summary</h2>
//         <ul className="mt-6 text-xl text-gray-500 list-disc list-inside">
//           {Object.values(articleData.summary)[0].map((point, index) => (
//             <li key={index}>{point}</li>
//           ))}
//         </ul>
//         <h2 className="text-4xl font-bold tracking-tight mt-10">Sentiment Analysis</h2>
//         <p className="mt-6 text-xl text-gray-500">{articleData.sentiment.sentiment[0]}</p>
//       </article>
//       <section className="mt-12">
//         <h2 className="text-3xl font-bold">Ask a Question to AI</h2>
//         <form className="mt-4 space-y-4" onSubmit={handleQuestionSubmit}>
//           <div>
//             <label className="block text-lg font-medium text-gray-700" htmlFor="question">
//               Your Question Related To Article
//             </label>
//             <textarea
//               className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-lg text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 resize-none"
//               id="question"
//               placeholder="Enter your question here..."
//               rows={3}
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-lg font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               type="submit"
//             >
//               Ask AI
//             </button>
//           </div>
//         </form>
//       </section>
//       <section className="mt-12">
//         <h2 className="text-3xl font-bold">AI Responses</h2>
//         {answerData.answer && (
//           <div className="mt-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
//             <p className="text-lg text-gray-700">
//               <strong>Answer:</strong> {answerData.answer}
//             </p>
//             <p className="text-lg text-gray-500 mt-2">
//               <strong>Explanation:</strong> {answerData.explanation}
//             </p>
//             <div className="mt-4 flex items-center space-x-2">
//               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500">
//                 <svg
//                   className="h-5 w-5"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     clipRule="evenodd"
//                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
//                     fillRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <span className="text-lg font-medium text-gray-500">AI Assistant</span>
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };


