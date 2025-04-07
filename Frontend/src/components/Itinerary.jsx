import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import ItineraryForm from "../component/ItineraryForm";
import ItineraryDay from "./ItineraryDay";
import Footer from "./Footer";
import bgImage from "../assets/bg-ref.png";
import jdPDF from "jspdf"
import html2canvas from "html2canvas"
const Itinerary = () => {

  const itineraryPDFRef = useRef();
  const [currentItinerary, setCurrentItinerary] = useState(null);

  const handleItineraryGenerated = (itineraryData) => {
    // Directly use the parsed itinerary data from the form component
    setCurrentItinerary(itineraryData);
  };

  const handleDownloadPDF = async() => {
    try {
      const input = itineraryPDFRef.current;
      
      // Clone and prepare content
      const contentDiv = input.cloneNode(true);
      document.body.appendChild(contentDiv);
      contentDiv.style.position = 'absolute';
      contentDiv.style.left = '-9999px';
      contentDiv.style.width = '800px'; // Fixed width for better scaling
      
      // Apply enhanced styles for better visibility
      const elements = contentDiv.getElementsByTagName('*');
      for (let el of elements) {
        // Base styles
        el.style.backgroundColor = 'white';
        el.style.color = '#1F2937';
        
        // Enhanced text sizes
        if (el.tagName === 'H2' || el.classList.contains('text-2xl')) {
          el.style.fontSize = '32px';
          el.style.fontWeight = '700';
          el.style.marginBottom = '16px';
        } else if (el.tagName === 'H3' || el.classList.contains('text-xl')) {
          el.style.fontSize = '28px';
          el.style.fontWeight = '600';
          el.style.marginBottom = '12px';
        } else if (el.classList.contains('text-lg')) {
          el.style.fontSize = '24px';
          el.style.fontWeight = '500';
        } else if (el.classList.contains('activity-time')) {
          el.style.fontSize = '20px';
          el.style.fontWeight = '600';
          el.style.color = '#4F46E5';
        } else if (el.classList.contains('activity-title')) {
          el.style.fontSize = '22px';
          el.style.fontWeight = '600';
        } else if (el.classList.contains('activity-description')) {
          el.style.fontSize = '18px';
        } else {
          el.style.fontSize = '18px'; // Base font size
        }

        // Improve spacing
        if (el.classList.contains('itinerary-day')) {
          el.style.marginBottom = '30px';
          el.style.paddingBottom = '20px';
          el.style.borderBottom = '2px solid #E5E7EB';
        }
      }

      // Create PDF with better settings
      const pdf = new jdPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
        hotfixes: ['px_scaling']
      });

      // Calculate dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (2 * margin);

      // Add title and content on first page
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Add title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(32);
      pdf.setTextColor(75, 0, 130);
      pdf.text('Your Travel Itinerary', pageWidth / 2, 30, { align: 'center' });

      // Add date
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(16);
      pdf.setTextColor(128, 128, 128);
      const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      pdf.text(formattedDate, pageWidth / 2, 40, { align: 'center' });

      // Add separator
      pdf.setLineWidth(0.5);
      pdf.setDrawColor(75, 0, 130);
      pdf.line(margin, 45, pageWidth - margin, 45);

      // Capture and add content
      const dayElements = contentDiv.querySelectorAll('.itinerary-day');
      let currentY = 55; // Start below the title

      for (let i = 0; i < dayElements.length; i++) {
        const dayElement = dayElements[i];
        
        // Capture with high quality
        const canvas = await html2canvas(dayElement, {
          scale: 4, // Higher scale for better quality
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: 800, // Match the fixed width we set
          height: dayElement.offsetHeight,
          letterRendering: true
        });

        const imgHeight = (canvas.height * contentWidth) / canvas.width;

        // Check if we need a new page
        if (currentY + imgHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }

        // Add the day's content
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          margin,
          currentY,
          contentWidth,
          imgHeight,
          undefined,
          'FAST'
        );

        currentY += imgHeight + 10;
      }

      // Add page numbers
      const pageCount = pdf.internal.getNumberOfPages();
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.setTextColor(128, 128, 128);
      
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.text(
          `Page ${i} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }

      // Clean up
      document.body.removeChild(contentDiv);

      // Save with formatted name
      const filename = `tripwise-itinerary-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full md:h-[500px]">
        {/* Background Image */}
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-xl md:text-3xl font-bold tracking-widest text-center px-4 bg-black bg-opacity-30">
          <p>PLAN YOUR PERFECT ITINERARY WITH TRIPWISE</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-6"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Itinerary</h2>
                <ItineraryForm onItineraryGenerated={handleItineraryGenerated} />
              </div>
            </motion.div>
          </div>

          {/* Itinerary Display Section */}
          <div className="lg:col-span-8">
            {currentItinerary ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Your Custom Itinerary</h2>
                    <div className="flex gap-4">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-2v5.586l-1.293-1.293z" />
                        </svg>
                        Save
                      </button>
                      <button 
                        onClick={handleDownloadPDF}
                        className="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>

                <div id="itinerary-content" className="space-y-6 bg-white rounded-2xl shadow-xl p-6" ref={itineraryPDFRef}>
                  {currentItinerary.map((day, index) => (
                    <motion.div
                      key={index}
                      className="itinerary-day"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <ItineraryDay
                        day={day.day}
                        location={day.location}
                        activities={day.activities}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V1a1 1 0 012 0v5a1 1 0 11-2 0zm8 0V1a1 1 0 012 0v5a1 1 0 11-2 0zM5 3a1 1 0 000 2h10a1 1 0 100-2H5z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M3 7a1 1 0 011 1v9a1 1 0 01-1 1h12a1 1 0 01-1-1V8a1 1 0 011-1h1a1 1 0 110 2h-1v8H4V8H3a1 1 0 110-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Plan Your Adventure?
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Fill out the form to generate your personalized itinerary. We'll help you create the perfect travel plan tailored just for you.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                      Get Started
                    </button>
                    <button className="px-6 py-3 bg-white text-purple-600 border border-purple-600 rounded-xl hover:bg-purple-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
