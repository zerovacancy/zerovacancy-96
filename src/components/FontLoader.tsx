
import { useEffect } from 'react';

const FontLoader = () => {
  useEffect(() => {
    // Create a link preload element for the font
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = 'https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@100..800&display=swap';
    
    // Append to document head
    document.head.appendChild(link);
    
    // Load the font
    document.fonts.ready.then(() => {
      console.log('Fonts have loaded.');
    });
    
    return () => {
      // Cleanup
      document.head.removeChild(link);
    };
  }, []);

  return null;
};

export default FontLoader;
