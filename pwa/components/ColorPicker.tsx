import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import Input from "./form/Input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  defaultColor?: string;
}

export default function AdvancedColorPicker({
  color,
  onChange,
  defaultColor = "#000000",
}: ColorPickerProps) {
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
  };

  const handleHexInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;

    // Validate hex color with optional 3 or 6 characters
    if (/^#[0-9A-Fa-f]{3,6}$/.test(newColor)) {
      handleColorChange(newColor);
    } else if (newColor === "") {
      // Allow empty input (could be used to reset or remove color)
      onChange("");
    }
  };

  const togglePickerVisibility = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setIsPickerVisible(false);
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside the picker
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative space-y-4 mx-2">
      <div className="flex items-center space-x-2">
        <div
          className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
          style={{ backgroundColor: color }}
          aria-label="Selected color preview"
          onClick={togglePickerVisibility}
        />
        <div className="flex-grow">
          <Label htmlFor="hex-input" className="sr-only">
            Hex Color
          </Label>
          <Input
            id="hex-input"
            name="color"
            type="text"
            value={color}
            onChange={handleHexInput}
            placeholder="#000000"
            className="!w-[100px] max-w-fit"
            aria-label="Hex color value"
          />
        </div>
      </div>
      {isPickerVisible && (
        <div ref={pickerRef} className="absolute top-8 left-0 z-10">
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
}
