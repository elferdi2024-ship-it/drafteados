import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sobre Sellado",
  description: "Tus 13 predicciones oficiales selladas para la temporada regular.",
  path: "/pickem/locked",
  noIndex: true,
});

export default function LockedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
