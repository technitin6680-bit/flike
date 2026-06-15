'use client';

import { useState } from 'react';
import { BASE_PRICES, FEATURE_PRICES, calculateEstimatedCost } from '@/lib/pricing';
import { IndianRupee, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [websiteType, setWebsiteType] = useState('Business Website');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    websiteName: '',
    businessName: '',
    description: '',
    domainOption: 'Need Domain Registration',
    mobileNumber: '',
    emailAddress: '',
  });

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const estimatedCost = calculateEstimatedCost(websiteType, selectedFeatures);

  const submitOrder = async () => {
    try {
      const { auth } = await import('@/lib/firebase');
      const user = auth.currentUser;
      
      if (!user) {
        alert("Please login first to submit an order.");
        // Should redirect to dashboard for login and perhaps save state, but simple for now
        window.location.href = '/dashboard';
        return;
      }
      
      const token = await user.getIdToken();
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          websiteType,
          requiredFeatures: selectedFeatures,
          totalEstimatedCost: estimatedCost
        })
      });

      const data = await res.json();
      if (data.success) {
        window.location.href = '/dashboard';
      } else {
        alert('Failed to submit order: ' + data.error);
      }
    } catch (e) {
      console.error(e);
      alert('Network error.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <header className="flex-none flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Link href="/" className="text-xl font-heading font-bold text-gray-900">Flike</Link>
        <div className="text-sm font-medium text-gray-500">Step {step} of 4</div>
      </header>
      
      <main className="flex-1 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          
          <div className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Choose Website Type</h2>
                  <p className="text-gray-500 mt-1">Select the primary category for your website.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.keys(BASE_PRICES).map(type => (
                    <button
                      key={type}
                      onClick={() => setWebsiteType(type)}
                      className={`p-4 text-left border rounded-xl transition-all ${websiteType === type ? 'border-blue-600 ring-1 ring-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="font-semibold text-gray-900">{type}</div>
                      <div className="text-sm mt-1 text-gray-500">Starts at ₹{BASE_PRICES[type]}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Project Requirements</h2>
                  <p className="text-gray-500 mt-1">Tell us more about your business and goals.</p>
                </div>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Website Name</label>
                      <input 
                        type="text" 
                        value={formData.websiteName} 
                        onChange={e => setFormData({...formData, websiteName: e.target.value})} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="e.g. Flike" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Business Name</label>
                      <input 
                        type="text" 
                        value={formData.businessName} 
                        onChange={e => setFormData({...formData, businessName: e.target.value})} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="e.g. Flike Tech" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                      rows={3} 
                      value={formData.description} 
                      onChange={e => setFormData({...formData, description: e.target.value})} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Describe your business and what the website should achieve..." 
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.emailAddress} 
                        onChange={e => setFormData({...formData, emailAddress: e.target.value})} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="you@example.com" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Mobile Number (India)</label>
                      <input 
                        type="tel" 
                        value={formData.mobileNumber} 
                        onChange={e => setFormData({...formData, mobileNumber: e.target.value})} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="+91" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Required Features</h2>
                  <p className="text-gray-500 mt-1">Select the functionalities you need for your website.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2 pb-2">
                  {Object.keys(FEATURE_PRICES).map(feature => (
                    <label key={feature} className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${selectedFeatures.includes(feature) ? 'border-blue-600 bg-blue-50/20' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex-shrink-0 pt-0.5">
                        <input 
                          type="checkbox" 
                          checked={selectedFeatures.includes(feature)} 
                          onChange={() => toggleFeature(feature)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 leading-none">{feature}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {FEATURE_PRICES[feature] === 0 ? 'Included' : `+₹${FEATURE_PRICES[feature]}`}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Estimated Quote</h2>
                  <p className="text-gray-500 mt-1">Review your selections and pricing.</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="font-medium text-gray-900">{websiteType}</span>
                    <span className="font-medium text-gray-900">₹{BASE_PRICES[websiteType] || 0}</span>
                  </div>
                  {selectedFeatures.length > 0 && (
                    <div className="py-4 space-y-3 border-b border-gray-200">
                      {selectedFeatures.map(f => (
                        <div key={f} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{f}</span>
                          <span className="text-gray-600">₹{FEATURE_PRICES[f]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4">
                    <span className="font-bold text-lg text-gray-900">Total Estimate</span>
                    <span className="font-bold text-2xl text-blue-600 flex items-center">
                      <IndianRupee className="w-5 h-5 mr-0.5" />
                      {estimatedCost}
                    </span>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-500 bg-blue-50 text-blue-800 p-4 rounded-lg">
                  Final quotation will be confirmed by our team within 24 hours.
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex items-center justify-between">
            {step > 1 ? (
              <button onClick={prevStep} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div></div>}
            
            {step < 4 ? (
              <button onClick={nextStep} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={submitOrder} className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
                Submit Order Request
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
