import Default from "src/pages/Default";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
  ];
}

export default function Home() {
  return <Default />;
}
