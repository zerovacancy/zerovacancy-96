
import { useEffect } from 'react';

const FontLoader = () => {
  useEffect(() => {
    // Create a link preload element for the font
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = 'https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@500&display=swap';
    
    // Create the stylesheet link
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@500&display=swap';
    
    // Append to document head
    document.head.appendChild(link);
    document.head.appendChild(stylesheet);
    
    // Load the font
    document.fonts.ready.then(() => {
      console.log('Fonts have loaded.');
    });
    
    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.head.removeChild(stylesheet);
    };
  }, []);

  return null;
};

export default FontLoader;
