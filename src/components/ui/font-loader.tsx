
import { useEffect } from 'react';

interface FontLoaderProps {
  fonts?: {
    family: string;
    url: string;
    weight?: string;
    style?: string;
  }[];
}

/**
 * FontLoader component that programmatically loads font files
 * and monitors their loading status
 */
export const FontLoader = ({ fonts = [] }: FontLoaderProps) => {
  useEffect(() => {
    if (fonts.length === 0) return;
    
    // Create stylesheet link elements for each font
    const elements: HTMLLinkElement[] = [];
    
    fonts.forEach(font => {
      // Create preload link for better performance
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'font';
      preloadLink.href = font.url;
      preloadLink.crossOrigin = 'anonymous';
      
      // Create stylesheet link if URL is a CSS file
      if (font.url.endsWith('.css')) {
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = font.url;
        document.head.appendChild(stylesheet);
        elements.push(stylesheet);
      }
      
      // Append preload link to document head
      document.head.appendChild(preloadLink);
      elements.push(preloadLink);
    });
    
    // Optionally check if fonts are loaded
    document.fonts.ready.then(() => {
      console.log('All fonts have been loaded');
    });
    
    return () => {
      // Clean up when component unmounts
      elements.forEach(element => {
        document.head.removeChild(element);
      });
    };
  }, [fonts]);

  return null; // This component doesn't render anything
};

export default FontLoader;
