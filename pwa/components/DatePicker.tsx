import { format, isValid, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Input from "./form/Input";

export function DatePicker({
  date,
  setDate,
  name,
  id,
}: {
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  name: string;
  id: string;
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(date ? date : new Date());

  // Hold the selected date in state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date ? date : undefined);

  // Hold the input value in state
  const [inputValue, setInputValue] = useState(
    date ? format(date, "MM/dd/yyyy") : ""
  );

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setInputValue(format(date, "MM/dd/yyyy"));
    }
    setDate(date);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // keep the input value in sync
    setErrorMessage(null);

    const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
      setDate(parsedDate);
    } else {
      setSelectedDate(undefined);
      setDate(undefined);
      if (
        !e.target.value.includes("_") &&
        e.target.value.split("/").length === 3
      )
        setErrorMessage(
          "The date is not valid. Please enter a date MM/dd/yyyy"
        );
    }
  };

  return (
    <div className="flex items-center flex-wrap">
      <Input
        id={id}
        type="text"
        value={inputValue}
        placeholder="MM/dd/yyyy"
        masking="99/99/9999"
        onChange={handleInputChange}
        name={name}
        className="grow"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            initialFocus
            onSelect={handleDayPickerSelect}
            month={month}
            onMonthChange={setMonth}
          />
        </PopoverContent>
      </Popover>
      {errorMessage ? (
        <p className="py-1 px-2 w-full bg-red-200 mt-4 text-sm">
          {errorMessage}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
