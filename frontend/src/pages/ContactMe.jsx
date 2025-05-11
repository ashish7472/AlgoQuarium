import { useState } from 'react';
import emailjs from '@emailjs/browser';

function ContactMe() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        'service_sk0iwq5', // EmailJS Service ID
        'template_l1snhyc', // EmailJS Template ID
        templateParams,
        'DiUEBna4h86Wzk6l7' // EmailJS Public Key
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.log('FAILED...', error);
          setStatus('Failed to send message. Please try again.');
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container mx-auto p-4 md:p-6 min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="bg-[#2c3e50] rounded-lg shadow-md p-4 md:p-6 border border-[#3b4a6b] w-full max-w-md">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-white">Contact Me</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-[#b0b8c4] mb-1 text-sm md:text-base">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-[#1e2a44] text-white border border-[#3b4a6b] focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm md:text-base"
              placeholder="Your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-[#b0b8c4] mb-1 text-sm md:text-base">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-[#1e2a44] text-white border border-[#3b4a6b] focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm md:text-base"
              placeholder="Your email"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-[#b0b8c4] mb-1 text-sm md:text-base">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-2 rounded-md bg-[#1e2a44] text-white border border-[#3b4a6b] focus:outline-none focus:ring-2 focus:ring-[#4a90e2] text-sm md:text-base resize-none"
              placeholder="Your message"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition disabled:opacity-50 shadow-md text-sm md:text-base"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {/* Status Message */}
          {status && (
            <p
              className={`text-center text-sm md:text-base ${
                status.includes('successfully') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ContactMe;