"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';

const GymLeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    fitnessGoal: '',
    experienceLevel: '',
    preferredTime: '',
    interests: []
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, value]
        : prev.interests.filter(interest => interest !== value)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!formData.name || !formData.phoneNumber || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          fitnessGoal: '',
          experienceLevel: '',
          preferredTime: '',
          interests: []
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error("Failed to submit lead");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Start Your Fitness Journey</h2>
            <p className="mt-2 text-gray-600">Get your free consultation today!</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>

            <div>
              <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700">
                Primary Fitness Goal
              </label>
              <select
                id="fitnessGoal"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              >
                <option value="">Select a goal</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="strength">Strength Training</option>
                <option value="endurance">Endurance</option>
                <option value="flexibility">Flexibility</option>
              </select>
            </div>

            <div>
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
                Experience Level
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              >
                <option value="">Select experience</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700">
                Preferred Training Time
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              >
                <option value="">Select time</option>
                <option value="early-morning">Early Morning (5AM - 8AM)</option>
                <option value="morning">Morning (8AM - 11AM)</option>
                <option value="afternoon">Afternoon (11AM - 3PM)</option>
                <option value="evening">Evening (3PM - 7PM)</option>
                <option value="night">Night (7PM - 10PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interested In
              </label>
              <div className="space-y-2">
                {['Personal Training', 'Group Classes', 'Nutrition Coaching', 'Yoga', 'CrossFit'].map((interest) => (
                  <div key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      id={interest.toLowerCase().replace(' ', '-')}
                      name="interests"
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={handleInterestChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={interest.toLowerCase().replace(' ', '-')} className="ml-2 text-sm text-gray-700">
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Get Your Free Consultation
          </button>

          {isSubmitted && (
            <div className="mt-4 p-4 bg-green-50 rounded-md">
              <p className="text-green-800 text-center font-medium">
                Thanks for your interest! We'll contact you soon to schedule your free consultation.
              </p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default GymLeadForm;