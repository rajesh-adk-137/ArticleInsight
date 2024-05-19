import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Analyze = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="bg-black text-white">
                <Navbar />
            </div>
            <AnalyzeComponent/>
            <Footer/>
        </div>
    )
}

export default Analyze


const AnalyzeComponent = () => {
    return (
        <div className="container mx-auto my-12 px-4 md:px-6 lg:px-8">
            <article className="prose">
                <h1 className="text-5xl font-bold tracking-tight">The Future of Web Development</h1>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-gray-100 px-3 py-1 text-lg font-medium">web development</span>
                    <span className="rounded-md bg-gray-100 px-3 py-1 text-lg font-medium">frontend</span>
                    <span className="rounded-md bg-gray-100 px-3 py-1 text-lg font-medium">javascript</span>
                    <span className="rounded-md bg-gray-100 px-3 py-1 text-lg font-medium">frameworks</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight mt-10">Summary</h2>
                <p className="mt-6 text-xl text-gray-500">
                    In this article, we'll explore the latest trends and technologies shaping the future of web development. From
                    the rise of modern JavaScript frameworks to the increasing importance of responsive design and mobile-first
                    development, we'll dive into the key factors that will define the web development landscape in the years to
                    come.
                </p>
                <h2 className="text-4xl font-bold tracking-tight mt-10">Sentiment Analysis</h2>
                <p className='mt-6 text-xl text-gray-500'>This section contains sentiment analysis of the article.</p>
            </article>
            <section className="mt-12">
                <h2 className="text-3xl font-bold">Ask a Question to AI</h2>
                <form className="mt-4 space-y-4">
                    <div>
                        <label className="block text-lg font-medium text-gray-700" htmlFor="question">
                            Your Question Related To Article
                        </label>
                        <textarea
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-lg text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 resize-none"
                            id="question"
                            placeholder="Enter your question here..."
                            rows={3}
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
                <div className="mt-4 space-y-6">
                    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                        <h3 className="text-xl font-medium">What are the latest trends in web development?</h3>
                        <p className="mt-2 text-lg text-gray-500">
                            Some of the latest trends in web development include the rise of modern JavaScript frameworks like React,
                            Vue, and Angular, the increasing importance of responsive design and mobile-first development, the growing
                            adoption of headless CMS and API-driven architectures, and the integration of AI and machine learning into
                            web applications.
                        </p>
                        <div className="mt-4 flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
                </div>
            </section>
        </div>
    );
};

