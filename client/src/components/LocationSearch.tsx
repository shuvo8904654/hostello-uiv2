import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface LocationSearchProps {
  items: string[]
  placeholder: string
  emptyMessage?: string
  value: string
  onValueChange: (value: string) => void
  icon?: React.ElementType
  className?: string
}

export function LocationSearch({
  items,
  placeholder,
  emptyMessage = "No location found.",
  value,
  onValueChange,
  icon: Icon,
  className
}: LocationSearchProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between w-full text-left font-normal border-0 bg-muted/30 focus:ring-0 shadow-none h-12 text-base hover:bg-muted/50", 
            !value && "text-muted-foreground", 
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            {Icon && <Icon className="h-5 w-5 shrink-0 opacity-50" />}
            {value
              ? items.find((item) => item === value) || value
              : placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(currentValue) => {
                    // Capitalize first letter of each word to match original data format if needed
                    // But cmdk usually lowercases values. Let's rely on the item from the list.
                    // Actually cmdk value is usually lowercase. We should set the value to the original item string if it matches.
                    
                    // Find the original item that matches the selected value (case insensitive)
                    const originalItem = items.find(i => i.toLowerCase() === currentValue.toLowerCase()) || currentValue;
                    
                    onValueChange(originalItem === value ? "" : originalItem)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
