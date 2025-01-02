import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  className?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = -1000000,
  max = 1000000,
  step = "any",
  placeholder,
  className,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === "" || newValue === "-") {
      setInputValue(newValue);
      return;
    }

    const parsed = parseFloat(newValue);

    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      setInputValue(newValue);
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    if (inputValue === "" || inputValue === "-") {
      setInputValue("0");
      onChange(0);
    }
  };

  return (
    <Input
      type="number"
      step={step}
      min={min}
      max={max}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className}
    />
  );
};
