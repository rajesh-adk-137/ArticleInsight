import React, { useState } from 'react';
import faqimage from "../assets/images/faq.png";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "You can return any item within 30 days of purchase for a full refund. Please ensure the item is in its original condition."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping usually takes 5-7 business days within the continental US. International shipping times may vary."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, we offer 24/7 customer support through our online chat and email support@company.com."
    },
    {
      question: "Can I change my order after placing it?",
      answer: "You can change your order within 24 hours of placing it by contacting our support team."
    },
    {
      question: "Do you have physical stores?",
      answer: "Currently, we operate exclusively online, but we are planning to open physical stores in the near future."
    }
  ];

  return (
    <div className="bg-black text-white p-6 pb-14 mt-24">
      <div className="mx-10 md:mx-24">
        <h2 className="text-5xl font-bold mb-14 text-center">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className='text-4xl font-bold mb-5'>Have questions?</h3>
            <h3 className='text-4xl font-bold mb-8'>Get you <span className='text-yellow-300'>answer!</span></h3>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="w-full text-left p-4 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-600"
                  onClick={() => toggleOpen(index)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{faq.question}</span>
                    <span className="text-2xl">{openIndex === index ? '-' : '+'}</span>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-gray-700 mt-2 rounded-lg">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden md:flex justify-center items-center">
            <img src={faqimage} alt="FAQ" className="w-full h-auto md:max-w-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
