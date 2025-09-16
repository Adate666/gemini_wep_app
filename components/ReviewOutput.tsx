
import React from 'react';
import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';
import MarkdownRenderer from './MarkdownRenderer';
import { SparklesIcon } from './icons/SparklesIcon';

interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string | null;
}

const WelcomeMessage: React.FC = () => (
  <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full p-8">
    <SparklesIcon className="w-16 h-16 text-cyan-500 mb-4 opacity-50" />
    <h3 className="text-xl font-semibold mb-2 text-gray-300">AI Code Review</h3>
    <p>Paste your code on the left, select the language, and click "Review Code" to get instant feedback from Gemini.</p>
  </div>
);

const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (review) {
      return <MarkdownRenderer content={review} />;
    }
    return <WelcomeMessage />;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col h-full min-h-[60vh] lg:min-h-0">
      <div className="p-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-200">Feedback</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default ReviewOutput;
