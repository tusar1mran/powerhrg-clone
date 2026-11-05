import {
  BadgeCheck,
  BrushCleaning,
  CloudRain,
  Droplets,
  Fan,
  HardHat,
  House,
  Layers,
  Leaf,
  LockKeyhole,
  Palette,
  Ruler,
  ShieldCheck,
  Sparkles,
  Sun,
  Thermometer,
  VolumeX,
  Wind,
  type LucideIcon,
} from "lucide-react";

// Feature icons for the service pages, drawn with lucide-react (ISC licence).
export type FeatureIcon =
  | "energy"
  | "security"
  | "lock"
  | "curb"
  | "style"
  | "warranty"
  | "noise"
  | "installers"
  | "weather"
  | "wind"
  | "water"
  | "sun"
  | "lowMaintenance"
  | "comfort"
  | "ventilation"
  | "insulation"
  | "measure"
  | "cleanup";

const icons: Record<FeatureIcon, LucideIcon> = {
  energy: Leaf,
  security: ShieldCheck,
  lock: LockKeyhole,
  curb: House,
  style: Palette,
  warranty: BadgeCheck,
  noise: VolumeX,
  installers: HardHat,
  weather: CloudRain,
  wind: Wind,
  water: Droplets,
  sun: Sun,
  lowMaintenance: Sparkles,
  comfort: Thermometer,
  ventilation: Fan,
  insulation: Layers,
  measure: Ruler,
  cleanup: BrushCleaning,
};

export type Feature = { icon: FeatureIcon; title: string; text: string };

export default function FeatureIconSvg({ name, className = "" }: { name: FeatureIcon; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden strokeWidth={1.5} className={`text-charcoal ${className}`} />;
}
