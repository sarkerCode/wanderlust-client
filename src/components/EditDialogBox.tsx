"use client";

import React from "react";
import { PencilIcon, SaveIcon, Trash2Icon } from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IDestination } from "@/app/types/DestinationType";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { redirect } from "next/navigation";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "Adventure",
  "Cultural",
  "Wildlife",
  "Luxury",
] as const;

type FormState = {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const toFormState = (destination: IDestination): FormState => ({
  name: destination.name ?? "",
  country: destination.country ?? "",
  category: destination.category ?? "",
  price:
    destination.price === undefined || destination.price === null
      ? ""
      : String(destination.price),
  duration: destination.duration ?? "",
  departureDate: destination.departureDate ?? "",
  imageUrl: destination.imageUrl ?? "",
  description: destination.description ?? "",
});

const EditDialogBox = ({ destination }: { destination: IDestination }) => {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(() =>
    toFormState(destination),
  );
  const [saving, setSaving] = React.useState(false);

  const updateField =
    (field: keyof FormState) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const token = await getTokenFromClient();

    console.log("JWT Token:", token);
console.log("Destination ID:", destination._id ?? destination.id);

    try {
      const res = await fetch(
        `http://localhost:8000/destination/${destination._id ?? destination.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price) || 0,
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to update package: ${res.status}`);
      }

      setOpen(false);
      setForm(toFormState(destination));
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
      redirect(`/destinations/${destination._id ?? destination.id}`);
    }
  };

  const handleCancel = () => {
    setForm(toFormState(destination));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline">
            <PencilIcon data-icon="inline-start" className="size-3.5" />
            Edit
          </Button>
        }
      />
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="shrink-0 p-4 pb-2 sm:p-6 sm:pb-2">
          <DialogTitle>Update Travel Package</DialogTitle>
          <DialogDescription>
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          {/* Scrollable form body */}
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-2 sm:px-6">
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
            <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
          </div>

          {/* Actions */}
          <div className="flex shrink-0 flex-col gap-2 p-4 pt-4 sm:flex-row sm:justify-end sm:p-6 sm:pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={saving}
              className="gap-1.5 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
            >
              <Trash2Icon data-icon="inline-start" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="gap-1.5 bg-brand text-white hover:bg-brand-hover"
            >
              {saving ? (
                "Saving..."
              ) : (
                <>
                  <SaveIcon data-icon="inline-start" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialogBox;
