import React from 'react';
import { Globe } from 'lucide-react';
import { CrawlForm } from './components/CrawlForm';
import { CrawlJobCard } from './components/CrawlJobCard';
import { useCrawlerStore } from './store/crawlerStore';

function App() {
  const jobs = useCrawlerStore((state) => state.jobs);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Globe className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">Domain Expiry Crawler</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CrawlForm />
        
        <div className="space-y-6">
          {jobs.map((job) => (
            <CrawlJobCard key={job.id} job={job} />
          ))}
          
          {jobs.length === 0 && (
            <div className="text-center py-12">
              <Globe className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No crawls yet</h3>
              <p className="text-gray-500">Start by entering a URL above to begin crawling</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;