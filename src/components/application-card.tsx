import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Application } from "@/data/applications";
import { auditions } from "@/data/auditions";
import Image from "next/image";

type ApplicationCardProps = {
  application: Application;
};

export function ApplicationCard({ application }: ApplicationCardProps) {
  const audition = auditions.find((a) => a.id === application.auditionId);
  const role = audition?.roles.find((r) => r.id === application.roleId);

  if (!audition || !role) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{audition.title}</CardTitle>
            <CardDescription>
              {role.name} at {audition.location}
            </CardDescription>
          </div>
          <Badge variant={application.status.toLowerCase() as "submitted" | "shortlisted" | "rejected"}>{application.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{application.bio}</p>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Headshots</h4>
            <div className="flex flex-wrap gap-2">
              {application.headshots.map((src, i) => (
                <div key={i} className="relative w-24 h-24">
                  <Image
                    src={src}
                    alt={`Headshot ${i + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Videos</h4>
            <div className="flex flex-col gap-2">
              {application.videos.map((src, i) => (
                <a
                  key={i}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline py-1"
                >
                  Video {i + 1}
                </a>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild>
          <a
            href={application.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
} 