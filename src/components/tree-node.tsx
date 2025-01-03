"use client";

import { useState } from "react";
import Image from "next/image";
import OperationModal from "./operation-modal";
import { Operation } from "@/lib/types";

interface TreeNodeProps {
  operation: Operation;
  isRoot?: boolean;
  parentNumber?: number;
  treeId: number;
  fetchTreeById?: (id: string) => Promise<any>;
}

const TreeNode = ({
  treeId,
  operation,
  isRoot,
  parentNumber,
  fetchTreeById,
}: TreeNodeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getOperationSymbol = (type: string) => {
    switch (type) {
      case "ADD":
        return "+";
      case "SUBTRACT":
        return "-";
      case "MULTIPLY":
        return "×";
      case "DIVIDE":
        return "÷";
      default:
        return "";
    }
  };

  return (
    <div className="ml-8 border-l-2 border-gray-700 pl-4 relative">
      <div className="absolute left-0 top-6 w-4 h-[2px] bg-gray-700/50" />
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          {!isRoot && (
            <>
              <span className="text-gray-400 opacity-40 ml-1">
                {parentNumber}
              </span>
              <span className="text-gray-400">
                {getOperationSymbol(operation.type)}
              </span>
              <span className="text-gray-400">{operation.rightNumber}</span>
              <span className="text-gray-400">=</span>
            </>
          )}
          <div className="rounded-lg bg-primary-500 min-w-[50px] h-10 px-4 flex items-center justify-center ml-2">
            <span className="text-light-1 text-base font-medium">
              {operation.result}{" "}
            </span>
          </div>
        </div>

        <span className="text-light-2 text-sm">
          by {operation?.user?.username}
        </span>

        <button
          onClick={() => setIsModalOpen(true)}
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

      {operation.children?.map((child) => (
        <TreeNode
          treeId={treeId}
          key={child.id}
          operation={child}
          parentNumber={operation.result}
          fetchTreeById={fetchTreeById}
        />
      ))}

      <OperationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        parentOperation={operation}
        fetchTreeById={fetchTreeById}
      />
    </div>
  );
};

export default TreeNode;
