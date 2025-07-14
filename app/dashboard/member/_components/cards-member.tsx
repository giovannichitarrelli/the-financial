"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Member } from "@prisma/client";

import EditMemberButton from "./edit-member-button";
import DeleteMemberButton from "./delete-member-button";

interface Props {
  member: Member;
}
const CardsMember = ({ member }: Props) => {
  return (
    <Card key={member.id}>
      <CardContent className="flex flex-col gap-2 p-3">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2 text-xs">
            <p className="text-xs">
              {new Date(member.createAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="space-x-1">
            <EditMemberButton member={member} />

            <DeleteMemberButton memberId={member.id} />
          </div>
        </div>
        <h2 className="text-xs font-bold">{member.name}</h2>
      </CardContent>
    </Card>
  );
};

export default CardsMember;
