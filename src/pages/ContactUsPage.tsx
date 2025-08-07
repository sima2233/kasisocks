import React, { useState } from 'react';
import { MapPinIcon, MailIcon, PhoneIcon } from 'lucide-react';
const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  return <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with questions, feedback, or
            wholesale inquiries.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="font-serif text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-8">
              Whether you have a question about our products, an order, or
              anything else, our team is ready to answer all your questions.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPinIcon className="text-yellow-500 mr-4 mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-lg mb-1">Our Location</h3>
                  <address className="text-gray-600 not-italic">
                    42 Einstein Street
                    <br />
                    Prosperita
                    <br />
                    Windhoek, Namibia
                  </address>
                </div>
              </div>
              <div className="flex items-start">
                <MailIcon className="text-yellow-500 mr-4 mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-lg mb-1">Email Us</h3>
                  <a href="mailto:hello@kasisocks.com" className="text-gray-600 hover:text-yellow-500 transition-colors">
                    hello@kasisocks.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <PhoneIcon className="text-yellow-500 mr-4 mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-lg mb-1">Call Us</h3>
                  <a href="tel:+264611234567" className="text-gray-600 hover:text-yellow-500 transition-colors">
                    +264 61 123 4567
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="font-medium text-lg mb-4">Business Hours</h3>
              <table className="w-full text-gray-700">
                <tbody>
                  <tr>
                    <td className="py-2">Monday - Friday:</td>
                    <td className="py-2">8:00 AM - 5:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2">Saturday:</td>
                    <td className="py-2">9:00 AM - 2:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2">Sunday:</td>
                    <td className="py-2">Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-md">
            <h2 className="font-serif text-2xl font-bold mb-6">
              Send a Message
            </h2>
            {isSubmitted ? <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
                <p className="font-medium">Thank you for your message!</p>
                <p>We'll get back to you as soon as possible.</p>
              </div> : <form onSubmit={handleSubmit}>
                {formError && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
                    {formError}
                  </div>}
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block mb-2 font-medium">
                    Subject
                  </label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500">
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500" required></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-black hover:bg-gray-900 text-white py-3 px-6 font-medium transition-colors disabled:bg-gray-400">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>}
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="font-serif text-xl font-bold mb-2">
                How long does shipping take?
              </h3>
              <p className="text-gray-700">
                Standard shipping typically takes 3-5 business days within
                Namibia. International shipping may take 10-21 business days
                depending on your location.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-serif text-xl font-bold mb-2">
                What is your return policy?
              </h3>
              <p className="text-gray-700">
                We offer a 30-day return policy on all unworn items with
                original packaging. Please contact our customer service team to
                initiate a return.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-serif text-xl font-bold mb-2">
                Do you offer wholesale options?
              </h3>
              <p className="text-gray-700">
                Yes, we offer wholesale options for retailers. Please contact
                our sales team at wholesale@kasisocks.com for more information.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-serif text-xl font-bold mb-2">
                How should I care for my Kasi Socks?
              </h3>
              <p className="text-gray-700">
                For best results, machine wash cold on gentle cycle and lay flat
                to dry. Avoid bleach and high heat to preserve the quality and
                fit of your socks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default ContactUsPage;