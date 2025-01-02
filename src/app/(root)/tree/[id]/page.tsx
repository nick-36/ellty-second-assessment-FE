"use client";
import { use, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import TreeNode from "@/components/tree-node";
import Image from "next/image";
import OperationModal from "@/components/operation-modal";
import { Operation, Tree } from "@/lib/types";
import Cookies from "js-cookie";
import { ImSpinner } from "react-icons/im";

export default function TreePage({ params }: { params: Promise<any> }) {
  const { id }: { id: string } = use(params);
  if (!id) return null;

  const [tree, setTree] = useState<Tree | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRootModalOpen, setIsRootModalOpen] = useState(false);

  async function fetchTreeById(id: string) {
    setIsLoading(true);
    try {
      const token = Cookies.get("jwt");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_PROD}/trees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTree(response.data);
    } catch (error: any) {
      return null;
    }
    setIsLoading(false);
  }

  useEffect(() => {
    async function fetchData() {
      await fetchTreeById(id);
    }

    fetchData();
  }, [tree?.id]);

  if (isLoading) {
    return (
      <div className="grid place-items-center h-screen">
        <ImSpinner className="animate-spin text-3xl text-primary-500" />
      </div>
    );
  }

  if (!tree) {
    throw new Error("Tree not found");
  }

  return (
    <section className="relative">
      <div className="bg-dark-2 p-7 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary-500 p-4 h-10 w-10 flex items-center justify-center">
              <span className="text-light-1">{tree?.startingNumber}</span>
            </div>
            <span className="text-light-1">{tree?.user?.username}</span>
          </div>

          <button
            onClick={() => setIsRootModalOpen(true)}
            className="flex items-center gap-2 text-primary-500 hover:text-primary-400"
          >
            <Image
              src="/assets/reply.svg"
              alt="reply"
              width={20}
              height={20}
              className="cursor-pointer object-contain"
            />
            <span>Reply</span>
          </button>
        </div>

        <div className="mt-4">
          {tree?.operations.map((operation: Operation) => (
            <TreeNode
              treeId={parseInt(id)}
              key={operation.id}
              operation={operation}
              isRoot
              parentNumber={tree.startingNumber}
              fetchTreeById={fetchTreeById}
            />
          ))}
        </div>
        <OperationModal
          isOpen={isRootModalOpen}
          onClose={() => setIsRootModalOpen(false)}
          fetchTreeById={fetchTreeById}
          parentOperation={{
            id: null,
            result: tree?.startingNumber,
          }}
        />
      </div>
    </section>
  );
}
