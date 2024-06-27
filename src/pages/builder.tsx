import { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import 'vvvebjs/dist/vvvebjs.css';
import 'vvvebjs/dist/line-awesome/css/line-awesome.css';
import 'vvvebjs/dist/jquery.css';
import 'vvvebjs/dist/jquery-ui.css';

const Builder = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetchPages();

    if (typeof window !== 'undefined') {
      // Import VvvebJs scripts
      import('./dist/vvvebjs.js').then((module) => {
        const Vvveb = module.default;
        Vvveb.Builder.init('demo/default.html', function () {
          // Callback when the builder is initialized
          console.log('VvvebJs initialized');
        });
      });
    }
  }, []);

  const fetchPages = async () => {
    const response = await fetch('/api/pages');
    const data = await response.json();
    setPages(data);
  };

  const savePage = async (title: string, content: string) => {
    await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    fetchPages();
  };

  return (
    <>
      <Head>
        <title>VvvebJs Builder</title>
        <link rel="stylesheet" href="/dist/vvvebjs.css" />
        <link rel="stylesheet" href="/dist/line-awesome/css/line-awesome.css" />
        <link rel="stylesheet" href="/dist/jquery.css" />
        <link rel="stylesheet" href="/dist/jquery-ui.css" />
      </Head>
      <Script src="/dist/jquery.js" strategy="beforeInteractive" />
      <Script src="/dist/jquery-ui.js" strategy="beforeInteractive" />
      <Script src="/dist/vvveb.js" strategy="beforeInteractive" />
      <div id="vvveb-builder">
        {/* VvvebJs builder content will be rendered here */}
      </div>
    </>
  );
};

export default Builder;
