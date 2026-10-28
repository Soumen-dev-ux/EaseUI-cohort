import { useState } from "react";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Button } from "@/components/Button/Button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  type TooltipPosition,
  type TooltipAnimation,
} from "@/components/Tooltip";
import {
  ExternalLink,
  Sparkles,
  Command,
  Heart,
  Share2,
  Settings,
  Bell,
  Trash2,
} from "lucide-react";

// --- Static Data Definitions for Logical, Clean Rendering ---
const PLACEMENTS: { position: TooltipPosition; label: string }[] = [
  { position: "top", label: "Top" },
  { position: "bottom", label: "Bottom" },
  { position: "left", label: "Left" },
  { position: "right", label: "Right" },
  { position: "top-start", label: "Top-Start" },
  { position: "top-end", label: "Top-End" },
  { position: "bottom-start", label: "Bottom-Start" },
  { position: "bottom-end", label: "Bottom-End" },
];

const VARIANTS = [
  { variant: "dark", label: "Dark", btn: "dark" as const },
  { variant: "light", label: "Light", btn: "ghost" as const },
  { variant: "primary", label: "Primary", btn: "primary" as const },
  { variant: "secondary", label: "Secondary", btn: "secondary" as const },
  { variant: "outline", label: "Outline", btn: "outline" as const },
  { variant: "gradient", label: "Gradient", btn: "primary" as const },
  { variant: "destructive", label: "Destructive", btn: "destructive" as const },
  { variant: "success", label: "Success", btn: "ok" as const },
] as const;

const ANIMATIONS: { animation: TooltipAnimation; label: string; btn: "primary" | "secondary" | "outline" | "dark" }[] = [
  { animation: "scaleIn", label: "Scale In", btn: "primary" },
  { animation: "slideUp", label: "Slide Up", btn: "secondary" },
  { animation: "fadeIn", label: "Fade In", btn: "outline" },
  { animation: "bounceIn", label: "Bounce In", btn: "dark" },
];

const ACTION_ICONS = [
  { icon: Heart, label: "Like post", hover: "hover:text-red-500", variant: "dark" as const },
  { icon: Share2, label: "Share with link", hover: "hover:text-indigo-600", variant: "dark" as const },
  { icon: Settings, label: "System settings", hover: "hover:text-gray-900", variant: "dark" as const },
  { icon: Bell, label: "3 unread notifications", hover: "hover:text-indigo-600", variant: "primary" as const, badge: true },
];

const PROPS_DATA = [
  { prop: "content", type: "ReactNode", default: "undefined", description: "Content or text displayed inside the floating tooltip." },
  { prop: "position", type: '"top" | "bottom" | "left" | "right" | "top-start" | ...', default: '"top"', description: "Alignment relative to trigger element." },
  { prop: "variant", type: '"dark" | "light" | "primary" | "secondary" | "outline" | "gradient" | "destructive" | "success"', default: '"dark"', description: "Visual style theme." },
  { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Padding and typography size scale." },
  { prop: "arrow", type: "boolean", default: "true", description: "Directional pointer arrow pointing to the trigger." },
  { prop: "animation", type: '"scaleIn" | "fadeIn" | "slideUp" | "bounceIn" | "none"', default: '"scaleIn"', description: "GSAP entrance animation type." },
  { prop: "delay", type: "number", default: "150", description: "Delay in ms before showing on hover." },
  { prop: "delayHide", type: "number", default: "100", description: "Delay in ms before hiding after mouse leaves." },
  { prop: "interactive", type: "boolean", default: "false", description: "Allows hovering over the tooltip content itself." },
  { prop: "trigger", type: '"hover" | "click" | "focus" | "manual"', default: '"hover"', description: "Interaction event that triggers tooltip." },
  { prop: "disabled", type: "boolean", default: "false", description: "Prevents tooltip from showing when true." },
  { prop: "open / onOpenChange", type: "boolean / (open: boolean) => void", default: "undefined", description: "Controlled open state & event handler." },
];

const TooltipPage = () => {
  // Playground State
  const [pos, setPos] = useState<TooltipPosition>("top");
  const [variant, setVariant] = useState<typeof VARIANTS[number]["variant"]>("dark");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [anim, setAnim] = useState<TooltipAnimation>("scaleIn");
  const [arrow, setArrow] = useState(true);
  const [delay, setDelay] = useState(150);

  // Dynamic code snippets
  const playgroundCode = `import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/Button/Button";

<Tooltip
  content="Crafted with EaseUI ✨"
  position="${pos}"
  variant="${variant}"
  size="${size}"
  animation="${anim}"
  arrow={${arrow}}
  delay={${delay}}
>
  <Button variant="primary">Hover Over Me</Button>
</Tooltip>`;

  const basicCode = `<Tooltip content="Primary action" position="top" variant="dark">
  <Button variant="primary">Quick Action</Button>
</Tooltip>
<Tooltip content="Documentation" position="top" variant="light">
  <Button variant="outline">Docs</Button>
</Tooltip>`;

  const compoundCode = `<Tooltip position="top" variant="primary">
  <TooltipTrigger>
    <Button variant="primary">Compound Trigger</Button>
  </TooltipTrigger>
  <TooltipContent>
    Compound Content with custom styling
  </TooltipContent>
</Tooltip>`;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-16 pb-24">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Tooltip</h1>
          <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200">
            v1.0.6
          </span>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">
          A sleek, animated floating label that reveals helpful context when an element receives focus or hover.
          Features GSAP spring animations, 8 placements, 8 rich themes, and accessible keyboard support.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {["GSAP Animations", "8 Placements", "8 Themes", "Arrow Pointer", "Interactive Hover", "Accessible Role"].map((feat) => (
            <span key={feat} className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 border border-gray-200 font-medium">
              ✓ {feat}
            </span>
          ))}
        </div>
      </header>

      {/* Interactive Playground */}
      <section className="space-y-6">
        <div className="border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-purple-50/40 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-indigo-600" /> Interactive Playground
          </h2>
          <p className="text-sm text-gray-600 mb-4">Configure position, variant, motion, and delay in real time.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Position</label>
              <select value={pos} onChange={(e) => setPos(e.target.value as TooltipPosition)} className="w-full text-xs bg-gray-50 border border-gray-300 rounded-md p-2 outline-none">
                {PLACEMENTS.map((p) => <option key={p.position} value={p.position}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Variant</label>
              <select value={variant} onChange={(e) => setVariant(e.target.value as any)} className="w-full text-xs bg-gray-50 border border-gray-300 rounded-md p-2 outline-none">
                {VARIANTS.map((v) => <option key={v.variant} value={v.variant}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Animation</label>
              <select value={anim} onChange={(e) => setAnim(e.target.value as TooltipAnimation)} className="w-full text-xs bg-gray-50 border border-gray-300 rounded-md p-2 outline-none">
                {ANIMATIONS.map((a) => <option key={a.animation} value={a.animation}>{a.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value as any)} className="w-full text-xs bg-gray-50 border border-gray-300 rounded-md p-2 outline-none">
                <option value="sm">Small (sm)</option>
                <option value="md">Medium (md)</option>
                <option value="lg">Large (lg)</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input id="arrow-toggle" type="checkbox" checked={arrow} onChange={(e) => setArrow(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded" />
              <label htmlFor="arrow-toggle" className="text-xs font-medium text-gray-700 cursor-pointer">Show Arrow</label>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Delay ({delay}ms)</label>
              <input type="range" min="0" max="600" step="50" value={delay} onChange={(e) => setDelay(Number(e.target.value))} className="w-full accent-indigo-600 cursor-pointer" />
            </div>
          </div>

          <ComponentDemo code={playgroundCode}>
            <div className="py-8">
              <Tooltip content="Crafted with EaseUI ✨" position={pos} variant={variant} size={size} animation={anim} arrow={arrow} delay={delay}>
                <Button variant="primary" size="lg">Hover Over Me</Button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </div>
      </section>

      {/* 1. Basic Usage */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Basic Usage</h2>
          <p className="text-gray-600 mt-1">Wrap any component with <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">&lt;Tooltip /&gt;</code> and specify <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">content</code>.</p>
        </div>
        <ComponentDemo code={basicCode}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Tooltip content="Primary quick action" position="top" variant="dark">
              <Button variant="primary" size="md">Quick Action</Button>
            </Tooltip>
            <Tooltip content="Read detailed documentation" position="top" variant="light">
              <Button variant="outline" size="md">Documentation</Button>
            </Tooltip>
            <Tooltip content="Delete current item permanently" position="top" variant="destructive">
              <Button variant="destructive" size="md"><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* 2. Placements */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Placements & Orientations</h2>
          <p className="text-gray-600 mt-1">8 directional placements for optimal contextual visibility.</p>
        </div>
        <ComponentDemo code={`<Tooltip content="Top" position="top"><Button>Top</Button></Tooltip>`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-lg py-4">
            {PLACEMENTS.map(({ position, label }) => (
              <Tooltip key={position} content={`Positioned on ${label}`} position={position}>
                <Button variant={position.includes("-") ? "outline" : "dark"} size="sm" className="w-full">
                  {label}
                </Button>
              </Tooltip>
            ))}
          </div>
        </ComponentDemo>
      </section>

      {/* 3. Style Variants */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Style Variants & Themes</h2>
          <p className="text-gray-600 mt-1">8 curated themes to seamlessly communicate status and branding.</p>
        </div>
        <ComponentDemo code={`<Tooltip content="Dark theme" variant="dark"><Button>Dark</Button></Tooltip>`}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {VARIANTS.map(({ variant: v, label, btn }) => (
              <Tooltip key={v} content={`${label} variant`} variant={v}>
                <Button
                  variant={btn}
                  size="sm"
                  className={v === "gradient" ? "bg-gradient-to-r from-indigo-600 to-pink-600 border-none text-white" : ""}
                >
                  {label}
                </Button>
              </Tooltip>
            ))}
          </div>
        </ComponentDemo>
      </section>

      {/* 4. Motion & GSAP Animations */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Motion & GSAP Animations</h2>
          <p className="text-gray-600 mt-1">Hardware-accelerated GSAP easing gives tooltips snappy, organic motion.</p>
        </div>
        <ComponentDemo code={`<Tooltip content="Scale In" animation="scaleIn"><Button>Scale In</Button></Tooltip>`}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {ANIMATIONS.map(({ animation: a, label, btn }) => (
              <Tooltip key={a} content={`${label} motion`} animation={a} position="top">
                <Button variant={btn} size="md">{label}</Button>
              </Tooltip>
            ))}
          </div>
        </ComponentDemo>
      </section>

      {/* 5. Rich & Interactive Content */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Rich & Interactive Content</h2>
          <p className="text-gray-600 mt-1">Embed custom JSX, shortcut badges, and clickable interactive elements.</p>
        </div>
        <ComponentDemo code={`<Tooltip interactive content={<div>AI Search <kbd>⌘K</kbd></div>}><Button>Search</Button></Tooltip>`}>
          <div className="flex flex-wrap items-center justify-center gap-8 py-6">
            {/* Shortcut Tooltip */}
            <Tooltip
              interactive
              variant="dark"
              size="lg"
              position="top"
              content={
                <div className="flex items-center gap-3 p-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <div className="text-left">
                    <p className="font-semibold text-white text-xs">AI Quick Search</p>
                    <p className="text-[10px] text-gray-300">Find anything across library</p>
                  </div>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 rounded text-gray-300 flex items-center gap-0.5">
                    <Command className="w-3 h-3" /> K
                  </kbd>
                </div>
              }
            >
              <Button variant="dark" size="md">
                <Command className="w-4 h-4 mr-2" /> Quick Search
              </Button>
            </Tooltip>

            {/* Profile Tooltip with Soumen Pore */}
            <Tooltip
              interactive
              variant="light"
              size="lg"
              position="bottom"
              content={
                <div className="p-2 space-y-3 w-56 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      SP
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Soumen Pore</p>
                      <p className="text-xs text-gray-500">Developer of this Page</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Modern UI components designed for effortless React apps.</p>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400">1.4k Stars</span>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                      Follow <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              }
            >
              <Button variant="outline" size="md">Author Profile</Button>
            </Tooltip>

            {/* Icon Bar */}
            <div className="flex items-center gap-2 p-1.5 bg-white border border-gray-200 rounded-xl shadow-xs">
              {ACTION_ICONS.map(({ icon: Icon, label, hover, variant: v, badge }) => (
                <Tooltip key={label} content={label} position="top" variant={v}>
                  <button className={`p-2 text-gray-500 ${hover} hover:bg-gray-100 rounded-lg transition-colors relative`}>
                    <Icon className="w-4 h-4" />
                    {badge && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />}
                  </button>
                </Tooltip>
              ))}
            </div>
          </div>
        </ComponentDemo>
      </section>

      {/* 6. Compound API Pattern */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Compound Component Pattern</h2>
          <p className="text-gray-600 mt-1">Compose using <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">&lt;TooltipTrigger&gt;</code> and <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">&lt;TooltipContent&gt;</code>.</p>
        </div>
        <ComponentDemo code={compoundCode}>
          <div className="flex justify-center">
            <Tooltip position="top" variant="primary">
              <TooltipTrigger>
                <Button variant="primary">Compound Trigger</Button>
              </TooltipTrigger>
              <TooltipContent>Compound Content with custom styling</TooltipContent>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* 7. API Reference */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">API Reference</h2>
          <p className="text-gray-600 mt-1">Detailed specification of all props available on the Tooltip component.</p>
        </div>
        <PropsTable data={PROPS_DATA} />
      </section>
    </div>
  );
};

export default TooltipPage;
