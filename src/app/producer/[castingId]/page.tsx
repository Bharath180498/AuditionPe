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
import { auditions } from "@/data/auditions";
import { applications } from "@/data/applications";
import { Button } from "@/components/ui/button";

export default function ViewApplicantsPage() {
  const params = useParams();
  const { castingId } = params;

  const audition = auditions.find((a) => a.id === castingId);
  const auditionApplications = applications.filter(
    (app) => app.auditionId === castingId
  );

  if (!audition) {
    return <div>Casting call not found</div>;
  }

  const getRoleName = (roleId: string) => {
    return audition.roles.find((r) => r.id === roleId)?.name || "N/A";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{audition.title}</h1>
      <p className="text-lg text-gray-500 mb-6">Applicants</p>
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
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{getRoleName(app.roleId)}</TableCell>
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
                    <CardTitle>{app.name}</CardTitle>
                    <CardDescription>{app.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Role</span>
                      <span>{getRoleName(app.roleId)}</span>
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