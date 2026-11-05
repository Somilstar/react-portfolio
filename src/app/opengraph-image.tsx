import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0a0b0c",
        color: "#f2f3ef",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#a0a4a9" }}>
        <div style={{ width: 16, height: 16, borderRadius: 16, background: "#c8f542" }} />
        {profile.name}
      </div>
      <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05, letterSpacing: -3, fontWeight: 600, maxWidth: 980 }}>
        {profile.headline}
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#a0a4a9" }}>
        {profile.role} · IBM · York University · {profile.location}
      </div>
    </div>,
    size,
  );
}
