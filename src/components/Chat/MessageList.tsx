'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMessages } from '@/hooks/useMessages';
import { CURRENT_USER } from '@/lib/api';
import MessageBubble from './MessageBubble';
import styles from './MessageList.module.css';

export default function MessageList() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useMessages();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div className={styles.empty}>Loading messages...</div>;
  }

  if (isError) {
    return <div className={styles.error}>Failed to load messages</div>;
  }

  const rawMessages = data?.pages.flat() || [];

  const messages = Array.from(new Map(rawMessages.map(msg => [msg._id, msg])).values());

  if (messages.length === 0) {
    return <div className={styles.empty}>No messages yet. Say hello!</div>;
  }

  return (
    <div className={styles.list} role="log" aria-live="polite" aria-atomic="false">
      {messages.map((msg) => (
        <MessageBubble key={msg._id} message={msg} isOwnMessage={msg.author === CURRENT_USER} />
      ))}

      {hasNextPage && (
        <div ref={ref} className={styles.empty}>
          Loading older messages...
        </div>
      )}
    </div>
  );
}
