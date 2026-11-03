"use client";

import React from "react";
import { PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "Adventure",
  "Cultural",
  "Wildlife",
  "Luxury",
] as const;

const initialForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

export default function AddDestinationPage() {
  const [form, setForm] = React.useState(initialForm);

  const updateField =
    (field: keyof typeof initialForm) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:8000/add-destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json()

    console.log(data);
    
    // console.log("New travel package:", form);
    setForm(initialForm);
  };

  const handleReset = () => {
    setForm(initialForm);
  };

  return (
    <main className="flex-1 bg-background py-10">
      <div className="mx-auto w-full max-w-3xl px-4">
        <h1 className="text-4xl font-light tracking-tight text-foreground">
          Add New Travel Package
        </h1>

        <div className="mt-10 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} noValidate>
            {/* Destination Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Bali Paradise"
                className="h-9"
                value={form.name}
                onChange={updateField("name")}
              />
            </div>

            {/* Country / Category */}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Indonesia"
                  className="h-9"
                  value={form.country}
                  onChange={updateField("country")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  value={form.category || null}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, category: value as string }))
                  }
                >
                  <SelectTrigger id="category" className="h-9 w-full">
                    <SelectValue placeholder="Beach" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price / Duration */}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  placeholder="e.g., 1299"
                  className="h-9"
                  value={form.price}
                  onChange={updateField("price")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="e.g., 7 Days/6 Nights"
                  className="h-9"
                  value={form.duration}
                  onChange={updateField("duration")}
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="mt-5 flex flex-col gap-2">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                placeholder="mm/dd/yyyy"
                className="h-9"
                value={form.departureDate}
                onChange={updateField("departureDate")}
              />
            </div>

            {/* Image URL */}
            <div className="mt-5 flex flex-col gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                className="h-9"
                value={form.imageUrl}
                onChange={updateField("imageUrl")}
              />
            </div>

            {/* Description */}
            <div className="mt-5 flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the travel experience..."
                className="min-h-28 resize-none"
                value={form.description}
                onChange={updateField("description")}
              />
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleReset}
                className="gap-1.5 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400"
              >
                <Trash2Icon data-icon="inline-start" />
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className="gap-1.5 bg-brand text-white hover:bg-brand-hover"
              >
                <PlusIcon data-icon="inline-start" />
                Add Travel Package
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
