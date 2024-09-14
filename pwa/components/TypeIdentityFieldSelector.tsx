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
import { IdentityFields } from "@/enums";
import { cn } from "@/lib/utils";
import { Response, TypeIdentityField } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface TypeIdentityFieldSelectorProps {
  value: number | null;
  onChange: (value: number) => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TypeIdentityFieldSelector({
  value,
  onChange,
}: TypeIdentityFieldSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  const { data, error } = useSWR<Response<TypeIdentityField>>(
    "/type_identity_fields",
    fetcher
  );

  useEffect(() => {
    if (data && value !== null) {
      const selected = data["hydra:member"].find((item) => item.id === value);
      if (selected) {
        // @ts-ignore
        setSelectedName(`${IdentityFields[item.name]}`);
      }
    }
  }, [data, value]);

  if (error) return <div>Failed to load type identity fields</div>;
  if (!data) return <div>Loading type identity fields...</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedName || "Select type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandGroup>
            {data["hydra:member"].map((item: TypeIdentityField) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  onChange(item.id);
                  setSelectedName(IdentityFields[item.name as keyof typeof IdentityFields]);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {IdentityFields[item.name as keyof typeof IdentityFields]}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
