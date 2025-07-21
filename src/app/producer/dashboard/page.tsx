"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import { CastingCall } from "@prisma/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CastingCallWithApplicantCount extends CastingCall {
  applicantCount: number;
}

export default function ProducerDashboard() {
  const { data: producerAuditions, error } = useSWR<CastingCallWithApplicantCount[]>("/api/casting", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!producerAuditions) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">My Casting Calls</h1>
        <Button asChild>
          <Link href="/producer/new">Create New Casting</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Posted Castings</CardTitle>
          <CardDescription>
            A list of your active and past casting calls.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {producerAuditions.map((audition) => (
                  <TableRow key={audition.id}>
                    <TableCell className="font-medium">
                      {audition.title}
                    </TableCell>
                    <TableCell>{audition.category}</TableCell>
                    <TableCell>{audition.location}</TableCell>
                    <TableCell>{audition.applicantCount}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/producer/${audition.id}`}>
                          View Applicants
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Mobile View */}
          <div className="md:hidden">
            <div className="space-y-4">
              {producerAuditions.map((audition) => (
                <Card key={audition.id}>
                  <CardHeader>
                    <CardTitle>{audition.title}</CardTitle>
                    <CardDescription>
                      {audition.category} - {audition.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Applicants</p>
                      <p className="font-medium">
                        {audition.applicantCount}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <Link href={`/producer/${audition.id}`}>
                        View Applicants
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 