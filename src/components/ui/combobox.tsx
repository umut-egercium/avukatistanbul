import { Check, ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  keywords?: string[];
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  id?: string;
  "aria-invalid"?: boolean;
  renderOption?: (option: ComboboxOption) => ReactNode;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Seçiniz",
  searchPlaceholder = "Ara…",
  emptyMessage = "Sonuç bulunamadı",
  disabled,
  className,
  contentClassName,
  id,
  renderOption,
  ...rest
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const generatedId = useId();
  const triggerId = id ?? generatedId;
  const ariaInvalid = rest["aria-invalid"];

  const selected = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={triggerId}
          role="combobox"
          aria-expanded={open}
          aria-invalid={ariaInvalid}
          disabled={disabled}
          className={cn(
            "flex h-11 w-full items-center justify-between gap-2 rounded-md border border-input bg-card px-3.5 py-2 text-base text-foreground shadow-sm transition-colors",
            "hover:border-foreground/20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/40",
            !selected && "text-muted-foreground/80",
            className,
          )}
        >
          <span className="truncate text-left">{selected?.label ?? placeholder}</span>
          <ChevronDown
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform"
            strokeWidth={1.75}
            aria-hidden
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[var(--radix-popover-trigger-width)] p-0", contentClassName)}
      >
        <Command
          filter={(itemValue, search, keywords) => {
            const haystack = `${itemValue} ${(keywords ?? []).join(" ")}`.toLocaleLowerCase("tr-TR");
            const needle = search.toLocaleLowerCase("tr-TR");
            return haystack.includes(needle) ? 1 : 0;
          }}
        >
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  keywords={option.keywords}
                  onSelect={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                >
                  {renderOption ? (
                    renderOption(option)
                  ) : (
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate">{option.label}</span>
                      {option.description ? (
                        <span className="truncate text-xs text-muted-foreground">
                          {option.description}
                        </span>
                      ) : null}
                    </div>
                  )}
                  <Check
                    strokeWidth={2}
                    className={cn(
                      "ml-2 h-4 w-4 shrink-0",
                      value === option.value ? "opacity-100 text-accent" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
