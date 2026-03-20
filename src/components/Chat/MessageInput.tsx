'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSendMessage } from '@/hooks/useMessages';
import { CURRENT_USER } from '@/lib/api';
import styles from './MessageInput.module.css';

export default function MessageInput() {
  const [text, setText] = useState('');
  const { mutate, isPending } = useSendMessage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || isPending) return;
    mutate({ message: text.trim(), author: CURRENT_USER }, {
      onSuccess: () => {
        setText('');
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSend}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={textareaRef}
          className={styles.input}
          placeholder="Message"
          aria-label="Type your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isPending}
        />
      </div>
      <button 
        type="submit" 
        className={styles.button}
        aria-label="Send message"
        disabled={!text.trim() || isPending}
      >
        Send
      </button>
    </form>
  );
}
