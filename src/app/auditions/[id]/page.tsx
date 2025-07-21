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
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { CastingCall, Role } from "@prisma/client";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface AuditionWithRoles extends CastingCall {
  roles: Role[];
}

export default function AuditionDetailPage() {
  const params = useParams();
  const { id } = params;
  const { data: audition, error } = useSWR<AuditionWithRoles>(`/api/auditions/${id}`, fetcher);
  const { data: session } = useSession();
  const user = session?.user;

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    resume: "",
    headshots: [] as string[],
    videos: [] as string[],
  });

  if (error) return <div>Failed to load</div>;
  if (!audition) return <div>Audition not found</div>;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== "ACTOR") {
      toast.error("You must be logged in as an Actor to apply.");
      return;
    }
    if (!selectedRole) {
      toast.error("Please select a role to apply for.");
      return;
    }

    try {
        const response = await fetch("/api/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formData,
                roleId: selectedRole.id,
            }),
        });

        if (!response.ok) {
            toast.error("Failed to submit application.");
        } else {
            toast.success("Application submitted successfully!");
        }
    } catch {
        toast.error("An unexpected error occurred.");
    }
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
                {role.gender}, {role.ageRange} years
              </p>
              <p>{role.description}</p>
            </div>
          ))}
          {user?.role === "ACTOR" && (
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
                    <UploadButton<OurFileRouter, "resumeUploader">
                      endpoint="resumeUploader"
                      onClientUploadComplete={(res) => {
                        if (res) {
                          setFormData(prev => ({ ...prev, resume: res[0].url }));
                          toast.success("Resume uploaded successfully!");
                        }
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headshots">Headshots (2 images)</Label>
                    <UploadButton<OurFileRouter, "headshotUploader">
                      endpoint="headshotUploader"
                      onClientUploadComplete={(res) => {
                        if (res) {
                          setFormData(prev => ({ ...prev, headshots: res.map(r => r.url) }));
                          toast.success("Headshots uploaded successfully!");
                        }
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="videos">Videos (2 uploads)</Label>
                    <UploadButton<OurFileRouter, "videoUploader">
                      endpoint="videoUploader"
                      onClientUploadComplete={(res) => {
                        if (res) {
                          setFormData(prev => ({ ...prev, videos: res.map(r => r.url) }));
                          toast.success("Videos uploaded successfully!");
                        }
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`ERROR! ${error.message}`);
                      }}
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