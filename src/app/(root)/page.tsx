import TreeList from "@/components/tree-list";
import { getTrees } from "@/lib/actions";

export default async function Home() {
  const trees = await getTrees();
  return <TreeList trees={trees} />;
}
