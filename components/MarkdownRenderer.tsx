
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderContent = () => {
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = '';
    let codeBlockLang = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${i}`} className="bg-gray-900 rounded-md p-4 my-4 overflow-x-auto">
              <code className={`language-${codeBlockLang} text-sm`}>{codeBlockContent.trim()}</code>
            </pre>
          );
          inCodeBlock = false;
          codeBlockContent = '';
          codeBlockLang = '';
        } else {
          inCodeBlock = true;
          codeBlockLang = line.substring(3).trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent += line + '\n';
        continue;
      }
      
      let processedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-cyan-300">$1</strong>') // Bold
        .replace(/`(.*?)`/g, '<code class="bg-gray-700 text-sm rounded px-1 py-0.5 font-mono text-cyan-300">$1</code>'); // Inline code

      if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-xl font-bold mt-6 mb-2 text-cyan-400 border-b border-gray-600 pb-1">{processedLine.substring(4)}</h3>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-2xl font-bold mt-8 mb-3 text-cyan-400">{processedLine.substring(3)}</h2>);
      } else if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-3xl font-bold mt-8 mb-4 text-cyan-400">{processedLine.substring(2)}</h1>);
      } else if (line.match(/^\s*(\*|\-)\s/)) {
        elements.push(<li key={i} className="ml-5 list-disc" dangerouslySetInnerHTML={{ __html: processedLine.replace(/^\s*(\*|\-)\s/, '') }} />);
      } else if (line.trim() === '') {
        elements.push(<div key={i} className="h-4"></div>);
      }
      else {
        elements.push(<p key={i} className="my-2" dangerouslySetInnerHTML={{ __html: processedLine }} />);
      }
    }

    return elements;
  };

  return <div className="prose prose-invert max-w-none text-gray-300">{renderContent()}</div>;
};

export default MarkdownRenderer;
