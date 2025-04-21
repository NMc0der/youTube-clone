import Image from "next/image";
import { PageHeader } from "./components/PageHeader";

export default function Home() {
  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="gird grid-cols-[auto,1fr] flex-grow-1 overflow-auto"></div>
    </div>
  );
}
