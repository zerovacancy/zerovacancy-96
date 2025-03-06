
export const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 right-1/4 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
    </div>
  );
};
