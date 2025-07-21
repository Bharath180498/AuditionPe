"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auditions } from "@/data/auditions";
import { applications } from "@/data/applications";
import { useSessionStore } from "@/store/session";
import { toast } from "sonner";
import { Role } from "@/data/auditions";

export default function AuditionDetailPage() {
  const params = useParams();
  const { id } = params;
  const audition = auditions.find((a) => a.id === id);
  const { user } = useSessionStore();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    resume: null as File | null,
    headshots: [] as File[],
    videos: [] as File[],
  });

  if (!audition) {
    return <div>Audition not found</div>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "headshots" || name === "videos") {
        setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== "Actor") {
      toast.error("You must be logged in as an Actor to apply.");
      return;
    }
    if (!selectedRole) {
      toast.error("Please select a role to apply for.");
      return;
    }

    const newApplication = {
      id: (applications.length + 1).toString(),
      auditionId: audition.id,
      roleId: selectedRole.id,
      actorId: user.id,
      ...formData,
      resume: formData.resume?.name || "",
      headshots: formData.headshots.map(f => f.name),
      videos: formData.videos.map(f => f.name),
      status: "Submitted" as const,
    };

    applications.push(newApplication);
    toast.success("Application submitted successfully!");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">{audition.title}</CardTitle>
          <CardDescription>
            {audition.category} - {audition.location}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{audition.description}</p>
          <Separator className="my-6" />
          <h2 className="text-2xl font-semibold mb-4">Roles</h2>
          {audition.roles.map((role) => (
            <div key={role.id} className="mb-4">
              <h3 className="text-xl font-semibold">{role.name}</h3>
              <p className="text-sm text-gray-500">
                {role.gender}, {role.ageRange[0]}-{role.ageRange[1]} years
              </p>
              <p>{role.description}</p>
            </div>
          ))}
          {user?.role === "Actor" && (
            <>
              <Separator className="my-6" />
              <h2 className="text-2xl font-semibold mb-4">Apply for a Role</h2>
              <form onSubmit={handleSubmit}>
                <RadioGroup
                  onValueChange={(value) =>
                    setSelectedRole(
                      audition.roles.find((r) => r.id === value) || null
                    )
                  }
                  className="mb-4"
                >
                  <Label className="text-lg mb-2 block">Select a Role</Label>
                  {audition.roles.map((role) => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={role.id} id={role.id} />
                      <Label htmlFor={role.id}>{role.name}</Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume (PDF)</Label>
                    <Input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf"
                      required
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headshots">Headshots (2 images)</Label>
                    <Input
                      id="headshots"
                      name="headshots"
                      type="file"
                      accept="image/*"
                      multiple
                      required
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="videos">Videos (2 uploads)</Label>
                    <Input
                      id="videos"
                      name="videos"
                      type="file"
                      accept="video/*"
                      multiple
                      required
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-6">
                  Submit Application
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 