"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auditions } from "@/data/auditions";
import { toast } from "sonner";
import { X } from "lucide-react";

type RoleForm = {
  name: string;
  gender: "Male" | "Female" | "Any";
  ageRange: [number, number];
  description: string;
};

export default function NewCastingPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"Film" | "TV" | "Ad">("Film");
  const [location, setLocation] = useState("");
  const [roles, setRoles] = useState<RoleForm[]>([
    { name: "", gender: "Any", ageRange: [18, 99], description: "" },
  ]);

  const handleRoleChange = <K extends keyof RoleForm>(index: number, field: K, value: RoleForm[K]) => {
    const newRoles = [...roles];
    newRoles[index][field] = value;
    setRoles(newRoles);
  };

  const addRole = () => {
    setRoles([
      ...roles,
      { name: "", gender: "Any", ageRange: [18, 99], description: "" },
    ]);
  };
  
  const removeRole = (index: number) => {
    const newRoles = roles.filter((_, i) => i !== index);
    setRoles(newRoles);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAudition = {
      id: (auditions.length + 1).toString(),
      title,
      description,
      category,
      location,
      roles: roles.map((r, i) => ({ ...r, id: `${auditions.length + 1}-${i + 1}` })),
    };

    auditions.push(newAudition);
    toast.success("Casting call created successfully!");
    router.push("/producer/dashboard");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Create New Casting Call</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(v) => setCategory(v as "Film" | "TV" | "Ad")}
                defaultValue={category}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Film">Film</SelectItem>
                  <SelectItem value="TV">TV</SelectItem>
                  <SelectItem value="Ad">Ad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <Card>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>
              Add the roles you are casting for.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {roles.map((role, index) => (
              <div key={index} className="border p-4 rounded-lg relative">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeRole(index)}>
                  <X className="h-4 w-4" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role Name</Label>
                    <Input
                      value={role.name}
                      onChange={(e) =>
                        handleRoleChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      onValueChange={(v) => handleRoleChange(index, "gender", v as "Male" | "Female" | "Any")}
                      defaultValue={role.gender}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Age Range</Label>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={role.ageRange[0]}
                        onChange={(e) =>
                          handleRoleChange(index, "ageRange", [
                            +e.target.value,
                            role.ageRange[1],
                          ])
                        }
                        required
                      />
                      <span className="hidden sm:inline">-</span>
                      <Input
                        type="number"
                        min="1"
                        value={role.ageRange[1]}
                        onChange={(e) =>
                          handleRoleChange(index, "ageRange", [
                            role.ageRange[0],
                            +e.target.value,
                          ])
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={role.description}
                      onChange={(e) =>
                        handleRoleChange(index, "description", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addRole}>
              Add Another Role
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end">
          <Button type="submit">Create Casting Call</Button>
        </div>
      </form>
    </div>
  );
} 