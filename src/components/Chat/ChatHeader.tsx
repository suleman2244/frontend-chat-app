'use client';

import React from 'react';
import styles from './ChatHeader.module.css';

export default function ChatHeader() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerIcon} aria-hidden="true">D</div>
      <div className={styles.headerInfo}>
        <h1 className={styles.headerTitle}>Doodle Team Chat</h1>
        <span className={styles.headerSubtitle}>5 participants · Online</span>
      </div>
    </header>
  );
}
