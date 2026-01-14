import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await fetch('https://formsubmit.co/ajax/ifazmohomed@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Contact from ${formData.name}`,
          _replyto: formData.email,
          _template: 'table'
        })
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent successfully!',
          icon: 'success',
          confirmButtonColor: '#3B82F6',
          timer: 2000,
          timerProgressBar: true
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#3B82F6',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full min-h-screen flex flex-col justify-start pt-6 pb-12 lg:pb-16"
      id="Contact"
    >
      {/* Header */}
      <div className="text-center mb-12 md:mb-24">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="text-3xl md:text-5xl font-bold text-center mx-auto text-text-light dark:text-text-dark"
        >
          Contact Me
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

      <div className="container mx-auto px-[5%] md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          {/* Contact Form */}
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-5 py-10 sm:p-10 transition-all duration-300 hover:border-primary"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-3 text-text-light dark:text-text-dark">
                  Get in Touch
                </h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-primary opacity-50" />
            </div>

            <form
              action="https://formsubmit.co/ifazmohomed@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 hover:border-primary/50 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 hover:border-primary/50 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark group-focus-within:text-primary transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 hover:border-primary/50 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-blue-700 text-white py-4 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-border-light dark:border-border-dark flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-3 py-3 md:p-10 md:py-8 transition-all duration-300 hover:border-primary">
            <Komentar />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-sm text-text-secondary-light dark:text-text-secondary-dark font-mono mt-auto pt-8">
        <span>© 2024 Ifaz Ikram. Built with engineering precision.</span>
      </footer>
    </div>
  );
};

export default ContactPage;