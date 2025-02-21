
import React from 'react';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface SortOption {
  label: string;
  value: string;
}

interface SortMenuProps {
  options: SortOption[];
  onSort?: (value: string) => void;
  defaultValue?: string;
}

export const SortMenu: React.FC<SortMenuProps> = ({
  options,
  onSort,
  defaultValue
}) => {
  const [selected, setSelected] = React.useState(defaultValue);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSort?.(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="default"
          className="gap-2 bg-white hover:bg-gray-50/95 text-gray-700 border-gray-200 shadow-sm hover:shadow transition-all duration-200"
        >
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <span>Sort By</span>
          {selected && options.find(opt => opt.value === selected) && (
            <>
              <span className="mx-1 text-gray-400">•</span>
              <span className="text-gray-900">
                {options.find(opt => opt.value === selected)?.label}
              </span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={`
              ${selected === option.value ? 'bg-primary/5 text-primary font-medium' : 'text-gray-700'}
              cursor-pointer transition-colors hover:bg-gray-50
            `}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
