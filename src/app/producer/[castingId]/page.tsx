"use client";

import { useParams } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { Application, Role, User } from "@prisma/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ApplicationWithDetails extends Application {
  actor: User;
  role: Role;
}

export default function ViewApplicantsPage() {
  const params = useParams();
  const { castingId } = params;
  const { data: auditionApplications, error } = useSWR<ApplicationWithDetails[]>(
    `/api/casting/${castingId}/applicants`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!auditionApplications) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Applicants</h1>
      <Card>
        <CardHeader>
          <CardTitle>Received Applications</CardTitle>
          <CardDescription>
            A list of all actors who applied for this casting call.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Applied for Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditionApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.actor.name}</TableCell>
                    <TableCell>{app.actor.email}</TableCell>
                    <TableCell>{app.role.name}</TableCell>
                    <TableCell>
                      <Badge>{app.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
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
              {auditionApplications.map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <CardTitle>{app.actor.name}</CardTitle>
                    <CardDescription>{app.actor.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Role</span>
                      <span>{app.role.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <Badge>{app.status}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
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