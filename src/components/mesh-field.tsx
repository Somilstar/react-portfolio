"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; r: number; glow: number; links: number[] };
type Packet = { from: number; to: number; t: number; speed: number };

const ACCENT = "200, 245, 66";
const NODE_COUNT = 58;
const LINKS_PER_NODE = 2;

function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildMesh(width: number, height: number): Node[] {
  const random = seededRandom(855);
  const count = width < 768 ? Math.round(NODE_COUNT * 0.6) : NODE_COUNT;
  const nodes: Node[] = [];

  for (let attempts = 0; nodes.length < count && attempts < 4000; attempts++) {
    const x = (width < 768 ? 0 : width * 0.32) + random() * width * (width < 768 ? 1 : 0.7);
    const y = random() * height;
    if (nodes.every((n) => Math.hypot(n.x - x, n.y - y) > 58)) {
      nodes.push({ x, y, r: random() < 0.16 ? 3 : 1.6, glow: 0, links: [] });
    }
  }

  nodes.forEach((node, index) => {
    nodes
      .map((other, otherIndex) => ({ otherIndex, distance: Math.hypot(other.x - node.x, other.y - node.y) }))
      .filter(({ otherIndex }) => otherIndex !== index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, LINKS_PER_NODE)
      .forEach(({ otherIndex }) => {
        if (!node.links.includes(otherIndex)) node.links.push(otherIndex);
        if (!nodes[otherIndex].links.includes(index)) nodes[otherIndex].links.push(index);
      });
  });
  return nodes;
}

/** Animated service mesh: packets hop between nodes, and nodes light up near the pointer. */
export function MeshField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const random = seededRandom(27);
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    const pointer = { x: -1000, y: -1000 };

    const spawnPacket = (from: number): Packet | null => {
      const links = nodes[from]?.links;
      if (!links?.length) return null;
      const to = links[Math.floor(random() * links.length)];
      return { from, to, t: 0, speed: 0.008 + random() * 0.012 };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      nodes = buildMesh(width, height);
      packets = Array.from({ length: width < 768 ? 8 : 16 }, () => spawnPacket(Math.floor(random() * nodes.length))).filter(
        (packet): packet is Packet => packet !== null,
      );
    };

    const proximity = (x: number, y: number) => Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 170);

    const draw = () => {
      context.clearRect(0, 0, width, height);

      nodes.forEach((node, index) => {
        node.links.forEach((linkIndex) => {
          if (linkIndex < index) return;
          const other = nodes[linkIndex];
          const near = proximity((node.x + other.x) / 2, (node.y + other.y) / 2);
          context.strokeStyle = near > 0 ? `rgba(${ACCENT}, ${0.08 + near * 0.3})` : "rgba(255, 255, 255, 0.075)";
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        });
      });

      nodes.forEach((node) => {
        const energy = Math.min(1, node.glow + proximity(node.x, node.y));
        if (energy > 0.02) {
          context.fillStyle = `rgba(${ACCENT}, ${energy * 0.16})`;
          context.beginPath();
          context.arc(node.x, node.y, node.r + 9 * energy, 0, Math.PI * 2);
          context.fill();
        }
        context.fillStyle = energy > 0.02 ? `rgba(${ACCENT}, ${0.45 + energy * 0.55})` : "rgba(255, 255, 255, 0.34)";
        context.beginPath();
        context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        context.fill();
        node.glow *= 0.955;
      });

      packets.forEach((packet) => {
        const from = nodes[packet.from];
        const to = nodes[packet.to];
        const x = from.x + (to.x - from.x) * packet.t;
        const y = from.y + (to.y - from.y) * packet.t;
        const tail = Math.max(0, packet.t - 0.22);

        const gradient = context.createLinearGradient(
          from.x + (to.x - from.x) * tail,
          from.y + (to.y - from.y) * tail,
          x,
          y,
        );
        gradient.addColorStop(0, `rgba(${ACCENT}, 0)`);
        gradient.addColorStop(1, `rgba(${ACCENT}, 0.8)`);
        context.strokeStyle = gradient;
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(from.x + (to.x - from.x) * tail, from.y + (to.y - from.y) * tail);
        context.lineTo(x, y);
        context.stroke();

        context.fillStyle = `rgb(${ACCENT})`;
        context.beginPath();
        context.arc(x, y, 1.9, 0, Math.PI * 2);
        context.fill();

        packet.t += packet.speed;
        if (packet.t >= 1) {
          to.glow = 1;
          const next = spawnPacket(packet.to);
          if (next) Object.assign(packet, next);
        }
      });
    };

    const loop = () => {
      draw();
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const resume = () => {
      if (!reducedMotion && visible && !document.hidden && !frame) frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onResize = () => {
      resize();
      if (reducedMotion) draw();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });

    onResize();
    observer.observe(canvas);
    resume();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", resume);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)] md:opacity-100 md:[mask-image:linear-gradient(to_right,transparent_42%,black_74%)]"
    />
  );
}
