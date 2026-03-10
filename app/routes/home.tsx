import type { Route } from "./+types/home";
import { Index } from "../pages/Index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Scarce Medix" },
    { name: "description", content: "Welcome to Scarce Medix" },
  ];
}

export default function Home() {
  return <Index />;
}
