import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Camera } from "lucide-react";

interface MainPictureProps {
  personId: number;
  initialTitle?: string;
  initialAlt?: string;
  onUpdate: (formData: FormData) => Promise<void>;
}

export function MainPicture({
  personId,
  initialTitle = "",
  initialAlt = "",
  onUpdate,
}: MainPictureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [alt, setAlt] = useState(initialAlt);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("alt", alt);
    if (file) {
      formData.append("sourceMedia", file);
    }
    await onUpdate(formData);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Image
        src={`/media_objects/${personId}`}
        alt={alt || "Profile picture"}
        width={300}
        height={400}
        className="rounded-lg shadow-md"
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="absolute top-2 right-2 bg-white text-black hover:bg-gray-100"
            size="icon"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" aria-describedby="">
          <DialogHeader>
            <DialogTitle>{file ? "Edit" : "Add"} Main Picture</DialogTitle>
            <DialogDescription>The Main Picture will be the first picture of the person shown</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter picture title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Enter alt text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Picture File</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="image/*"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
