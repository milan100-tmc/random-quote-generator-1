import { Quote } from '../types/quote';
import { Twitter, Facebook, Linkedin, Copy, Share2 } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  quote: Quote | null;
}

export const SocialShare = ({ quote }: SocialShareProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!quote) return null;

  const shareText = `"${quote.text}" — ${quote.author}`;
  const url = window.location.href;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(shareText)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Inspirational Quote',
          text: shareText,
          url: url
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="social-share">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Share This Quote
      </h3>
      
      <div className="flex flex-wrap justify-center gap-3">
        {/* Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          <Twitter className="w-5 h-5" />
          <span className="text-sm font-medium">Twitter</span>
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          <Facebook className="w-5 h-5" />
          <span className="text-sm font-medium">Facebook</span>
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          <Linkedin className="w-5 h-5" />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>

        {/* Copy to Clipboard */}
        <button
          onClick={copyToClipboard}
          className={`group flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
            copySuccess
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Copy className="w-5 h-5" />
          <span className="text-sm font-medium">
            {copySuccess ? 'Copied!' : 'Copy'}
          </span>
        </button>

        {/* Native Share (if supported) */}
        {navigator.share && (
          <button
            onClick={handleNativeShare}
            className="group flex items-center space-x-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        )}
      </div>
    </div>
  );
};
