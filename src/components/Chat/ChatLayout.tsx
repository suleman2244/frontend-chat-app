'use client';

import React from 'react';
import styles from './ChatLayout.module.css';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatLayout() {
  return (
    <div className={styles.container}>
      <ChatHeader />
      <main className={styles.main}>
        <MessageList />
      </main>
      <MessageInput />
    </div>
  );
}
