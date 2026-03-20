'use client';

import React from 'react';
import { format } from 'date-fns';
import { Message } from '@/lib/api';
import styles from './MessageBubble.module.css';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}


function decodeHtmlEntities(text: string): string {
  const textarea = typeof document !== 'undefined' ? document.createElement('textarea') : null;
  if (!textarea) return text;
  textarea.innerHTML = text;
  return textarea.value;
}

export default function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const formattedTime = format(new Date(message.timestamp || message.createdAt || new Date()), "d MMM yyyy HH:mm");

  return (
    <div className={`${styles.wrapper} ${isOwnMessage ? styles.wrapperOwn : styles.wrapperOther}`}>
      <div className={`${styles.bubble} ${isOwnMessage ? styles.bubbleOwn : styles.bubbleOther}`}>
        {!isOwnMessage && <div className={styles.author}>{message.author}</div>}
        <div className={styles.content}>{mounted ? decodeHtmlEntities(message.message) : message.message}</div>
        <div className={styles.timestamp}>{mounted ? formattedTime : ''}</div>
      </div>
    </div>
  );
}
