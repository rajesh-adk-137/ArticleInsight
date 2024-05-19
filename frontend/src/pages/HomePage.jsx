import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        // Perform any necessary actions before navigation
        // For example, form validation or data submission

        // Navigate to the desired route
        navigate('/analyze');
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="bg-black text-white">
                <Navbar />
            </div>
            <div className="flex-1 flex justify-center items-center bg-white min-h-[70vh]">
                <div className=" bg-gray-100 p-8 rounded-2xl shadow-2xl md:min-w-[34rem] md:min-h-[15rem] ">
                    <h1 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-black p-1">
                        Enter URL Of Article
                    </h1>
                    <hr className="mb-6" />
                    <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
                        <div className='text-md text-gray-500'>Use dev.to article url to get better results.</div>
                        <input
                            type="url"
                            placeholder="https://dev.to/article-url"
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
