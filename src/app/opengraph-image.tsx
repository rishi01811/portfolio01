import { ImageResponse } from "next/og";
export const alt = "Rishi — Developer, thinker, builder. Based in India.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", background: "#111310", color: "#f0f1e9" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}><span>rishi<span style={{ color: "#d3f89a" }}>.</span></span><span style={{ color: "#d3f89a" }}>DEVELOPER · AI ENTHUSIAST</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 92, letterSpacing: "-5px", lineHeight: 1.05 }}><span>Curiosity meets code.</span><span style={{ color: "#d3f89a" }}>Ideas become real.</span></div><div style={{ display: "flex", fontSize: 24, color: "#a5a99e" }}>Based in India. Building for everywhere.</div></div>, size);
}
