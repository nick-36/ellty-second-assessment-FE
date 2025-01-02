"use client";

import { useRouter } from "next/navigation";
import { formatDateString } from "@/lib/utils";

interface Tree {
  id: number;
  startingNumber: number;
  user: { username: string };
  operations: { length: number };
  createdAt: string;
}

function TreeCard({ tree }: { tree: Tree }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/tree/${tree.id}`)}
      className="bg-dark-2 rounded-xl p-6 cursor-pointer hover:bg-dark-3"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary-500 min-w-[100px] h-10 px-4 flex items-center justify-center">
              <span className="text-light-1 text-base font-medium">
                {tree.startingNumber}
              </span>
            </div>
            <span className="text-light-1">{tree.user.username}</span>
          </div>

          <span className="text-gray-500">
            {tree.operations.length}{" "}
            {tree.operations.length === 1 ? "operation" : "operations"}
          </span>
        </div>

        <span className="text-xs text-gray-500">
          {formatDateString(tree.createdAt)}
        </span>
      </div>
    </div>
  );
}

function TreeList({ trees }: { trees: Tree[] }) {
  return (
    <div className="flex flex-col gap-6">
      {trees?.map((tree) => (
        <TreeCard key={tree.id} tree={tree} />
      ))}

      {trees.length === 0 && (
        <p className="text-center text-light-2">No trees found</p>
      )}
    </div>
  );
}

export default TreeList;
