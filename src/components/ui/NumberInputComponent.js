"use client";

import { NumberInput } from "@mantine/core";

export default function NumberInputComponent({ quantity, max, onChange }) {
  return (
    <NumberInput
      type="number"
      className="text-sm w-24"
      value={quantity}
      min={1}
      max={max}
      onChange={onChange}
      classNames={{
        input: 'background-card text-color'
      }}
    />
  );
}
