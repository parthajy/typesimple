import { ARTIFACTS } from "@/lib/artifacts";
import { Tile } from "@/components/Tile";

export function ArtifactGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {ARTIFACTS.map((a) => (
        <Tile key={a.id} a={a} />
      ))}
    </div>
  );
}
