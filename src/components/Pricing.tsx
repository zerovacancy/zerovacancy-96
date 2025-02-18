import React from 'react';
import { RocketIcon, ShieldCheckIcon, SparklesIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { BorderBeam } from "./ui/border-beam";

const tiers = [
  {
    name: 'Hobby',
    id: 'hobby',
    href: '#',
    price: '$19',
    description: 'Perfect for personal projects and small websites.',
    features: ['5 Products', 'Basic analytics', 'Email support'],
    mostPopular: false,
  },
  {
    name: 'Startup',
    id: 'startup',
    href: '#',
    price: '$49',
    description: 'Essential tools for growing your business online.',
    features: ['25 Products', 'Advanced analytics', 'Priority email support'],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    href: '#',
    price: '$99',
    description: 'Dedicated support and infrastructure for your company.',
    features: ['Unlimited Products', 'Custom analytics', '24/7 phone & email support'],
    mostPopular: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const PricingSection = () => {
  return (
    <div className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BorderBeam 
          size={250}
          duration={20}
          borderWidth={2}
          colorFrom="#ffaa40"
          colorTo="#9c40ff"
        />
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple no-tricks pricing
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            We believe in providing transparent pricing plans tailored to your needs. No hidden fees, no surprises.
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'bg-primary/5 ring-2 ring-primary' : 'bg-white',
                'rounded-lg shadow-sm divide-y divide-gray-200'
              )}
            >
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">{tier.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>{' '}
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <a
                  href={tier.href}
                  className={classNames(
                    tier.mostPopular
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-white text-primary hover:bg-gray-50',
                    'mt-8 block w-full rounded-md border border-gray-300 py-2 text-center text-sm font-semibold shadow-sm'
                  )}
                >
                  Get started today
                </a>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What’s included</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      {tier.mostPopular ? (
                        <SparklesIcon className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                      ) : (
                        <RocketIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      )}
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
