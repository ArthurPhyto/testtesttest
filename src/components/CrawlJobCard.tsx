import React from 'react';
import { format } from 'date-fns';
import { StopCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { CrawlJob } from '../types/crawler';
import { useCrawlerStore } from '../store/crawlerStore';

interface CrawlJobCardProps {
  job: CrawlJob;
}

export function CrawlJobCard({ job }: CrawlJobCardProps) {
  const stopJob = useCrawlerStore((state) => state.stopJob);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{job.url}</h3>
          <p className="text-sm text-gray-500">
            Started {format(job.startTime, 'PPp')}
          </p>
        </div>
        {job.status === 'running' && (
          <button
            onClick={() => stopJob(job.id)}
            className="text-red-600 hover:text-red-700"
          >
            <StopCircle size={24} />
          </button>
        )}
      </div>

      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${job.progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Crawled URLs</h4>
          <p className="text-2xl font-bold">{job.crawledUrls.length}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">External Links</h4>
          <p className="text-2xl font-bold">{job.externalLinks.length}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Expired Domains</h4>
          <p className="text-2xl font-bold">{job.expiredDomains.length}</p>
        </div>
      </div>

      {job.error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4 flex items-start gap-2">
          <AlertCircle size={20} />
          <p>{job.error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">External Links</h4>
          <div className="max-h-40 overflow-y-auto">
            {job.externalLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2 text-sm mb-2">
                <ExternalLink size={16} className="text-gray-400" />
                <span className="truncate">{link.url}</span>
                <span className={`ml-auto ${link.statusCode < 400 ? 'text-green-600' : 'text-red-600'}`}>
                  {link.statusCode}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Expired Domains</h4>
          <div className="max-h-40 overflow-y-auto">
            {job.expiredDomains.map((domain, index) => (
              <div key={index} className="text-sm mb-2">
                <p className="font-medium">{domain.domain}</p>
                <div className="text-xs text-gray-500">
                  <p>A Record: {domain.aRecord ? '✓' : '✗'}</p>
                  <p>MX Record: {domain.mxRecord ? '✓' : '✗'}</p>
                  <p>NS Record: {domain.nsRecord ? '✓' : '✗'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}