import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SizeButton } from "../src/components/SizeButton/SizeButton";
import { QuantityPicker } from "../src/components/QuantityPicker/QuantityPicker";
import type { SizeOption } from "../src/types";

describe("SizeButton", () => {
  const inStock: SizeOption = { label: "M", stock: 8, stockLevel: "in-stock" };
  const soldOut: SizeOption = { label: "S", stock: 0, stockLevel: "sold-out" };

  it("renders an enabled, selectable button for an in-stock size", async () => {
    const onSelect = vi.fn();
    render(<SizeButton option={inStock} selected={false} onSelect={onSelect} />);

    const button = screen.getByRole("radio", { name: "M" });
    expect(button).toBeEnabled();

    await userEvent.click(button);
    expect(onSelect).toHaveBeenCalledWith("M");
  });

  it("disables the button and blocks selection when a size is sold out", async () => {
    const onSelect = vi.fn();
    render(<SizeButton option={soldOut} selected={false} onSelect={onSelect} />);

    const button = screen.getByRole("radio", { name: "S" });
    expect(button).toBeDisabled();

    await userEvent.click(button);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("marks the currently selected size as checked", () => {
    render(<SizeButton option={inStock} selected onSelect={vi.fn()} />);
    expect(screen.getByRole("radio", { name: "M" })).toHaveAttribute("aria-checked", "true");
  });
});

describe("QuantityPicker", () => {
  it("caps quantity at the provided max (e.g. remaining stock)", async () => {
    const onChange = vi.fn();
    render(<QuantityPicker quantity={3} onChange={onChange} max={3} />);

    const increase = screen.getByRole("button", { name: "Increase quantity" });
    expect(increase).toBeDisabled();

    await userEvent.click(increase);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not go below the minimum", async () => {
    const onChange = vi.fn();
    render(<QuantityPicker quantity={1} onChange={onChange} min={1} />);

    const decrease = screen.getByRole("button", { name: "Decrease quantity" });
    expect(decrease).toBeDisabled();

    await userEvent.click(decrease);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("disables both steppers when the whole control is disabled (sold-out variant)", () => {
    render(<QuantityPicker quantity={1} onChange={vi.fn()} disabled />);
    expect(screen.getByRole("button", { name: "Increase quantity" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Decrease quantity" })).toBeDisabled();
  });
});
