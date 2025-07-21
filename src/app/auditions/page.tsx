"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { auditions as allAuditions } from "@/data/auditions";
import { Filter } from "lucide-react";

export default function AuditionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: [] as string[],
    gender: [] as string[],
    category: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);

  const locations = [...new Set(allAuditions.map((a) => a.location))];
  const categories = [...new Set(allAuditions.map((a) => a.category))];
  const genders = ["Male", "Female", "Any"];

  const handleFilterChange = (type: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const newValues = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: newValues };
    });
  };

  const filteredAuditions = allAuditions.filter((audition) => {
    const { location, gender, category } = filters;
    return (
      (location.length === 0 || location.includes(audition.location)) &&
      (category.length === 0 || category.includes(audition.category)) &&
      (gender.length === 0 ||
        audition.roles.some((r) => gender.includes(r.gender))) &&
      (searchTerm === "" ||
        audition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audition.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const FilterPanel = () => (
    <aside className="w-full md:w-1/4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <Accordion type="multiple" className="w-full" defaultValue={["keywords", "location", "category", "gender"]}>
        <AccordionItem value="keywords">
          <AccordionTrigger>Keywords</AccordionTrigger>
          <AccordionContent>
            <Input
              placeholder="Search by title or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="location">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent>
            {locations.map((loc) => (
              <div key={loc} className="flex items-center space-x-2 my-2">
                <Checkbox
                  id={`loc-${loc}`}
                  onCheckedChange={() => handleFilterChange("location", loc)}
                />
                <Label htmlFor={`loc-${loc}`}>{loc}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            {categories.map((cat) => (
              <div key={cat} className="flex items-center space-x-2 my-2">
                <Checkbox
                  id={`cat-${cat}`}
                  onCheckedChange={() => handleFilterChange("category", cat)}
                />
                <Label htmlFor={`cat-${cat}`}>{cat}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="gender">
          <AccordionTrigger>Gender</AccordionTrigger>
          <AccordionContent>
            {genders.map((gen) => (
              <div key={gen} className="flex items-center space-x-2 my-2">
                <Checkbox
                  id={`gen-${gen}`}
                  onCheckedChange={() => handleFilterChange("gender", gen)}
                />
                <Label htmlFor={`gen-${gen}`}>{gen}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )

  return (
    <div className="container mx-auto p-4">
      <div className="md:hidden mb-4">
        <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="w-full">
          <Filter className="mr-2 h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:block w-1/4">
            <FilterPanel />
        </div>
        {showFilters && (
            <div className="md:hidden">
                <FilterPanel />
            </div>
        )}
        <main className="w-full md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">Auditions</h1>
          <div className="space-y-4">
            {filteredAuditions.map((audition) => (
              <Card key={audition.id}>
                <CardHeader>
                  <CardTitle>{audition.title}</CardTitle>
                  <CardDescription>
                    {audition.category} - {audition.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{audition.description}</p>
                  <Separator className="my-4" />
                  <h4 className="font-semibold">Roles:</h4>
                  <ul className="list-disc list-inside">
                    {audition.roles.map((role) => (
                      <li key={role.id}>{role.name}</li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild>
                    <Link href={`/auditions/${audition.id}`}>View Details</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
} 