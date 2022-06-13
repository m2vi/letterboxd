import type { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ChangeEvent, createRef, useState } from 'react';
import styles from '../styles/Main.module.css';
import Papa from 'papaparse';
import { UploadIcon } from '@heroicons/react/solid';
import { getClientIp } from 'request-ip';
import main, { Result } from '../utils/main';

const Home = ({ ip }: { ip: string | null }) => {
  const ref = createRef<HTMLInputElement>();
  const [result, setResult] = useState<Result>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => main.handleChange(e, setResult);

  return (
    <div className={styles.container}>
      <Head>
        <title>CSV Parser</title>
      </Head>

      <main className={styles.main}>
        {result.length > 0 ? (
          <div>{result.length}</div>
        ) : (
          <>
            <div className={styles.button} onClick={() => ref.current?.click()}>
              <UploadIcon className={styles.uploadIcon} />
              <span>Upload CSV</span>
            </div>
            <div className={styles.hidden}>
              <input type='file' ref={ref} onChange={handleChange} accept='.csv' className={styles.input} />
            </div>
          </>
        )}
      </main>

      <div className={styles.ip}>{ip}</div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ip: getClientIp(context.req),
    },
  };
};
