
export const BackgroundEffects = () => {
  return (
    <>
      {/* Gradient background with decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-indigo-900" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Decorative blurred blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 -left-10 w-72 h-72 bg-purple-100/30 rounded-full mix-blend-multiply blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-blue-100/30 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Additional accent elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-50/20 to-transparent pointer-events-none"></div>
    </>
  );
};

export default BackgroundEffects;
