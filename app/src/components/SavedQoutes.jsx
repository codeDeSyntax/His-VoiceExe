import React, { useState, useEffect } from 'react';
import {
  PlusCircle,
  Edit2,
  Trash2,
  Save,
  Eye,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';

const QuotesManager = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    content: '',
  });

  useEffect(() => {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    setQuotes(storedQuotes);
  }, []);

  const saveToLocalStorage = (updatedQuotes) => {
    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
    setQuotes(updatedQuotes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedQuote) {
      const updatedQuotes = quotes.map((q) =>
        q.id === selectedQuote.id ? { ...formData, id: selectedQuote.id } : q
      );
      saveToLocalStorage(updatedQuotes);
    } else {
      const newQuote = {
        ...formData,
        id: Date.now(),
      };
      saveToLocalStorage([...quotes, newQuote]);
    }
    setFormData({ title: '', year: '', content: '' });
    setSelectedQuote(null);
    setCurrentView('list');
  };

  const handleDelete = (id) => {
    const updatedQuotes = quotes.filter((quote) => quote.id !== id);
    saveToLocalStorage(updatedQuotes);
    setSelectedQuote(null);
    setCurrentView('list');
  };

  const handleEdit = (quote) => {
    setFormData(quote);
    setSelectedQuote(quote);
    setCurrentView('form');
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center p-6">
      <BookOpen size={80} className="text-green-500 mb-6 opacity-70" />
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        You do not have a favorite Qoute saved
      </h2>
      <p className="text-gray-400 mb-6 max-w-md">
        Start capturing wisdom by adding your first quote. Click the + button to
        begin your collection.
      </p>
      <button
        onClick={() => {
          setSelectedQuote(null);
          setFormData({ title: '', year: '', content: '' });
          setCurrentView('form');
        }}
        className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors flex items-center gap-2"
      >
        <PlusCircle size={24} />
        Add First Quote
      </button>
    </div>
  );

  const renderListView = () => (
    <div
      className="relative container bg-cover h-screen mx-auto px-4 pt-10 "
      style={{
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundImage: `linear-gradient(to bottom,
               rgba(42, 42, 42, 0) 0%,
          rgba(42, 42, 42, 5) 20%),
                url("./pic3.jpg")`,
      }}
    >
      {quotes.length === 0 ? (
        <EmptyState />
      ) : (
        <table className="w-full text-left">
          <thead className="bg-[#2a2a2a] bg-opacity-50">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr
                key={quote.id}
                className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a] hover:bg-opacity-30 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src="./cloud.png"
                      alt=""
                      className="h-10 w-10 mr-4 rounded-full shadow-md"
                    />
                    <span className="text-sm font-semibold text-white truncate">
                      {quote.title}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {quote.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(quote)}
                      className="p-2 hover:bg-[#3a3a3a] rounded-lg transition-colors"
                    >
                      <Edit2 size={20} className="text-blue-400" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedQuote(quote);
                        setCurrentView('view');
                      }}
                      className="p-2 hover:bg-[#3a3a3a] rounded-lg transition-colors"
                    >
                      <Eye size={20} className="text-green-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(quote.id)}
                      className="p-2 hover:bg-[#3a3a3a] rounded-lg transition-colors"
                    >
                      <Trash2 size={20} className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={() => {
          setSelectedQuote(null);
          setFormData({ title: '', year: '', content: '' });
          setCurrentView('form');
        }}
        className="fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-colors z-50"
      >
        <PlusCircle size={24} className="text-white" />
      </button>
    </div>
  );

  const renderFormView = () => (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-[80%] mx-auto  rounded-xl p-8  border border-[#2a2a2a]"
      >
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <button
              type="button"
              onClick={() => setCurrentView('list')}
              className="mr-4 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-[12px] font-bold text-white">
              {selectedQuote ? 'Edit Quote' : 'Add New Quote'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Sermon Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-[#2a2a2a] text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              className="bg-[#2a2a2a] text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <textarea
            placeholder="Quote Content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="bg-[#2a2a2a] text-white rounded-lg px-4 py-3 w-full h-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={20} className="mr-2" />
              {selectedQuote ? 'Update Quote' : 'Save Quote'}
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('list')}
              className="px-6 py-3 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  const renderViewQuote = () => (
    <div className="container mx-auto px-4 py-8">
      <div className=" mx-auto bg-[#1e1e1e] rounded-xl p-8  border-[#2a2a2a]">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentView('list')}
            className="mr-4 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold text-white">Quote Details</h2>
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-white mb-2">
            {selectedQuote.title}
          </h3>
          <p className="text-gray-400 text-lg mb-6">{selectedQuote.year}</p>
          <div className="bg-[#2a2a2a] rounded-lg p-6">
            <p className="text-gray-200 text-xl leading-relaxed whitespace-pre-wrap">
              "{selectedQuote.content}"
            </p>
          </div>
          {/* <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => handleEdit(selectedQuote)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Edit2 size={20} />
              Edit
            </button>
            <button
              onClick={() => handleDelete(selectedQuote.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 size={20} />
              Delete
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-[#202020] bg-cover overflow-scroll  relative text-white ">
      {/* <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-primary bg-opacity-50"></div> */}
      {currentView === 'list' && renderListView()}
      {currentView === 'form' && renderFormView()}
      {currentView === 'view' && renderViewQuote()}
    </div>
  );
};

export default QuotesManager;
