import { useState, useMemo } from "react";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Button } from "@/components/Button/Button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  type TooltipPosition,
  type TooltipAnimation,
  type TooltipVariant,
  type TooltipSize,
  type TooltipTriggerMode,
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
  MousePointer,
  Hand,
  Focus,
  Sliders,
} from "lucide-react";

// --- Static Constants ---
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

const VARIANTS: {
  variant: TooltipVariant;
  label: string;
  btn: "dark" | "ghost" | "primary" | "secondary" | "outline" | "destructive" | "ok";
}[] = [
  { variant: "dark", label: "Dark", btn: "dark" },
  { variant: "light", label: "Light", btn: "ghost" },
  { variant: "primary", label: "Primary", btn: "primary" },
  { variant: "secondary", label: "Secondary", btn: "secondary" },
  { variant: "outline", label: "Outline", btn: "outline" },
  { variant: "gradient", label: "Gradient", btn: "primary" },
  { variant: "destructive", label: "Destructive", btn: "destructive" },
  { variant: "success", label: "Success", btn: "ok" },
];

const ANIMATIONS: {
  animation: TooltipAnimation;
  label: string;
  btn: "primary" | "secondary" | "outline" | "dark";
}[] = [
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
  { prop: "animation", type: '"scaleIn" | "fadeIn" | "slideUp" | "bounceIn" | "none"', default: '"scaleIn"', description: "Hardware-accelerated GSAP entrance animation." },
  { prop: "trigger", type: '"hover" | "click" | "focus" | "manual"', default: '"hover"', description: "Interaction event that triggers tooltip." },
  { prop: "interactive", type: "boolean", default: "false", description: "Allows hovering over the tooltip content without it closing." },
  { prop: "delay", type: "number", default: "150", description: "Delay in milliseconds before showing on hover." },
  { prop: "delayHide", type: "number", default: "100", description: "Delay in milliseconds before hiding after cursor leaves." },
  { prop: "disabled", type: "boolean", default: "false", description: "Prevents tooltip from showing when true." },
  { prop: "open / onOpenChange", type: "boolean / (open: boolean) => void", default: "undefined", description: "Controlled open state & event callback." },
  { prop: "asChild", type: "boolean", default: "false", description: "Merge behavior directly into the immediate child element." },
];

const TooltipPage = () => {
  // Playground State
  const [pos, setPos] = useState<TooltipPosition>("top");
  const [variant, setVariant] = useState<TooltipVariant>("dark");
  const [size, setSize] = useState<TooltipSize>("md");
  const [anim, setAnim] = useState<TooltipAnimation>("scaleIn");
  const [trigger, setTrigger] = useState<TooltipTriggerMode>("hover");
  const [arrow, setArrow] = useState(true);
  const [interactive, setInteractive] = useState(false);
  const [delay, setDelay] = useState(150);

  // Controlled Demo State
  const [isControlledOpen, setIsControlledOpen] = useState(false);

  // Dynamic Playground Code Generation
  const playgroundCode = useMemo(() => {
    const propsList: string[] = ['content="Crafted with EaseUI ✨"'];
    if (pos !== "top") propsList.push(`position="${pos}"`);
    if (variant !== "dark") propsList.push(`variant="${variant}"`);
    if (size !== "md") propsList.push(`size="${size}"`);
    if (anim !== "scaleIn") propsList.push(`animation="${anim}"`);
    if (trigger !== "hover") propsList.push(`trigger="${trigger}"`);
    if (!arrow) propsList.push("arrow={false}");
    if (interactive) propsList.push("interactive");
    if (delay !== 150) propsList.push(`delay={${delay}}`);

    return `import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/Button/Button";

<Tooltip
  ${propsList.join("\n  ")}
>
  <Button variant="primary">Hover Over Me</Button>
</Tooltip>`;
  }, [pos, variant, size, anim, trigger, arrow, interactive, delay]);

  const basicCode = `<Tooltip content="Primary action" position="top" variant="dark">
  <Button variant="primary">Quick Action</Button>
</Tooltip>

<Tooltip content="Documentation" position="top" variant="light">
  <Button variant="outline">Docs</Button>
</Tooltip>

<Tooltip content="Delete current item permanently" position="top" variant="destructive">
  <Button variant="destructive">
    <Trash2 className="w-4 h-4 mr-2" />Delete
  </Button>
</Tooltip>`;

  const triggersCode = `// 1. Hover Trigger (default)
<Tooltip content="Opens on hover" trigger="hover">
  <Button variant="outline">Hover Me</Button>
</Tooltip>

// 2. Click Trigger (click outside or Esc closes)
<Tooltip content="Click outside to dismiss" trigger="click">
  <Button variant="primary">Click Me</Button>
</Tooltip>

// 3. Focus Trigger (accessible keyboard navigation)
<Tooltip content="Press Tab to focus" trigger="focus">
  <Button variant="secondary">Focus Me</Button>
</Tooltip>`;

  const controlledCode = `const [open, setOpen] = useState(false);

<div className="flex items-center gap-4">
  <Button onClick={() => setOpen(!open)}>
    Toggle Tooltip ({open ? "Open" : "Closed"})
  </Button>

  <Tooltip
    open={open}
    onOpenChange={setOpen}
    trigger="manual"
    content="Controlled programmatically!"
    position="right"
    variant="primary"
  >
    <span className="p-2 border rounded-md text-xs font-medium">
      Target Element
    </span>
  </Tooltip>
</div>`;

  const compoundCode = `<Tooltip position="top" variant="primary">
  <TooltipTrigger asChild>
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
          A sleek, hardware-accelerated floating label that reveals contextual information on hover, focus, or click.
          Built with GSAP physics, smart directional collision offsets, accessible keyboard support, and compound components.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {["GSAP Physics", "8 Orientations", "8 Curated Themes", "Arrow Pointer", "Interactive Bridge", "WAI-ARIA Compliant"].map((feat) => (
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
          <p className="text-sm text-gray-600 mb-4">Customize position, variant, animation, trigger, and delay in real-time.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Position</label>
              <select
                value={pos}
                onChange={(e) => setPos(e.target.value as TooltipPosition)}
                className="w-full text-xs bg-gray-50 border border-gray-300 rounded-md p-2 outline-none font-medium"
              >
                {PLACEMENTS.map((p) => (
                  <option key={p.position} value={p.position}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Variant</label>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as TooltipVariant)}
                className="w-full text-xs bg-gray-50 border border-gray-300 rounded-md p-2 outline-none font-medium"
              >
                {VARIANTS.map((v) => (
                  <option key={v.variant} value={v.variant}>{v.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Animation</label>
              <select
                value={anim}
                onChange={(e) => setAnim(e.target.value as TooltipAnimation)}
                className="w-full text-xs bg-gray-50 border border-gray-300 rounded-md p-2 outline-none font-medium"
              >
                {ANIMATIONS.map((a) => (
                  <option key={a.animation} value={a.animation}>{a.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Trigger Mode</label>
              <select
                value={trigger}
                onChange={(e) => setTrigger(e.target.value as TooltipTriggerMode)}
                className="w-full text-xs bg-gray-50 border border-gray-300 rounded-md p-2 outline-none font-medium"
              >
                <option value="hover">Hover</option>
                <option value="click">Click</option>
                <option value="focus">Focus</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as TooltipSize)}
                className="w-full text-xs bg-gray-50 border border-gray-300 rounded-md p-2 outline-none font-medium"
              >
                <option value="sm">Small (sm)</option>
                <option value="md">Medium (md)</option>
                <option value="lg">Large (lg)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Delay ({delay}ms)</label>
              <input
                type="range"
                min="0"
                max="600"
                step="50"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer mt-1"
              />
            </div>

            <div className="flex items-center gap-2 pt-4">
              <input
                id="arrow-toggle"
                type="checkbox"
                checked={arrow}
                onChange={(e) => setArrow(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              />
              <label htmlFor="arrow-toggle" className="text-xs font-medium text-gray-700 cursor-pointer">
                Show Arrow
              </label>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <input
                id="interactive-toggle"
                type="checkbox"
                checked={interactive}
                onChange={(e) => setInteractive(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              />
              <label htmlFor="interactive-toggle" className="text-xs font-medium text-gray-700 cursor-pointer">
                Interactive
              </label>
            </div>
          </div>

          <ComponentDemo code={playgroundCode}>
            <div className="py-8">
              <Tooltip
                content="Crafted with EaseUI ✨"
                position={pos}
                variant={variant}
                size={size}
                animation={anim}
                trigger={trigger}
                arrow={arrow}
                interactive={interactive}
                delay={delay}
              >
                <Button variant="primary" size="lg">
                  {trigger === "click" ? "Click Me" : trigger === "focus" ? "Tab / Focus Me" : "Hover Over Me"}
                </Button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </div>
      </section>

      {/* 1. Basic Usage */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Basic Usage</h2>
          <p className="text-gray-600 mt-1">
            Wrap any component with <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">&lt;Tooltip /&gt;</code> and specify <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">content</code>.
          </p>
        </div>
        <ComponentDemo code={basicCode}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Tooltip content="Primary quick action" position="top" variant="dark">
              <Button variant="primary" size="default">Quick Action</Button>
            </Tooltip>
            <Tooltip content="Read detailed documentation" position="top" variant="light">
              <Button variant="outline" size="default">Documentation</Button>
            </Tooltip>
            <Tooltip content="Delete current item permanently" position="top" variant="destructive">
              <Button variant="destructive" size="default">
                <Trash2 className="w-4 h-4 mr-2" />Delete
              </Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* 2. Trigger Modes */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trigger Modes</h2>
          <p className="text-gray-600 mt-1">
            Trigger on <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">hover</code>, <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">click</code> (with click-outside & Escape dismissal), or <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">focus</code> for full accessibility.
          </p>
        </div>
        <ComponentDemo code={triggersCode}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Tooltip content="Hover activated tooltip" trigger="hover" position="top">
              <Button variant="outline" size="default">
                <MousePointer className="w-4 h-4 mr-2 text-indigo-600" /> Hover Trigger
              </Button>
            </Tooltip>

            <Tooltip content="Click again or outside to dismiss" trigger="click" position="top" variant="primary">
              <Button variant="primary" size="default">
                <Hand className="w-4 h-4 mr-2" /> Click Trigger
              </Button>
            </Tooltip>

            <Tooltip content="Revealed upon keyboard focus" trigger="focus" position="top" variant="secondary">
              <Button variant="secondary" size="default">
                <Focus className="w-4 h-4 mr-2" /> Focus / Tab Trigger
              </Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* 3. Placements */}
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

      {/* 4. Style Variants */}
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
                  className={v === "gradient" ? "bg-gradient-to-r from-indigo-600 to-pink-600 border-none text-white shadow-md" : ""}
                >
                  {label}
                </Button>
              </Tooltip>
            ))}
          </div>
        </ComponentDemo>
      </section>

      {/* 5. Motion & GSAP Animations */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Motion & GSAP Animations</h2>
          <p className="text-gray-600 mt-1">Hardware-accelerated GSAP easing gives tooltips snappy, organic motion.</p>
        </div>
        <ComponentDemo code={`<Tooltip content="Scale In" animation="scaleIn"><Button>Scale In</Button></Tooltip>`}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {ANIMATIONS.map(({ animation: a, label, btn }) => (
              <Tooltip key={a} content={`${label} motion`} animation={a} position="top">
                <Button variant={btn} size="default">{label}</Button>
              </Tooltip>
            ))}
          </div>
        </ComponentDemo>
      </section>

      {/* 6. Rich & Interactive Content */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Rich & Interactive Content</h2>
          <p className="text-gray-600 mt-1">Embed custom JSX, shortcut badges, and clickable interactive elements with hover bridging.</p>
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
              <Button variant="dark" size="default">
                <Command className="w-4 h-4 mr-2" /> Quick Search
              </Button>
            </Tooltip>

            {/* Profile Tooltip with Author Profile */}
            <Tooltip
              interactive
              variant="light"
              size="lg"
              position="bottom"
              content={
                <div className="p-2 space-y-3 w-56 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      SP
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Soumen Pore</p>
                      <p className="text-xs text-gray-500">EaseUI Developer</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Modern UI components crafted for effortless React development.</p>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400">1.4k Stars</span>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      Follow <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              }
            >
              <Button variant="outline" size="default">Author Profile</Button>
            </Tooltip>

            {/* Icon Bar */}
            <div className="flex items-center gap-2 p-1.5 bg-white border border-gray-200 rounded-xl shadow-xs">
              {ACTION_ICONS.map(({ icon: Icon, label, hover, variant: v, badge }) => (
                <Tooltip key={label} content={label} position="top" variant={v}>
                  <button
                    type="button"
                    aria-label={label}
                    className={`p-2 text-gray-500 ${hover} hover:bg-gray-100 rounded-lg transition-colors relative cursor-pointer`}
                  >
                    <Icon className="w-4 h-4" />
                    {badge && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />}
                  </button>
                </Tooltip>
              ))}
            </div>
          </div>
        </ComponentDemo>
      </section>

      {/* 7. Controlled Mode */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Controlled State</h2>
          <p className="text-gray-600 mt-1">
            Control the tooltip programmatically with <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">open</code> and <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">onOpenChange</code>.
          </p>
        </div>
        <ComponentDemo code={controlledCode}>
          <div className="flex items-center gap-6 py-4">
            <Button
              variant="outline"
              size="default"
              onClick={() => setIsControlledOpen((prev) => !prev)}
            >
              <Sliders className="w-4 h-4 mr-2 text-indigo-600" />
              Toggle State ({isControlledOpen ? "Open" : "Closed"})
            </Button>

            <Tooltip
              open={isControlledOpen}
              onOpenChange={setIsControlledOpen}
              trigger="manual"
              position="right"
              variant="primary"
              content="Programmatically controlled tooltip ✨"
            >
              <span className="px-3.5 py-2 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg text-xs font-semibold">
                Controlled Target
              </span>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* 8. Compound API Pattern */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Compound Component Pattern</h2>
          <p className="text-gray-600 mt-1">
            Compose using <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">&lt;TooltipTrigger&gt;</code> and <code className="text-sm font-mono text-indigo-600 bg-gray-100 px-1 py-0.5 rounded">&lt;TooltipContent&gt;</code> for granular JSX control.
          </p>
        </div>
        <ComponentDemo code={compoundCode}>
          <div className="flex justify-center">
            <Tooltip position="top" variant="primary">
              <TooltipTrigger asChild>
                <Button variant="primary">Compound Trigger</Button>
              </TooltipTrigger>
              <TooltipContent>Compound Content with custom styling</TooltipContent>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* 9. API Reference */}
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
