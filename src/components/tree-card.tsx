// "use client";

// interface Operation {
//   id: number;
//   type: string;
//   rightNumber: number;
//   result: number;
//   userId: number;
//   user: {
//     username: string;
//   };
//   createdAt: string;
//   children: Operation[];
// }

// interface Props {
//   id: number;
//   startingNumber: number;
//   userId: number;
//   user: { username: string };
//   operations: Operation[];
//   createdAt: string;
//   isOperation?: boolean;
// }

// import { useState } from "react";
// import Link from "next/link";
// import OperationModal from "./operation-modal";

// function TreeCard({ id, startingNumber, user, operations }: Props) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOperation, setSelectedOperation] = useState<Operation | null>(
//     null
//   );

//   return (
//     <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
//       <Link href={`/tree/${id}`}>
//         <div className="flex items-center gap-4">
//           <div className="rounded-full bg-primary-500 p-4">
//             {startingNumber}
//           </div>
//           <span className="text-light-1">{user?.username}</span>
//         </div>
//       </Link>

//       {operations.length > 0 && (
//         <div className="mt-4">
//           {operations.map((operation) => (
//             <div
//               key={operation.id}
//               className="flex items-center justify-between hover:bg-primary-500/10 p-2 rounded"
//             >
//               <span className="text-light-1">{operation.result}</span>
//               <button
//                 onClick={() => {
//                   setSelectedOperation(operation);
//                   setIsModalOpen(true);
//                 }}
//                 className="flex items-center gap-2 text-primary-500 hover:text-primary-400"
//               >
//                 <span>Reply</span>
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <OperationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         treeId={id}
//         parentOperation={selectedOperation}
//       />
//     </article>
//   );
// }

// export default TreeCard;
