// Procedural textures for the 3D scenes, painted on 2D canvases at runtime. Nothing is downloaded,
// so there are no third-party texture licences to track. A seeded random generator keeps every
// texture identical between visits and renders.
import {
  CanvasTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  NoColorSpace,
  RepeatWrapping,
  SRGBColorSpace,
  type Texture,
} from "three";

/** Small, fast, seedable PRNG (mulberry32). Returns numbers in [0, 1). */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Painter = (context: CanvasRenderingContext2D, size: { width: number; height: number }) => void;

type TextureOptions = {
  width: number;
  height?: number;
  /** Colour textures are sRGB; bump, roughness and alpha maps hold linear data. */
  color: boolean;
  repeat?: boolean;
};

function paintTexture(paint: Painter, { width, height = width, color, repeat = true }: TextureOptions): Texture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("2D canvas is not available for texture generation");
  }
  paint(context, { width, height });

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = color ? SRGBColorSpace : NoColorSpace;
  if (repeat) {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
  }
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

const gray = (value: number, alpha = 1) => {
  const v = Math.round(Math.min(Math.max(value, 0), 1) * 255);
  return `rgba(${v}, ${v}, ${v}, ${alpha})`;
};

/* -------------------------------------------------------------------------------------------- */

/** Real-world size covered by one repeat of each texture, in metres. Used to set UV scale. */
export const textureScale = {
  siding: 1.44, // 8 lap boards with a 180 mm exposure
  shingles: 1.12, // 8 courses with a 140 mm exposure
  osb: 1.2,
  underlayment: 1.5,
  wrap: 1.5,
  insulation: 1.4,
  brick: 0.9,
  louvers: 1.5,
} as const;

/** Lap siding: light boards with a shadow line under each one. Greyscale, tinted by the material. */
export function createSidingTexture(): { map: Texture; bump: Texture } {
  const boards = 8;
  const paint: Painter = (ctx, { width, height }) => {
    const random = createRandom(11);
    const board = height / boards;
    for (let i = 0; i < boards; i += 1) {
      const y = i * board;
      const gradient = ctx.createLinearGradient(0, y, 0, y + board);
      gradient.addColorStop(0, gray(0.86));
      gradient.addColorStop(0.82, gray(0.97));
      gradient.addColorStop(0.9, gray(0.62));
      gradient.addColorStop(1, gray(0.5));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, y, width, board);

      // faint embossed grain
      for (let s = 0; s < 26; s += 1) {
        ctx.fillStyle = gray(0.8 + random() * 0.15, 0.18);
        ctx.fillRect(random() * width, y + random() * board * 0.8, 20 + random() * 120, 1);
      }
    }
  };
  return {
    map: paintTexture(paint, { width: 512, color: true }),
    bump: paintTexture(paint, { width: 512, color: false }),
  };
}

/** Architectural shingles: staggered courses of tabs with varied widths and shades. */
export function createShingleTexture(): { map: Texture; bump: Texture } {
  const courses = 8;
  const paintCourses = (bumpOnly: boolean): Painter => (ctx, { width, height }) => {
    const random = createRandom(23);
    const course = height / courses;
    ctx.fillStyle = gray(bumpOnly ? 0.2 : 0.18);
    ctx.fillRect(0, 0, width, height);

    for (let row = 0; row < courses; row += 1) {
      const y = row * course;
      let x = -random() * 40;
      while (x < width) {
        const tab = 26 + random() * 46;
        const shade = bumpOnly ? 0.75 : 0.32 + random() * 0.32;
        ctx.fillStyle = gray(shade);
        ctx.fillRect(x + 1, y + 1, tab - 2, course - 3);

        // granule speckle
        if (!bumpOnly) {
          for (let g = 0; g < 18; g += 1) {
            ctx.fillStyle = gray(shade + (random() - 0.5) * 0.3, 0.6);
            ctx.fillRect(x + random() * tab, y + random() * course, 2, 2);
          }
        }

        // dark lower edge: the shadow line of the course above
        ctx.fillStyle = gray(bumpOnly ? 0.1 : 0.12, 0.85);
        ctx.fillRect(x, y + course - 4, tab, 4);
        x += tab;
      }
    }
  };
  return {
    map: paintTexture(paintCourses(false), { width: 512, color: true }),
    bump: paintTexture(paintCourses(true), { width: 512, color: false }),
  };
}

/** Oriented strand board for the roof deck and wall sheathing. Full colour. */
export function createOsbTexture(seed = 5): Texture {
  return paintTexture(
    (ctx, { width, height }) => {
      const random = createRandom(seed);
      ctx.fillStyle = "#c9a46c";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < 900; i += 1) {
        const tone = 0.55 + random() * 0.45;
        const r = Math.round(200 * tone);
        const g = Math.round(160 * tone);
        const b = Math.round(100 * tone);
        ctx.save();
        ctx.translate(random() * width, random() * height);
        ctx.rotate((random() - 0.5) * 0.9);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.7)`;
        ctx.fillRect(-14, -3, 18 + random() * 22, 3 + random() * 5);
        ctx.restore();
      }
      // panel joint
      ctx.fillStyle = "rgba(90, 64, 34, 0.55)";
      ctx.fillRect(0, height - 2, width, 2);
      ctx.fillRect(width - 2, 0, 2, height);
    },
    { width: 512, color: true },
  );
}

/** Synthetic underlayment: light grey sheet with printed overlap guide lines. Greyscale. */
export function createUnderlaymentTexture(): Texture {
  return paintTexture(
    (ctx, { width, height }) => {
      ctx.fillStyle = gray(0.92);
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = gray(0.62);
      for (let i = 1; i <= 4; i += 1) {
        const y = (i * height) / 4 - 6;
        for (let x = 0; x < width; x += 18) {
          ctx.fillRect(x, y, 10, 2);
        }
      }
      // lap seam shadow
      ctx.fillStyle = gray(0.7);
      ctx.fillRect(0, height - 3, width, 3);
    },
    { width: 256, color: true },
  );
}

/** House wrap: white sheet with faint horizontal bands. No logos. */
export function createWrapTexture(): Texture {
  return paintTexture(
    (ctx, { width, height }) => {
      ctx.fillStyle = gray(0.97);
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = gray(0.85);
      for (let i = 0; i < 3; i += 1) {
        ctx.fillRect(0, (i * height) / 3 + 20, width, 6);
      }
      ctx.fillStyle = gray(0.9);
      for (let x = 0; x < width; x += 32) {
        ctx.fillRect(x, 0, 1, height);
      }
    },
    { width: 256, color: true },
  );
}

/** Blown-in insulation: soft, lumpy, off-white. Returns a colour map and a matching bump map. */
export function createInsulationTexture(): { map: Texture; bump: Texture } {
  const paint = (bumpOnly: boolean): Painter => (ctx, { width, height }) => {
    const random = createRandom(41);
    ctx.fillStyle = bumpOnly ? gray(0.5) : "#e9dfc9";
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 700; i += 1) {
      const x = random() * width;
      const y = random() * height;
      const radius = 4 + random() * 14;
      const light = random();
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      if (bumpOnly) {
        gradient.addColorStop(0, gray(0.5 + light * 0.5, 0.8));
        gradient.addColorStop(1, gray(0.5, 0));
      } else {
        const tone = 0.86 + light * 0.14;
        gradient.addColorStop(0, `rgba(${Math.round(250 * tone)}, ${Math.round(240 * tone)}, ${Math.round(215 * tone)}, 0.8)`);
        gradient.addColorStop(1, "rgba(233, 223, 201, 0)");
      }
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  return {
    map: paintTexture(paint(false), { width: 256, color: true }),
    bump: paintTexture(paint(true), { width: 256, color: false }),
  };
}

/** Running-bond brick for the chimney. Full colour. */
export function createBrickTexture(): Texture {
  return paintTexture(
    (ctx, { width, height }) => {
      const random = createRandom(3);
      ctx.fillStyle = "#b8ada0";
      ctx.fillRect(0, 0, width, height);
      const rows = 12;
      const brickHeight = height / rows;
      const brickWidth = width / 4;
      for (let row = 0; row < rows; row += 1) {
        const offset = row % 2 === 0 ? 0 : brickWidth / 2;
        for (let col = -1; col < 5; col += 1) {
          const tone = 0.75 + random() * 0.25;
          ctx.fillStyle = `rgb(${Math.round(150 * tone)}, ${Math.round(82 * tone)}, ${Math.round(64 * tone)})`;
          ctx.fillRect(col * brickWidth + offset + 2, row * brickHeight + 2, brickWidth - 4, brickHeight - 4);
        }
      }
    },
    { width: 256, color: true },
  );
}

/** Horizontal louvers for shutters. Greyscale. */
export function createLouverTexture(): Texture {
  return paintTexture(
    (ctx, { width, height }) => {
      const slats = 24;
      const slat = height / slats;
      for (let i = 0; i < slats; i += 1) {
        const gradient = ctx.createLinearGradient(0, i * slat, 0, (i + 1) * slat);
        gradient.addColorStop(0, gray(1));
        gradient.addColorStop(0.75, gray(0.85));
        gradient.addColorStop(1, gray(0.45));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, i * slat, width, slat);
      }
    },
    { width: 64, height: 256, color: true },
  );
}

/** Radial fade used as the ground's alpha map, so the lawn melts into the page background. */
export function createRadialFadeTexture(): Texture {
  return paintTexture(
    (ctx, { width, height }) => {
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
      gradient.addColorStop(0, gray(1));
      gradient.addColorStop(0.45, gray(1));
      gradient.addColorStop(1, gray(0));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    },
    { width: 256, color: false, repeat: false },
  );
}

/** Mottled lawn colour so the ground isn't a flat sheet. Full colour. */
export function createLawnTexture(): Texture {
  return paintTexture(
    (ctx, { width, height }) => {
      const random = createRandom(17);
      ctx.fillStyle = "#7f8b6c";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < 1400; i += 1) {
        const tone = 0.85 + random() * 0.3;
        ctx.fillStyle = `rgba(${Math.round(120 * tone)}, ${Math.round(136 * tone)}, ${Math.round(100 * tone)}, 0.35)`;
        ctx.fillRect(random() * width, random() * height, 2 + random() * 6, 2 + random() * 6);
      }
    },
    { width: 256, color: true },
  );
}
