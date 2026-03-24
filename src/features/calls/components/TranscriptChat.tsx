import React from 'react';
import './TranscriptChat.css'; // Puedes mover los estilos ahí si deseas

interface TranscriptChatProps {
  transcription: string;
}

const TranscriptChat: React.FC<TranscriptChatProps> = ({ transcription }) => {
  const messages = transcription.split('\n').map((line, idx) => {
    const match = line.match(/^(Agent|User):\s?(.*)$/i);
    if (!match) return null;

    const role = match[1].toLowerCase();
    const text = match[2];

    return (
      <div
        key={idx}
        className={`message ${role === 'agent' ? 'agent' : 'user'}`}
      >
        {text}
      </div>
    );
  });

  return (
    <div>
      <div className="transcript-container">
        {messages}
      </div>
    </div>
  );
};

export default TranscriptChat;
