
interface PricingCardHeaderProps {
  title: string;
  price: number;
  interval: string;
  description: string;
  colorAccent: string;
  isCurrentPlan: boolean;
  isSubscriptionActive: boolean;
}

export const PricingCardHeader = ({ 
  title, 
  price, 
  interval, 
  description, 
  colorAccent,
  isCurrentPlan,
  isSubscriptionActive
}: PricingCardHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className={`text-xl font-bold ${colorAccent}`}>
          {title}
        </h3>
        {isCurrentPlan && isSubscriptionActive && (
          <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm">
            Current Plan
          </span>
        )}
      </div>
      
      <div className="flex items-baseline relative z-10 mb-1">
        <span className="text-5xl font-extrabold tracking-tight text-slate-900">${price}</span>
        <span className="ml-2 text-sm font-medium text-slate-500">/{interval}</span>
      </div>

      <p className="text-sm text-slate-600 mb-6 relative z-10">
        {description}
      </p>
    </>
  );
};
