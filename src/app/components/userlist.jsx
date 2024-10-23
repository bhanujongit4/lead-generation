"use client";
import React, { useEffect, useState } from 'react';

// Fallback dummy data
const DUMMY_LEADS = [
  {
    _id: '1',
    name: 'Aanand',
    email: 'aanandsemail@gmail.com',
    phoneNumber: '9875654221',
    fitnessGoal: 'weight-loss',
    experienceLevel: 'beginner',
    preferredTime: 'morning',
    interests: ['Strength Training', 'Cardio', 'Nutrition'],
    createdAt: new Date('2024-01-15T09:00:00').toISOString()
  },
  {
    _id: '2',
    name: 'Bhanuj',
    email: 'bhanujchowdhary@gmail.com',
    phoneNumber: '9711912224',
    fitnessGoal: 'muscle-gain',
    experienceLevel: 'intermediate',
    preferredTime: 'evening',
    interests: ['HIIT', 'Yoga', 'Personal Training'],
    createdAt: new Date('2024-01-16T14:30:00').toISOString()
  },
  {
    _id: '3',
    name: 'Pranjal',
    email: 'Pgwalapranjal@gmail.com',
    phoneNumber: '7827284786',
    fitnessGoal: 'general-fitness',
    experienceLevel: 'advanced',
    preferredTime: 'afternoon',
    interests: ['CrossFit', 'Olympic Lifting', 'Mobility'],
    createdAt: new Date('2024-01-17T16:45:00').toISOString()
  }
];

const getLeads = async () => {
  try {
    const res = await fetch('/api/leads', {
      cache: 'no-store',
    });

    console.log('Fetch URL: /api/leads');
    console.log(`Fetch response status: ${res.status}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch leads: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Fetched leads:', data.leads);

    return data.leads || [];
  } catch (error) {
    console.error('Error loading leads:', error);
    throw error;
  }
};

export default function LeadsList() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedLeadId, setExpandedLeadId] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const leadsData = await getLeads();
        setLeads(leadsData);
      } catch (error) {
        console.error('Failed to fetch real data, using dummy data:', error);
        setLeads(DUMMY_LEADS);
        
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleExpandLead = (leadId) => {
    setExpandedLeadId(expandedLeadId === leadId ? null : leadId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gym Lead Inquiries</h1>
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fitness Goals
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preferred Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.length > 0 ? (
                leads.slice().reverse().map((lead) => (
                  <React.Fragment key={lead._id}>
                    <tr 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleExpandLead(lead._id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.email}</div>
                          <div className="text-sm text-gray-500">{lead.phoneNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {lead.fitnessGoal?.replace('-', ' ').toUpperCase() || 'Not specified'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.experienceLevel?.charAt(0).toUpperCase() + lead.experienceLevel?.slice(1) || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.preferredTime?.replace('-', ' ').charAt(0).toUpperCase() + 
                         lead.preferredTime?.replace('-', ' ').slice(1) || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(lead.createdAt)}
                      </td>
                    </tr>
                    {expandedLeadId === lead._id && (
                      <tr className="bg-gray-50">
                        <td colSpan="5" className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <h4 className="font-medium mb-2">Areas of Interest:</h4>
                            <div className="flex flex-wrap gap-2">
                              {lead.interests && lead.interests.length > 0 ? (
                                lead.interests.map((interest, index) => (
                                  <span 
                                    key={index}
                                    className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs"
                                  >
                                    {interest}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-500">No interests specified</span>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}