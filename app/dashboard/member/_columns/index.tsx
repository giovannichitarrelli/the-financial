"use client";

import { Member } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import EditMemberButton from "../_components/edit-member-button";
import DeleteMemberButton from "../_components/delete-member-button";

export const MemberColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "createAt",
    header: "Date",
    cell: ({ row: { original: member } }) =>
      new Date(member.createAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },

  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: member } }) => {
      return (
        <div className="space-x-1">
          <EditMemberButton member={member} />

          <DeleteMemberButton memberId={member.id} />
        </div>
      );
    },
  },
];
