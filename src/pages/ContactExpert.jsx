import { useState } from 'react';
import { FiUser, FiPhone, FiInfo, FiMessageSquare, FiSend, FiCheckCircle, FiX } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { submitContactForm } from '../services/api';

function ContactExpert() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    farmerName: '',
    mobileNumber: '',
    cropName: '',
    issue: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await submitContactForm(formData);
      setSuccess(true);
      setFormData({ farmerName: '', mobileNumber: '', cropName: '', issue: '' });
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${open
          ? 'bg-gray-700 hover:bg-gray-800 rotate-90'
          : 'bg-gradient-to-br from-teal-500 to-green-600 hover:shadow-green-500/40 hover:scale-110'
          }`}
        aria-label="Toggle contact expert form"
      >
        {open ? (
          <FiX className="text-white" size={22} />
        ) : (
          <FiMessageSquare className="text-white" size={22} />
        )}
      </button>

      {/* Popup Form panel */}
      {open && (
        <div
          className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slide-up"
          style={{ maxHeight: '600px' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-green-500 px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <FaLeaf className="text-white text-sm" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Contact an Expert</h4>
              <p className="text-green-100 text-xs">Reach out for farming queries</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50" style={{ maxHeight: 'calc(600px - 70px)' }}>
            {success ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center border border-green-100 flex flex-col items-center gap-3 mt-4">
                <FiCheckCircle className="text-green-500 text-3xl" />
                <p className="font-medium">Request submitted successfully!</p>
                <p className="text-xs">An expert will contact you soon. Closing...</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center border border-red-100">
                    {error}
                  </div>
                )}
                
                {/* Farmer Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="farmerName">
                    Farmer Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" size={14} />
                    </div>
                    <input
                      id="farmerName"
                      name="farmerName"
                      type="text"
                      required
                      className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                      placeholder="John Doe"
                      value={formData.farmerName}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="mobileNumber">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" size={14} />
                    </div>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      required
                      className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                      placeholder="+91 9876543210"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Crop Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="cropName">
                    Crop Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLeaf className="text-gray-400" size={14} />
                    </div>
                    <input
                      id="cropName"
                      name="cropName"
                      type="text"
                      required
                      className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                      placeholder="e.g. Tomato, Wheat"
                      value={formData.cropName}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Farming Issue */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="issue">
                    Farming Issue
                  </label>
                  <div className="relative">
                    <div className="absolute top-2.5 left-0 pl-3 flex items-start pointer-events-none">
                      <FiInfo className="text-gray-400" size={14} />
                    </div>
                    <textarea
                      id="issue"
                      name="issue"
                      rows="3"
                      required
                      className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors resize-y"
                      placeholder="Describe your issue..."
                      value={formData.issue}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="pt-2 pb-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent text-sm font-semibold rounded-lg text-white ${
                      loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 hover:-translate-y-0.5 shadow-md active:scale-95'
                    } transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                  >
                    {loading ? 'Submitting...' : 'Send Request'}
                    {!loading && <FiSend size={14} />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ContactExpert;
