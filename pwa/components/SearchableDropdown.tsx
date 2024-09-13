import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

const SearchableCombobox = ({
  items,
  value,
  onChange,
}: {
  items: { value: string | number; label: string }[];
  value: number;
  onChange: (value: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (searchTerm: string) => {
    const filtered = items.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  useEffect(() => {
    setFilteredItems(items)
  }, [items]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value !== -1
            ? items.find((item) => item.value == value)?.label
            : "Select item..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder="Search item..."
            onValueChange={handleSearch}
          />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {filteredItems.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={(currentValue) => {
                  setOpen(false);
                  onChange(
                    parseInt(currentValue == `${value}` ? "" : currentValue)
                  );
                }}
                value={`${item.value}`}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchableCombobox;
