
import React from 'react';
import { SUPPORTED_LANGUAGES, LanguageOption } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
  isLoading: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({
  code,
  setCode,
  language,
  setLanguage,
  onReview,
  isLoading,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-200">Your Code</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-cyan-500 focus:border-cyan-500 block w-auto p-2"
        >
          {SUPPORTED_LANGUAGES.map((lang: LanguageOption) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-grow p-1">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Paste your ${language} code here...`}
          className="w-full h-[50vh] lg:h-full bg-gray-900/50 text-gray-300 font-mono resize-none p-4 rounded-b-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
          spellCheck="false"
        />
      </div>
      
      <div className="p-3 border-t border-gray-700 mt-auto">
        <button
          onClick={onReview}
          disabled={isLoading || !code.trim()}
          className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:transform-none"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Reviewing...
            </>
          ) : (
            <>
              <SparklesIcon className="h-5 w-5 mr-2" />
              Review Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeInput;
