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

        {/* Social Media Links */}
        <div className="mt-6 flex justify-center space-x-4">
          <a
            href="https://www.linkedin.com/in/ashish-rolan-7088a925b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b0b8c4] hover:text-[#4a90e2] transition"
            title="LinkedIn"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.867 0-2.153 1.459-2.153 2.966v5.701h-3v-10h2.879v1.366h.04c.401-.761 1.379-1.562 2.838-1.562 3.037 0 3.6 2.001 3.6 4.604v5.592z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/rolanashish/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b0b8c4] hover:text-[#4a90e2] transition"
            title="Instagram"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.558.071-2.986.425-4.109 1.548-1.123 1.123-1.477 2.551-1.548 4.109-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.071 1.558.425 2.986 1.548 4.109 1.123 1.123 2.551 1.477 4.109 1.548 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.558-.071 2.986-.425 4.109-1.548 1.123-1.123 1.477-2.551 1.548-4.109.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.071-1.558-.425-2.986-1.548-4.109-1.123-1.123-2.551-1.477-4.109-1.548-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441-.645-1.441-1.441s.645-1.441 1.441-1.441 1.441.645 1.441 1.441-.645 1.441-1.441 1.441z" />
            </svg>
          </a>
          <a
            href="https://x.com/rolanashish?t=6WaoqCg0Aw7qGIlQ6R2qgw&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b0b8c4] hover:text-[#4a90e2] transition"
            title="X"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.244 2.25h3.506l-7.873 9.002L22.5 21.75h-7.052l-5.527-7.226-6.326 7.226H0l8.408-9.614L0 2.25h7.224l5.001 6.614 5.819-6.614zm-1.184 17.25h1.951L6.949 4.5H4.998l12.062 15z" />
            </svg>
          </a>
          <a
            href="https://github.com/ashish7472"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b0b8c4] hover:text-[#4a90e2] transition"
            title="GitHub"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.332-1.754-1.332-1.754-1.087-.744.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.304.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .319.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactMe;