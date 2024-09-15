import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Pencil, PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { TypeIdentityFieldSelector } from "./TypeIdentityFieldSelector";

interface Item {
  id?: number;
  type?: number;
  value: string;
}

interface EditableSectionProps {
  title: string;
  items: any[];
  onUpdate: (newItems: any[]) => void;
  typeOptions?: string[];
  keyComponent?: React.ComponentType<{
    value: number | null;
    onChange: (value: number) => void;
    options?: string[];
  }>;
}

export function EditableSection({
  title,
  items,
  onUpdate,
  typeOptions = [],
  keyComponent: KeyComponent,
}: EditableSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItems, setEditedItems] = useState<Item[]>(items);
  const [newItem, setNewItem] = useState<Item>({ type: undefined, value: "" });

  useEffect(() => {
    setEditedItems(items);
  }, [items]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = (index: number) => {
    setEditingIndex(null);
    onUpdate(editedItems);
  };

  const handleCancel = (index: number) => {
    setEditingIndex(null);
    setEditedItems(items);
  };

  const handleChange = (
    index: number,
    field: "type" | "value",
    value: number | string
  ) => {
    const updatedItems = [...editedItems];
    // @ts-ignore
    updatedItems[index][field] = value;
    setEditedItems(updatedItems);
  };

  const handleAddNew = () => {
    if (newItem.type !== undefined || newItem.value) {
      const updatedItems = [...editedItems, newItem];
      setEditedItems(updatedItems);
      onUpdate(updatedItems);
      setNewItem({ type: undefined, value: "" });
    }
  };

  const renderKeyInput = (item: Item, index: number) => {
    if (KeyComponent) {
      return (
        <KeyComponent
          value={item.type || null}
          onChange={(value) => handleChange(index, "type", value)}
          options={typeOptions}
        />
      );
    }

    if (title === "Identity") {
      return (
        <TypeIdentityFieldSelector
          value={item.type || null}
          onChange={(value) => handleChange(index, "type", value)}
        />
      );
    }

    if (typeOptions.length > 0) {
      return (
        <Select
          value={item.type?.toString() || ""}
          onValueChange={(value) =>
            handleChange(index, "type", parseInt(value, 10))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((option, i) => (
              <SelectItem key={i} value={i.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        value={item.type?.toString() || ""}
        onChange={(e) =>
          handleChange(index, "type", parseInt(e.target.value, 10))
        }
        className="flex-grow"
        placeholder="Type"
        type="number"
      />
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {editedItems.map((item, index) => (
          <li key={item.id || index} className="flex items-center space-x-2">
            {editingIndex === index ? (
              <>
                {renderKeyInput(item, index)}
                <Input
                  value={item.value}
                  onChange={(e) => handleChange(index, "value", e.target.value)}
                  className="flex-grow"
                  placeholder="Value"
                />
                <Button size="icon" onClick={() => handleSave(index)}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleCancel(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <span className="flex-grow">{item.type}</span>
                <span className="flex-grow">{item.value}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit(index)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center space-x-2">
        {renderKeyInput(newItem, -1)}
        <Input
          placeholder="Value"
          value={newItem.value}
          onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
          className="flex-grow"
        />
        <Button onClick={handleAddNew}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
}
