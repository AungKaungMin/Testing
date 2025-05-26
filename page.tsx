'use client';

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/textarea"
import { useRef, useState } from "react";
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentEmail, setAppointmentEmail] = useState('');
  const appointmentFormRef = useRef<HTMLFormElement>(null);

  const handleAppointmentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.from('appointments').insert([
      { date, time, name: appointmentName, email: appointmentEmail }
    ]);
    if (!error) {
      alert('Appointment request sent!');
      setAppointmentName(''); setAppointmentEmail(''); setDate(''); setTime('');
    } else {
      alert('Failed to send appointment request.');
    }
  };
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const validateTime = (value: string) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setTime('');
      return;
    }
    if (validateTime(value)) {
      setTime(value);
    }
  };

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Attempting to send message with data:', {
        first_name: firstName,
        last_name: lastName,
        email,
        subject,
        message
      });

      const { data, error } = await supabase.from('contacts').insert([
        { first_name: firstName, last_name: lastName, email, subject, message }
      ]);

      if (error) {
        console.error('Supabase error:', error);
        alert(`Failed to send message: ${error.message}`);
        return;
      }

      console.log('Message sent successfully:', data);
      alert('Message sent!');
      setFirstName(''); 
      setLastName(''); 
      setEmail(''); 
      setSubject(''); 
      setMessage('');
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred while sending the message.');
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center">
      {/* Hero Section with Grid Pattern */}
      <section className="relative py-16 md:py-24 bg-[#F5F5ED] overflow-hidden w-full">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/grid-pattern.png"
            alt="Grid Pattern"
            fill
            className="object-cover opacity-50 scale-[0.65]"
            priority
            sizes="100vw"
          />
        </div>
        {/* Decorative circle */}
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-[#F87239]/20 rounded-full blur-md"></div>
        <div className="container mx-auto relative z-10 flex flex-col items-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">Contact Us</h1>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto">
              Have questions about our LMS platform? We&apos;re here to help you find the right solution for your educational needs.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Forms Section */}
      <section className="py-16 md:py-20 bg-[#FAFAF7] relative w-full -mt-6">
        {/* Background grid pattern with reduced opacity */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/grid-pattern.png"
            alt="Grid Pattern"
            fill
            className="object-cover scale-[0.5]"
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto relative z-10 px-4 flex flex-col items-center">
          {/* Contact Cards Container */}
          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-10">
            {/* Left Card - Appointment Scheduler */}
            <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
              <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-[#FFB333]/10 to-white">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-[#F87239] mr-3" />
                  <button
                    type="button"
                    className="text-2xl font-bold text-gray-900 focus:outline-none hover:text-[#F87239] transition-colors"
                    onClick={() => {}}>
                    Schedule a Consultation
                  </button>
                </div>
                <p className="text-gray-600 mt-2 ml-9">Book a personalized session with our education experts</p>
              </div>
              <div className="p-8">
                <form ref={appointmentFormRef} onSubmit={handleAppointmentSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label htmlFor="appointment-name" className="flex items-center text-sm font-medium text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#F87239]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Your Name
                    </label>
                    <Input
                      id="appointment-name"
                      name="name"
                      placeholder="Enter your name"
                      value={appointmentName}
                      onChange={(e) => setAppointmentName(e.target.value)}
                      className="h-12 border-gray-200 rounded-lg focus:border-[#F87239] focus:ring-[#F87239]"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="appointment-email" className="flex items-center text-sm font-medium text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#F87239]" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Email Address
                    </label>
                    <Input
                      id="appointment-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={appointmentEmail}
                      onChange={(e) => setAppointmentEmail(e.target.value)}
                      className="h-12 border-gray-200 rounded-lg focus:border-[#F87239] focus:ring-[#F87239]"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="date" className="flex items-center text-sm font-medium text-gray-700">
                      <Calendar className="h-4 w-4 mr-2 text-[#F87239]" />
                      Select Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-[#F87239] focus:border-[#F87239]"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="time" className="flex items-center text-sm font-medium text-gray-700">
                      <Clock className="h-4 w-4 mr-2 text-[#F87239]" />
                      Enter Time (24-hour format, e.g., 14:30)
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={time}
                        onChange={handleTimeChange}
                        className="flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-[#F87239] focus:border-[#F87239]"
                        placeholder="HH:mm"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#F87239] mr-2"></span>
                      Available hours: 09:00 - 17:00
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-[#FFB333] hover:bg-[#F87239] text-white font-medium py-4 px-6 rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
                      disabled={!date || !time || !appointmentName || !appointmentEmail}
                    >
                      Schedule Consultation
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* Right Card - Contact Form */}
            <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
              <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-[#F87239]/10 to-white">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#F87239] mr-3">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-900">Send Message</h2>
                </div>
                <p className="text-gray-600 mt-2 ml-9">We'll get back to you as soon as possible</p>
              </div>
              <div className="p-8">
                <form ref={formRef} className="space-y-6" onSubmit={handleSendEmail}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium text-gray-700">First Name*</label>
                      <Input id="first-name" name="first_name" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="h-12 border-gray-200 rounded-lg focus:border-[#F87239] focus:ring-[#F87239]" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last Name*</label>
                      <Input id="last-name" name="last_name" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="h-12 border-gray-200 rounded-lg focus:border-[#F87239] focus:ring-[#F87239]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email*</label>
                    <Input id="email" name="email" type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="h-12 border-gray-200 rounded-lg focus:border-[#F87239] focus:ring-[#F87239]" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject*</label>
                    <Input id="subject" name="subject" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} className="h-12 border-gray-200 rounded-lg focus:border-[#F87239] focus:ring-[#F87239]" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">How can we help?*</label>
                    <Textarea id="message" name="message" placeholder="Message" rows={5} value={message} onChange={e => setMessage(e.target.value)} className="border-gray-200 rounded-lg focus:border-[#F87239] focus:ring-[#F87239]" />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="w-full bg-[#FFB333] hover:bg-[#F87239] text-white font-medium py-4 px-6 rounded-lg transition-all hover:shadow-lg">Submit</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section with updated styling */}
      <section className="py-16 md:py-20 bg-[#F5F5ED] relative overflow-hidden w-full">
        {/* Grid Pattern Background with reduced opacity */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/grid-pattern.png"
            alt="Grid Pattern"
            fill
            className="object-cover scale-[0.4]"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto relative z-10 px-4 flex flex-col items-center">
          <div className="text-center mb-12 max-w-3xl">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our LMS platform.
            </p>
          </div>
          <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 mx-auto">
            {[
              {
                question: "How can I request a demo of your LMS platform?",
                answer:
                  "You can request a demo by filling out the contact form above or by emailing us directly at demo@edulearn.com. Our team will schedule a personalized demonstration based on your specific needs.",
              },
              {
                question: "What kind of support do you offer to customers?",
                answer:
                  "We provide 24/7 technical support, comprehensive documentation, video tutorials, and regular webinars. Our dedicated customer success team also offers personalized onboarding and training.",
              },
              {
                question: "Is your LMS platform suitable for K-12 education?",
                answer:
                  "Yes, our platform is designed to be flexible and can be customized for K-12 education, higher education, corporate training, and more. We offer specific features tailored to each educational level.",
              },
              {
                question: "Can I integrate your LMS with other systems we use?",
                answer:
                  "Our LMS platform offers robust API integration capabilities and pre-built connectors for popular education tools, student information systems, and communication platforms.",
              },
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faqs" className="text-[#F87239] hover:text-[#F87239]/80 font-medium">
              View all FAQs
            </Link>
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="bg-[#FAFAF7] py-16 md:py-20 w-full">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="relative w-full max-w-5xl rounded-2xl bg-[#232323] px-6 sm:px-12 md:px-16 py-12 sm:py-16 overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" style={{width: '90%', height: '90%'}}>
              <svg width="100%" height="100%" viewBox="0 0 700 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cta-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#444" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="700" height="320" fill="url(#cta-grid)" />
              </svg>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-400/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-lg"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Got More Questions? <span className="text-[#F87239]">Reach Out</span>
              </h2>
              <p className="text-white text-base md:text-lg mb-8 max-w-2xl">
                Our team of education experts is ready to help you find the perfect learning solution.
              </p>
              
              <Button className="bg-[#FFB333] hover:bg-[#F87239] text-white font-medium py-3 px-8 rounded-lg transition-all hover:shadow-lg text-lg">
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}