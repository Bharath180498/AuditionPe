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
import { Filter } from "lucide-react";
import useSWR from "swr";
import { CastingCall, Role } from "@prisma/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface AuditionWithRoles extends CastingCall {
  roles: Role[];
}

export default function AuditionsPage() {
  const { data: allAuditions, error } = useSWR<AuditionWithRoles[]>("/api/auditions", fetcher);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: [] as string[],
    gender: [] as string[],
    category: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);

  if (error) return <div>Failed to load</div>;
  if (!allAuditions) return <div>Loading...</div>;

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

  const clearAllFilters = () => {
    setFilters({
      location: [],
      gender: [],
      category: [],
    });
    setSearchTerm("");
  };

  const hasActiveFilters = () => {
    return searchTerm || filters.location.length > 0 || filters.gender.length > 0 || filters.category.length > 0;
  };

  const getActiveFiltersCount = () => {
    return filters.location.length + filters.gender.length + filters.category.length + (searchTerm ? 1 : 0);
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
    <aside className="w-full md:w-72 lg:w-80 md:min-w-[280px]">
      <div className="bg-white rounded-lg border p-4 md:sticky md:top-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Filters</h2>
          {hasActiveFilters() && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear All ({getActiveFiltersCount()})
            </Button>
          )}
        </div>
        
        <Accordion type="multiple" className="w-full" defaultValue={["keywords", "location", "category", "gender"]}>
          <AccordionItem value="keywords" className="border-b">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2">
                Keywords
                {searchTerm && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">1</span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <Input
                placeholder="Search by title or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="location" className="border-b">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2">
                Location
                {filters.location.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {filters.location.length}
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                {locations.map((loc) => (
                  <div key={loc} className="flex items-start space-x-3">
                    <Checkbox
                      id={`loc-${loc}`}
                      checked={filters.location.includes(loc)}
                      onCheckedChange={() => handleFilterChange("location", loc)}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <Label 
                      htmlFor={`loc-${loc}`}
                      className="text-sm leading-5 cursor-pointer flex-1 break-words"
                    >
                      {loc}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="category" className="border-b">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2">
                Category
                {filters.category.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {filters.category.length}
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-start space-x-3">
                    <Checkbox
                      id={`cat-${cat}`}
                      checked={filters.category.includes(cat)}
                      onCheckedChange={() => handleFilterChange("category", cat)}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <Label 
                      htmlFor={`cat-${cat}`}
                      className="text-sm leading-5 cursor-pointer flex-1 break-words"
                    >
                      {cat.replace('_', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="gender">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2">
                Gender
                {filters.gender.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {filters.gender.length}
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                {genders.map((gen) => (
                  <div key={gen} className="flex items-start space-x-3">
                    <Checkbox
                      id={`gen-${gen}`}
                      checked={filters.gender.includes(gen)}
                      onCheckedChange={() => handleFilterChange("gender", gen)}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <Label 
                      htmlFor={`gen-${gen}`}
                      className="text-sm leading-5 cursor-pointer flex-1 break-words"
                    >
                      {gen}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="md:hidden mb-4">
          <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="w-full">
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block lg:flex-shrink-0">
            <FilterPanel />
          </div>
          
          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden">
              <FilterPanel />
            </div>
          )}
          
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold">Browse Auditions</h1>
                  <p className="text-gray-600 mt-1">
                    {filteredAuditions.length} audition{filteredAuditions.length !== 1 ? 's' : ''} found
                    {hasActiveFilters() && ' (filtered)'}
                  </p>
                </div>
                
                {hasActiveFilters() && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="mt-4 sm:mt-0"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
              
              {filteredAuditions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No auditions found matching your criteria.</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredAuditions.map((audition) => (
                    <Card key={audition.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl">{audition.title}</CardTitle>
                        <CardDescription className="text-base">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                            {audition.category.replace('_', ' ')}
                          </span>
                          {audition.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{audition.description}</p>
                        <Separator className="my-4" />
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-2">Available Roles:</h4>
                          <div className="flex flex-wrap gap-2">
                            {audition.roles.map((role) => (
                              <span 
                                key={role.id}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {role.name} ({role.gender}, {role.ageRange})
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <div className="p-6 pt-0">
                        <Button asChild className="w-full sm:w-auto">
                          <Link href={`/auditions/${audition.id}`}>View Details & Apply</Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 