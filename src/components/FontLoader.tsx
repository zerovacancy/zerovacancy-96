
import React from 'react';
import { Helmet } from 'react-helmet';

const FontLoader: React.FC = () => {
  return (
    <Helmet>
      {/* Preconnect to Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Load Playfair Display font with optimized loading - only necessary weights */}
      <link 
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
      />
      <link 
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
        media="print"
        onLoad="this.media='all'"
      />
      <noscript>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
        />
      </noscript>
      
      {/* Add preload hints for key assets */}
      <link rel="preload" href="/newemilyprofile.jpg" as="image" />
      <link rel="preload" href="/janeprofile.png" as="image" />
    </Helmet>
  );
};

export default FontLoader;
