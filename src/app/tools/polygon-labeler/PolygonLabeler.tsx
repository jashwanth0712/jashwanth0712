"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Pt = { x: number; y: number };
type Poly = {
  pts: Pt[];
  label: string;
  color: string;
  textColor: string;
  size?: number;
  x?: number;
  y?: number;
};

const FONT = "system-ui, sans-serif";

function inside(pt: Pt, poly: Pt[]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i],
      b = poly[j];
    if (
      a.y > pt.y !== b.y > pt.y &&
      pt.x < ((b.x - a.x) * (pt.y - a.y)) / (b.y - a.y) + a.x
    )
      c = !c;
  }
  return c;
}

// Is a w×h box centered at (x,y) fully inside the polygon?
function boxFits(x: number, y: number, w: number, h: number, poly: Pt[]) {
  const n = 8;
  for (let i = 0; i <= n; i++)
    for (let j = 0; j <= n; j++) {
      if (i && j && i < n && j < n) continue; // outline only
      if (
        !inside({ x: x - w / 2 + (w * i) / n, y: y - h / 2 + (h * j) / n }, poly)
      )
        return false;
    }
  // a vertex poking into the box means an edge crosses it
  return !poly.some((p) => Math.abs(p.x - x) < w / 2 && Math.abs(p.y - y) < h / 2);
}

// Largest font size (and its position) so the text sits entirely inside the polygon.
function fitLabel(ctx: CanvasRenderingContext2D, poly: Pt[], text: string) {
  const xs = poly.map((p) => p.x),
    ys = poly.map((p) => p.y);
  const minX = Math.min(...xs),
    maxX = Math.max(...xs),
    minY = Math.min(...ys),
    maxY = Math.max(...ys);
  let best = { size: 0, x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
  const G = 28;
  for (let i = 0; i <= G; i++)
    for (let j = 0; j <= G; j++) {
      const x = minX + ((maxX - minX) * i) / G,
        y = minY + ((maxY - minY) * j) / G;
      if (!inside({ x, y }, poly)) continue;
      let lo = 0,
        hi = Math.min(maxY - minY, 400);
      for (let k = 0; k < 12; k++) {
        const s = (lo + hi) / 2;
        ctx.font = `bold ${s}px ${FONT}`;
        const w = ctx.measureText(text).width;
        if (boxFits(x, y, w, s * 0.8, poly)) lo = s;
        else hi = s;
      }
      if (lo > best.size) best = { size: lo, x, y };
    }
  best.size = Math.max(best.size, 8);
  return best;
}

export default function PolygonLabeler() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const polysRef = useRef<Poly[]>([]);
  const curRef = useRef<Pt[]>([]);
  const mouseRef = useRef<Pt | null>(null);
  const [color, setColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#ffffff");
  const [loaded, setLoaded] = useState(false);
  const colorRef = useRef(color);
  colorRef.current = color;
  const textColorRef = useRef(textColor);
  textColorRef.current = textColor;

  const draw = useCallback(() => {
    const cv = cvRef.current,
      img = imgRef.current;
    if (!cv || !img) return;
    const ctx = cv.getContext("2d")!;
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.drawImage(img, 0, 0);
    const lw = Math.max(2, cv.width / 400);
    for (const p of polysRef.current) {
      ctx.beginPath();
      p.pts.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      ctx.closePath();
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.lineWidth = lw;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      if (p.label && p.size) {
        ctx.font = `bold ${p.size}px ${FONT}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineWidth = p.size / 10;
        ctx.lineJoin = "round";
        ctx.strokeStyle = "rgba(0,0,0,.65)";
        ctx.strokeText(p.label, p.x!, p.y!);
        ctx.fillStyle = p.textColor;
        ctx.fillText(p.label, p.x!, p.y!);
      }
    }
    const cur = curRef.current;
    if (cur.length) {
      const pts = mouseRef.current ? [...cur, mouseRef.current] : cur;
      ctx.beginPath();
      pts.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      ctx.lineWidth = lw;
      ctx.strokeStyle = colorRef.current;
      ctx.stroke();
      ctx.fillStyle = colorRef.current;
      cur.forEach((q, i) => {
        ctx.beginPath();
        ctx.arc(q.x, q.y, lw * (i ? 2.5 : 4), 0, 7);
        ctx.fill();
      });
    }
  }, []);

  const loadFile = useCallback(
    (f?: File | null) => {
      if (!f || !f.type.startsWith("image/")) return;
      const im = new Image();
      im.onload = () => {
        const cv = cvRef.current!;
        imgRef.current = im;
        polysRef.current = [];
        curRef.current = [];
        cv.width = im.naturalWidth;
        cv.height = im.naturalHeight;
        setLoaded(true);
        draw();
      };
      im.src = URL.createObjectURL(f);
    },
    [draw]
  );

  const pos = (e: { clientX: number; clientY: number }): Pt => {
    const cv = cvRef.current!,
      r = cv.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) * cv.width) / r.width,
      y: ((e.clientY - r.top) * cv.height) / r.height,
    };
  };

  const finish = useCallback(() => {
    const pts = curRef.current;
    curRef.current = [];
    mouseRef.current = null;
    if (pts.length < 3) return draw();
    const label = window.prompt("Label for this region:", "") || "";
    const poly: Poly = {
      pts,
      label,
      color: colorRef.current,
      textColor: textColorRef.current,
    };
    if (label) Object.assign(poly, fitLabel(cvRef.current!.getContext("2d")!, pts, label));
    polysRef.current.push(poly);
    draw();
  }, [draw]);

  const undo = useCallback(() => {
    if (curRef.current.length) curRef.current.pop();
    else polysRef.current.pop();
    draw();
  }, [draw]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!imgRef.current) return;
      if (e.key === "Enter" && curRef.current.length) finish();
      if (e.key === "Escape") {
        curRef.current = [];
        draw();
      }
      if (e.key === "z" && (e.metaKey || e.ctrlKey)) undo();
    };
    const onPaste = (e: ClipboardEvent) => {
      const f = [...(e.clipboardData?.files ?? [])][0];
      if (f) loadFile(f);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("paste", onPaste);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("paste", onPaste);
    };
  }, [finish, undo, draw, loadFile]);

  const save = () => {
    if (!imgRef.current) return;
    const prev = curRef.current;
    curRef.current = [];
    draw();
    const a = document.createElement("a");
    a.download = "labeled.png";
    a.href = cvRef.current!.toDataURL();
    a.click();
    curRef.current = prev;
    draw();
  };

  const btn =
    "rounded-md px-3 py-1.5 text-sm transition-colors disabled:opacity-40";
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        loadFile(e.dataTransfer.files[0]);
      }}
    >
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-zinc-800 p-3">
        <label className={`${btn} cursor-pointer bg-blue-500 text-white hover:bg-blue-400`}>
          Open image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => loadFile(e.target.files?.[0])}
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          Fill
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          Text
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </label>
        <button className={`${btn} bg-zinc-800 hover:bg-zinc-700`} disabled={!loaded} onClick={undo}>
          Undo
        </button>
        <button
          className={`${btn} bg-zinc-800 hover:bg-zinc-700`}
          disabled={!loaded}
          onClick={() => {
            polysRef.current = [];
            curRef.current = [];
            draw();
          }}
        >
          Clear all
        </button>
        <button className={`${btn} bg-zinc-800 hover:bg-zinc-700`} disabled={!loaded} onClick={save}>
          Save PNG
        </button>
      </div>
      {!loaded && (
        <div className="rounded-lg border border-dashed border-zinc-700 px-6 py-20 text-center text-zinc-500">
          Open, drop or paste an image to start
        </div>
      )}
      <canvas
        ref={cvRef}
        hidden={!loaded}
        className="mx-auto max-w-full cursor-crosshair rounded-lg border border-zinc-800"
        onClick={(e) => {
          if (e.detail > 1) return; // double-click handled below
          const p = pos(e),
            cur = curRef.current,
            cv = cvRef.current!,
            tol = (12 * cv.width) / cv.getBoundingClientRect().width;
          if (cur.length >= 3 && Math.hypot(p.x - cur[0].x, p.y - cur[0].y) < tol)
            return finish();
          cur.push(p);
          draw();
        }}
        onDoubleClick={() => {
          curRef.current.pop(); // second click of the dblclick added a duplicate point
          finish();
        }}
        onMouseMove={(e) => {
          mouseRef.current = pos(e);
          if (curRef.current.length) draw();
        }}
      />
      {loaded && (
        <p className="mt-3 text-xs text-zinc-500">
          Click to add points. Click the first point, double-click or press
          Enter to close. Esc cancels. Ctrl/Cmd+Z undoes.
        </p>
      )}
    </div>
  );
}
