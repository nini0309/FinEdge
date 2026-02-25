"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type Props = {
  profile: any;
  onEdit: () => void;
};
export default function ProfileView({ profile, onEdit }: Props) {
  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {profile.name}'s Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Personal Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileItem label="Name" value={profile.name} />
              <ProfileItem label="Age" value={profile.age} />
              <ProfileItem label="Gender" value={profile.gender} />
              <ProfileItem label="Phone" value={profile.phone} />
              <ProfileItem label="Address" value={profile.address} />
              <ProfileItem
                label="Marital Status"
                value={
                  <Badge
                    variant={profile.marital_status ? "default" : "secondary"}
                  >
                    {profile.marital_status ? "Married" : "Single"}
                  </Badge>
                }
              />
            </div>
          </div>

          {/* Professional Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Income Details</h3>
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileItem
                label="Self Employed"
                value={
                  <Badge
                    variant={profile.self_employed ? "default" : "secondary"}
                  >
                    {profile.self_employed ? "Yes" : "No"}
                  </Badge>
                }
              />
              <ProfileItem
                label="Graduate"
                value={
                  <Badge variant={profile.graduate ? "default" : "secondary"}>
                    {profile.graduate ? "Yes" : "No"}
                  </Badge>
                }
              />
              <ProfileItem
                label="Dependents"
                value={profile.no_of_dependents}
              />
              <ProfileItem
                label="Property Area"
                value={<Badge>{profile.property_area}</Badge>}
              />
            </div>
          </div>

          {/* Government Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Verification Details</h3>
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileItem label="Aadhar" value={profile.aadhar} />
              <ProfileItem label="PAN" value={profile.pan} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="mx-auto" onClick={onEdit}>
            Edit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function ProfileItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="text-base font-medium mt-1">{value}</div>
    </div>
  );
}
