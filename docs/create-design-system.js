const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle, 
        WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

// Colors
const ORANGE = "F97316";
const ORANGE_DARK = "EA580C";
const ORANGE_SOFT = "FFF7ED";
const BLACK = "0A0A0A";
const GRAY_900 = "171717";
const GRAY_700 = "404040";
const GRAY_500 = "737373";
const GRAY_300 = "D4D4D4";
const GRAY_100 = "F5F5F5";
const GRAY_50 = "FAFAFA";
const WHITE = "FFFFFF";
const GREEN = "16A34A";
const RED = "DC2626";
const BLUE = "2563EB";

const thinBorder = { style: BorderStyle.SINGLE, size: 4, color: GRAY_300 };
const borders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const accentBorder = { style: BorderStyle.SINGLE, size: 8, color: ORANGE };
const orangeBorders = { top: accentBorder, bottom: accentBorder, left: accentBorder, right: accentBorder };

function cell(text, opts = {}) {
  const { bold = false, fill = WHITE, width = 2340, color = BLACK, align = AlignmentType.LEFT, fontSize = 18 } = opts;
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill, type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, bold, size: fontSize, font: "Arial", color })]
    })]
  });
}

function headerCell(text, width = 2340) {
  return cell(text, { bold: true, fill: GRAY_100, width, color: GRAY_900, fontSize: 17 });
}

function sectionTitle(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text, bold: true, size: 32, font: "Arial", color: BLACK })]
  });
}

function subTitle(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text, bold: true, size: 26, font: "Arial", color: GRAY_900 })]
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, bold: true, size: 22, font: "Arial", color: GRAY_700 })]
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, size: 20, font: "Arial", color: opts.color || GRAY_700, bold: opts.bold || false })]
  });
}

function bodyBold(label, text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({ text: label, size: 20, font: "Arial", color: BLACK, bold: true }),
      new TextRun({ text: text, size: 20, font: "Arial", color: GRAY_700 })
    ]
  });
}

function bullet(text, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 20, font: "Arial", color: GRAY_700 })]
  });
}

function codeLine(text) {
  return new Paragraph({
    spacing: { after: 40 },
    shading: { fill: GRAY_100, type: ShadingType.CLEAR },
    children: [new TextRun({ text, size: 17, font: "Courier New", color: GRAY_900 })]
  });
}

function spacer(after = 120) {
  return new Paragraph({ spacing: { after }, children: [] });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: BLACK },
        paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: GRAY_900 },
        paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: GRAY_700 },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets2", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets3", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets4", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets5", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets6", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers2", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers3", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers4", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers5", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1008, right: 1008, bottom: 1008, left: 1008 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ORANGE, space: 8 } },
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "NBA HUB  ·  Design System", bold: true, size: 18, font: "Arial", color: ORANGE }),
            new TextRun({ text: "  ·  Drafteados / Los Buques", size: 18, font: "Arial", color: GRAY_500 })
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: GRAY_300, space: 8 } },
          spacing: { before: 80 },
          children: [
            new TextRun({ text: "Confidencial  ·  Uso interno  ·  Página ", size: 16, font: "Arial", color: GRAY_500 }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Arial", color: GRAY_500 }),
            new TextRun({ text: " / ", size: 16, font: "Arial", color: GRAY_500 }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, font: "Arial", color: GRAY_500 })
          ]
        })]
      })
    },
    children: [
      // ========== PORTADA ==========
      new Paragraph({ spacing: { before: 1200 }, children: [] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "NBA HUB", bold: true, size: 56, font: "Arial", color: ORANGE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({ text: "LOS BUQUES  ·  DRAFTEADOS", size: 22, font: "Arial", color: GRAY_500 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 80 },
        children: [new TextRun({ text: "Design System", bold: true, size: 40, font: "Arial", color: BLACK })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [new TextRun({ text: "Guía completa de tipografía, color, spacing, componentes y voice", size: 20, font: "Arial", color: GRAY_700 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 },
        children: [new TextRun({ text: "Versión 1.0  ·  Septiembre 2026", size: 18, font: "Arial", color: GRAY_500 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Documento de referencia para rediseño del hub", size: 18, font: "Arial", color: GRAY_500 })]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 1. PRINCIPIOS ==========
      sectionTitle("1. Principios de diseño"),
      body("Este design system define la identidad visual y de contenido del NBA Hub de Drafteados / Los Buques. El objetivo es eliminar el aspecto genérico de IA, ganar personalidad propia y elevar la calidad percibida a nivel de producto profesional."),
      
      subTitle("1.1 Principios rectores"),
      bodyBold("Claridad > Ornamento. ", "Cada elemento debe justificar su existencia. Si no aporta información o jerarquía, se elimina."),
      bodyBold("Datos primero. ", "El hub es una herramienta de seguimiento. Los números, horarios y tablas son el contenido principal; el copy es soporte."),
      bodyBold("Personalidad sin postureo. ", "Tono directo, argentino/español natural, sin frases vacías tipo “pulso de la liga” o “mirada de los Buques”."),
      bodyBold("Consistencia estricta. ", "Mismos componentes, mismos tokens, misma lógica en las 5 pestañas. Cero excepciones por “se veía bien en esta página”."),
      bodyBold("Respeto por el contexto. ", "Es pretemporada / temporada 2026-27. Los datos deben etiquetarse claramente (referencia, oficial, estimado)."),

      subTitle("1.2 Anti-patrones a eliminar"),
      bullet("Frases genéricas: “con la mirada de…”, “el pulso diario”, “así está la tabla”", "bullets"),
      bullet("Uso excesivo de font mono en títulos y UI", "bullets"),
      bullet("Cards con bordes grises débiles y sin jerarquía", "bullets"),
      bullet("Duplicación de equipos y logos rotos", "bullets"),
      bullet("Countdown repetido en múltiples pestañas", "bullets"),
      bullet("Contenido ficticio presentado como real sin disclaimer", "bullets"),
      bullet("Doble navegación (nav superior + fila de chips debajo del título)", "bullets"),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 2. TIPOGRAFÍA ==========
      sectionTitle("2. Tipografía"),
      body("La tipografía actual (casi todo en mono) genera sensación de dashboard técnico, no de producto deportivo. Se propone un sistema de dos familias + uso controlado de mono solo para datos."),

      subTitle("2.1 Familias tipográficas"),
      
      h3("Primaria — Inter (o Geist Sans)"),
      body("Uso: títulos, subtítulos, body, labels de UI, botones, navegación."),
      body("Por qué: excelente legibilidad en pantalla, buen rango de pesos (400–800), tracking limpio, soporte tabular-nums."),
      body("Alternativas válidas: Geist Sans, Satoshi, Plus Jakarta Sans."),
      
      h3("Secundaria (números) — Inter tabular / JetBrains Mono"),
      body("Uso exclusivo: stats, countdowns, tablas de clasificación, horarios."),
      body("Regla: font-variant-numeric: tabular-nums; en Inter. Si se necesita mono real, JetBrains Mono o IBM Plex Mono solo en celdas de tabla o códigos."),
      
      h3("Prohibido"),
      bullet("Font mono en títulos de página (HOY, CALENDARIO, etc.)", "bullets2"),
      bullet("Font mono en navegación principal", "bullets2"),
      bullet("Más de dos familias tipográficas en el producto", "bullets2"),

      subTitle("2.2 Escala tipográfica"),
      body("Escala basada en 1.25 (Major Third) a partir de 16px base."),
      
      new Table({
        width: { size: 10224, type: WidthType.DXA },
        columnWidths: [2200, 1600, 1600, 2400, 2424],
        rows: [
          new TableRow({ children: [
            headerCell("Token", 2200),
            headerCell("Size", 1600),
            headerCell("Weight", 1600),
            headerCell("Line-height", 2400),
            headerCell("Uso", 2424)
          ]}),
          new TableRow({ children: [
            cell("display", { width: 2200, bold: true }),
            cell("40–48px", { width: 1600 }),
            cell("800", { width: 1600 }),
            cell("1.1", { width: 2400 }),
            cell("Título de página (Hoy, Calendario…)", { width: 2424 })
          ]}),
          new TableRow({ children: [
            cell("h1", { width: 2200, bold: true }),
            cell("28–32px", { width: 1600 }),
            cell("700", { width: 1600 }),
            cell("1.2", { width: 2400 }),
            cell("Secciones principales", { width: 2424 })
          ]}),
          new TableRow({ children: [
            cell("h2", { width: 2200, bold: true }),
            cell("22–24px", { width: 1600 }),
            cell("600–700", { width: 1600 }),
            cell("1.25", { width: 2400 }),
            cell("Subsecciones / cards título", { width: 2424 })
          ]}),
          new TableRow({ children: [
            cell("h3", { width: 2200, bold: true }),
            cell("18px", { width: 1600 }),
            cell("600", { width: 1600 }),
            cell("1.3", { width: 2400 }),
            cell("Labels de grupo", { width: 2424 })
          ]}),
          new TableRow({ children: [
            cell("body", { width: 2200, bold: true }),
            cell("15–16px", { width: 1600 }),
            cell("400", { width: 1600 }),
            cell("1.5", { width: 2400 }),
            cell("Párrafos, descripciones", { width: 2424 })
          ]}),
          new TableRow({ children: [
            cell("body-sm", { width: 2200, bold: true }),
            cell("13–14px", { width: 1600 }),
            cell("400–500", { width: 1600 }),
            cell("1.45", { width: 2400 }),
            cell("Meta, horarios, helpers", { width: 2424 })
          ]}),
          new TableRow({ children: [
            cell("label", { width: 2200, bold: true }),
            cell("11–12px", { width: 1600 }),
            cell("600", { width: 1600 }),
            cell("1.3", { width: 2400 }),
            cell("Chips, badges, nav items", { width: 2424 })
          ]}),
          new TableRow({ children: [
            cell("stat", { width: 2200, bold: true }),
            cell("24–36px", { width: 1600 }),
            cell("700", { width: 1600 }),
            cell("1.0", { width: 2400 }),
            cell("PPG, W-L, countdown numbers", { width: 2424 })
          ]}),
          new TableRow({ children: [
            cell("stat-label", { width: 2200, bold: true }),
            cell("10–11px", { width: 1600 }),
            cell("600", { width: 1600 }),
            cell("1.2", { width: 2400 }),
            cell("DÍAS, HORAS, PPG, etc.", { width: 2424 })
          ]}),
        ]
      }),

      spacer(200),
      subTitle("2.3 Tracking y mayúsculas"),
      bodyBold("Nav y chips: ", "uppercase + tracking 0.04–0.06em + weight 600–700. No mono."),
      bodyBold("Títulos de página: ", "sentence case o title case. Evitar ALL CAPS en display (excepto marca)."),
      bodyBold("Labels de stats: ", "uppercase + tracking amplio + peso 600."),
      bodyBold("Body: ", "nunca uppercase."),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 3. COLOR ==========
      sectionTitle("3. Color"),
      body("El naranja actual funciona bien como acento de marca. Se mantiene y se sistematiza. El resto del sistema se vuelve más neutro y de alto contraste para que los datos respiren."),

      subTitle("3.1 Tokens de color"),
      
      new Table({
        width: { size: 10224, type: WidthType.DXA },
        columnWidths: [2400, 1600, 2400, 3824],
        rows: [
          new TableRow({ children: [
            headerCell("Token", 2400),
            headerCell("Hex", 1600),
            headerCell("Nombre", 2400),
            headerCell("Uso", 3824)
          ]}),
          new TableRow({ children: [
            cell("accent", { width: 2400, bold: true, color: ORANGE }),
            cell("#F97316", { width: 1600 }),
            cell("Orange 500", { width: 2400 }),
            cell("CTA primario, nav activo, links, highlights", { width: 3824 })
          ]}),
          new TableRow({ children: [
            cell("accent-hover", { width: 2400, bold: true, color: ORANGE_DARK }),
            cell("#EA580C", { width: 1600 }),
            cell("Orange 600", { width: 2400 }),
            cell("Hover de botones y links", { width: 3824 })
          ]}),
          new TableRow({ children: [
            cell("accent-soft", { width: 2400, bold: true }),
            cell("#FFF7ED", { width: 1600 }),
            cell("Orange 50", { width: 2400 }),
            cell("Fondos suaves de badges y cards destacadas", { width: 3824 })
          ]}),
          new TableRow({ children: [
            cell("text", { width: 2400, bold: true }),
            cell("#0A0A0A", { width: 1600 }),
            cell("Near black", { width: 2400 }),
            cell("Títulos y texto principal", { width: 3824 })
          ]}),
          new TableRow({ children: [
            cell("text-secondary", { width: 2400, bold: true }),
            cell("#404040", { width: 1600 }),
            cell("Gray 700", { width: 2400 }),
            cell("Body, descripciones", { width: 3824 })
          ]}),
          new TableRow({ children: [
            cell("text-muted", { width: 2400, bold: true }),
            cell("#737373", { width: 1600 }),
            cell("Gray 500", { width: 2400 }),
            cell("Meta, placeholders, timestamps", { width: 3824 })
          ]}),
          new TableRow({ children: [
            cell("border", { width: 2400, bold: true }),
            cell("#E5E5E5", { width: 1600 }),
            cell("Gray 200", { width: 2400 }),
            cell("Bordes de cards y divisores", { width: 3824 })
          ]}),
          new TableRow({ children: [
            cell("surface", { width: 2400, bold: true }),
            cell("#FFFFFF", { width: 1600 }),
            cell("White", { width: 2400 }),
            cell("Cards, paneles", { width: 3824 })
          ]}),
          new TableRow({ children: [
            cell("bg", { width: 2400, bold: true }),
            cell("#FAFAFA", { width: 1600 }),
            cell("Gray 50", { width: 2400 }),
            cell("Fondo de página", { width: 3824 })
          ]}),
          new TableRow({ children: [
            cell("success", { width: 2400, bold: true, color: GREEN }),
            cell("#16A34A", { width: 1600 }),
            cell("Green 600", { width: 2400 }),
            cell("Victorias, positivo", { width: 3824 })
          ]}),
          new TableRow({ children: [
            cell("danger", { width: 2400, bold: true, color: RED }),
            cell("#DC2626", { width: 1600 }),
            cell("Red 600", { width: 2400 }),
            cell("Derrotas, errores, live", { width: 3824 })
          ]}),
        ]
      }),

      spacer(200),
      subTitle("3.2 Reglas de uso del naranja"),
      bullet("Máximo 1 elemento primario naranja por viewport (nav activo o CTA principal).", "bullets3"),
      bullet("No usar naranja en texto body ni en títulos largos.", "bullets3"),
      bullet("Badges y chips secundarios: outline o soft, no fill sólido.", "bullets3"),
      bullet("El naranja nunca compite con un score o un número de stats.", "bullets3"),

      subTitle("3.3 Modo oscuro (futuro)"),
      body("No prioritario ahora. Si se implementa: fondo #0A0A0A, surfaces #171717, texto #FAFAFA, acento se mantiene #F97316. Bordes #262626."),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 4. SPACING ==========
      sectionTitle("4. Spacing y layout"),
      body("Sistema de spacing basado en múltiplos de 4px. Consistencia > creatividad en márgenes."),

      subTitle("4.1 Escala de spacing"),
      new Table({
        width: { size: 10224, type: WidthType.DXA },
        columnWidths: [1800, 1600, 6824],
        rows: [
          new TableRow({ children: [
            headerCell("Token", 1800),
            headerCell("Valor", 1600),
            headerCell("Uso típico", 6824)
          ]}),
          new TableRow({ children: [
            cell("space-1", { width: 1800, bold: true }),
            cell("4px", { width: 1600 }),
            cell("Gaps mínimos entre icono y texto", { width: 6824 })
          ]}),
          new TableRow({ children: [
            cell("space-2", { width: 1800, bold: true }),
            cell("8px", { width: 1600 }),
            cell("Padding interno de chips, gap entre elementos relacionados", { width: 6824 })
          ]}),
          new TableRow({ children: [
            cell("space-3", { width: 1800, bold: true }),
            cell("12px", { width: 1600 }),
            cell("Padding de botones pequeños, gap de nav items", { width: 6824 })
          ]}),
          new TableRow({ children: [
            cell("space-4", { width: 1800, bold: true }),
            cell("16px", { width: 1600 }),
            cell("Padding de cards, gap estándar entre elementos", { width: 6824 })
          ]}),
          new TableRow({ children: [
            cell("space-5", { width: 1800, bold: true }),
            cell("20–24px", { width: 1600 }),
            cell("Padding de secciones internas", { width: 6824 })
          ]}),
          new TableRow({ children: [
            cell("space-6", { width: 1800, bold: true }),
            cell("32px", { width: 1600 }),
            cell("Separación entre bloques de contenido", { width: 6824 })
          ]}),
          new TableRow({ children: [
            cell("space-8", { width: 1800, bold: true }),
            cell("48px", { width: 1600 }),
            cell("Separación entre secciones mayores", { width: 6824 })
          ]}),
          new TableRow({ children: [
            cell("space-10", { width: 1800, bold: true }),
            cell("64px", { width: 1600 }),
            cell("Margen superior de página / hero", { width: 6824 })
          ]}),
        ]
      }),

      spacer(200),
      subTitle("4.2 Layout general"),
      bodyBold("Ancho máximo de contenido: ", "1120–1200px (centrado)."),
      bodyBold("Padding lateral (móvil): ", "16px."),
      bodyBold("Padding lateral (desktop): ", "24–32px."),
      bodyBold("Header sticky: ", "altura 56–64px."),
      bodyBold("Grid de equipos: ", "3 columnas en desktop, 2 en tablet, 1 en móvil."),
      bodyBold("Grid de líderes top-3: ", "3 columnas iguales."),

      subTitle("4.3 Border radius"),
      bullet("Chips / badges: 8px (rounded-lg)", "bullets4"),
      bullet("Botones: 10–12px", "bullets4"),
      bullet("Cards: 12–16px", "bullets4"),
      bullet("Inputs: 10px", "bullets4"),
      bullet("Avatares / logos pequeños: 8px o full circle según contexto", "bullets4"),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 5. COMPONENTES ==========
      sectionTitle("5. Componentes"),
      body("Cada componente tiene un solo estilo canónico. No se inventan variantes ad-hoc por página."),

      subTitle("5.1 Navegación principal (Header)"),
      body("Una sola fila. Logo izquierda · Nav central · Acciones derecha (refresh + Pick’em)."),
      bodyBold("Estado activo: ", "fondo accent, texto blanco, sombra sutil. Sin iconos decorativos innecesarios si el texto es claro."),
      bodyBold("Estado inactivo: ", "texto muted, hover texto principal + fondo surface-2."),
      bodyBold("Eliminar: ", "la segunda fila de chips que aparece debajo del título en “Hoy”. Es redundante."),

      subTitle("5.2 Page header (título de pestaña)"),
      body("Estructura fija:"),
      bullet("Breadcrumb / contexto (NBA HUB · LOS BUQUES · fecha o temporada) — 12px, accent o muted", "bullets5"),
      bullet("Título display (Hoy en la NBA / Calendario / etc.) — 40–48px, weight 800, color text", "bullets5"),
      bullet("Subtítulo de una línea — 15–16px, text-secondary. Sin frases vacías.", "bullets5"),
      body("No más de 2 líneas de subtítulo. Si hace falta más contexto, va en un callout o en el contenido."),

      subTitle("5.3 Botones"),
      h3("Primary"),
      body("Fondo accent, texto blanco, weight 600, padding 10px 16px, radius 10px. Hover: accent-hover."),
      h3("Secondary / Outline"),
      body("Borde border, fondo surface, texto text. Hover: borde accent + texto accent."),
      h3("Ghost / Soft"),
      body("Fondo accent-soft, texto accent. Para Pick’em y acciones secundarias de marca."),
      h3("Tamaños"),
      body("sm: 11–12px texto, py-1.5 px-3 · md: 13px, py-2 px-4 · lg: 14–15px, py-2.5 px-5"),

      subTitle("5.4 Cards"),
      bodyBold("Card base: ", "fondo surface, borde 1px border, radius 12–16px, padding 16–20px. Sombra opcional muy suave (0 1px 3px rgb(0 0 0 / 0.04))."),
      bodyBold("Card hover: ", "borde accent o elevación ligera. Cursor pointer si es clickeable."),
      bodyBold("Card destacada (campeón, opening night): ", "borde accent o fondo accent-soft. Usar con moderación (máx. 1–2 por vista)."),
      body("Evitar cards dentro de cards. Preferir secciones planas + divisores."),

      subTitle("5.5 Chips / Filters"),
      body("Usados en Calendario (filtros de conferencia, pretemporada, etc.) y en Líderes (Puntos, Asistencias…)."),
      bodyBold("Activo: ", "fondo accent, texto blanco."),
      bodyBold("Inactivo: ", "fondo surface o gray-100, texto secondary, borde sutil."),
      body("Una sola fila de filtros. Si no caben, scroll horizontal con fade, no wrap desordenado."),

      subTitle("5.6 Countdown"),
      body("Componente único. Solo aparece en Hoy (y opcionalmente en Calendario si se considera necesario, no en ambas al mismo tiempo de forma redundante)."),
      body("Estructura: label superior (Opening Night · fecha) · título · descripción corta · 4 bloques numéricos (días / horas / min / seg)."),
      body("Números grandes (stat), labels pequeños uppercase. Fondo surface o soft, no competir con el resto de la página."),

      subTitle("5.7 Tabla de clasificación / líderes"),
      body("Filas limpias, zebra opcional muy sutil. Logo + nombre + equipo en la primera columna. Stats alineadas a la derecha con tabular-nums."),
      body("Header sticky en tablas largas. Mínimo 44px de altura de fila para touch."),

      subTitle("5.8 Team card (Equipos)"),
      body("Logo real (no placeholder de archivo) + nombre del equipo + conferencia/división en muted. Flecha o chevron discreto."),
      body("Grid uniforme. Sin duplicados. Al hover: borde accent o ligera elevación."),

      subTitle("5.9 Game card (partidos)"),
      body("Estado (Programado / Live / Final) · hora · logos + nombres · score si aplica."),
      body("Jerarquía clara: si está live, badge rojo; si es final, scores en peso 700."),

      subTitle("5.10 Callouts / avisos"),
      body("Para pretemporada, datos de referencia, disclaimers. Fondo soft (amarillo muy suave o accent-soft), borde izquierdo de 3–4px en color de status, texto body-sm."),
      body("Ejemplo: “Datos de la temporada 2025/26. Se actualizarán automáticamente al inicio de la temporada regular.”"),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 6. VOICE & COPY ==========
      sectionTitle("6. Voice & Copy"),
      body("El mayor problema actual no es solo visual: es el lenguaje. Suena a plantilla generada. La nueva voz es directa, precisa y sin relleno."),

      subTitle("6.1 Principios de voz"),
      bodyBold("Directo. ", "Decí lo que hay. “Marcadores y clasificación de hoy.” en lugar de “el pulso diario de la liga con la mirada de…”."),
      bodyBold("Específico. ", "Preferí datos y hechos a adjetivos. “82 partidos + playoffs” es mejor que “cobertura total de la temporada”."),
      bodyBold("Humano. ", "Español natural (rioplatense o neutro, según audiencia). Evitar traducciones literales del inglés de IA."),
      bodyBold("Honesto. ", "Si los datos son de pretemporada o de la temporada anterior, se dice. No se vende ficción como realidad."),

      subTitle("6.2 Frases a eliminar (AI slop)"),
      bullet("“con la mirada de Drafteados / de los Buques”", "bullets6"),
      bullet("“el pulso diario de la liga”", "bullets6"),
      bullet("“Así está la tabla. Sin filtros de la NBA…”", "bullets6"),
      bullet("“Programación oficial de la temporada con fechas exactas…” (demasiado largo y obvio)", "bullets6"),
      bullet("Cualquier frase que termine en “de la nueva campaña” o similar", "bullets6"),

      subTitle("6.3 Reescritura de subtítulos por pestaña"),
      
      h3("Hoy"),
      bodyBold("Antes: ", "“Marcadores oficiales, clasificaciones y el pulso diario de la liga con la mirada de Drafteados.”"),
      bodyBold("Después: ", "“Marcadores, clasificación y lo que importa hoy.”"),
      
      h3("Calendario"),
      bodyBold("Antes: ", "“Programación oficial de la temporada con fechas exactas, pabellones y horarios para España (peninsular) y EE.UU.”"),
      bodyBold("Después: ", "“Todos los partidos · Horarios España y EE.UU.”"),
      
      h3("Clasificación"),
      bodyBold("Antes: ", "“Así está la tabla. Sin filtros de la NBA, con la mirada de los Buques.”"),
      bodyBold("Después: ", "“Tabla actual · Este y Oeste.”"),
      
      h3("Líderes"),
      bodyBold("Antes: ", "“Estadísticas individuales de referencia histórica (2025/26) previas al salto inicial de la nueva temporada 2026/27.”"),
      bodyBold("Después: ", "“Líderes de la última temporada regular (2025/26).” + callout de actualización."),
      
      h3("Equipos"),
      bodyBold("Antes: ", "“Los 30. Tocá uno y entrá a ver sus estadísticas, roster y calendario.”"),
      bodyBold("Después: ", "“Las 30 franquicias · Roster, stats y calendario.”"),

      subTitle("6.4 Microcopy de UI"),
      bodyBold("Botones: ", "Ver calendario completo · Ver plantilla · Pick’em · Filtrar"),
      bodyBold("Estados vacíos: ", "“No hay partidos programados para esta fecha.” (no “¡Ups! Parece que…”)."),
      bodyBold("Loading: ", "“Cargando…” o skeleton. Nunca “Estamos preparando la magia”."),
      bodyBold("Errores: ", "“No se pudieron cargar los datos. Reintentar.”"),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 7. PÁGINAS ==========
      sectionTitle("7. Especificación por pestaña"),

      subTitle("7.1 Hoy"),
      body("Objetivo: respuesta rápida a “¿qué hay hoy / qué se viene?”."),
      body("Contenido prioritario:"),
      bullet("Page header limpio", "numbers"),
      bullet("Countdown (solo aquí, o con lógica de “si faltan >7 días, mostrar; si no, ocultar”)", "numbers"),
      bullet("Bloques de contexto (Opening Night, Campeón vigente, etc.) — máximo 4, en fila", "numbers"),
      bullet("Partidos de la jornada / próximos (lista o cards)", "numbers"),
      bullet("Accesos rápidos a Clasificación y Líderes (opcionales, sin duplicar nav)", "numbers"),
      body("Eliminar la fila de chips de navegación secundaria debajo del título."),

      subTitle("7.2 Calendario"),
      body("Objetivo: encontrar cualquier partido por fecha, equipo o conferencia."),
      body("Contenido prioritario:"),
      bullet("Page header", "numbers2"),
      bullet("Barra de búsqueda + filtro de franquicia", "numbers2"),
      bullet("Chips de filtro (Todos / Semana inaugural / Pretemporada / Este / Oeste)", "numbers2"),
      bullet("Lista agrupada por día con game cards", "numbers2"),
      body("El countdown puede vivir solo en Hoy. Aquí priorizar utilidad de búsqueda y filtros."),

      subTitle("7.3 Clasificación"),
      body("Objetivo: ver la tabla real (o de pretemporada claramente etiquetada) y el contexto del campeón vigente si aplica."),
      body("Contenido prioritario:"),
      bullet("Page header + indicador de temporada/pretemporada", "numbers3"),
      bullet("Cards de campeón / subcampeón (compactas, no novelas)", "numbers3"),
      bullet("Tablas Este / Oeste con W-L, GB, streak, etc.", "numbers3"),
      body("La crónica larga del anillo puede vivir en una página de equipo o en un artículo, no ocupar media pantalla de la clasificación."),

      subTitle("7.4 Líderes"),
      body("Objetivo: top scorers y líderes por categoría de forma escaneable."),
      body("Contenido prioritario:"),
      bullet("Page header + callout de “datos de referencia 2025/26”", "numbers4"),
      bullet("Tabs/chips de categoría (Puntos, Asistencias, Rebotes…)", "numbers4"),
      bullet("Top 3 en cards destacadas", "numbers4"),
      bullet("Tabla completa debajo", "numbers4"),
      body("Fotos de jugadores cuando existan; si no, iniciales o logo de equipo. Nunca icono de archivo roto."),

      subTitle("7.5 Equipos"),
      body("Objetivo: acceso rápido a cualquiera de las 30 franquicias."),
      body("Contenido prioritario:"),
      bullet("Page header", "numbers5"),
      bullet("Secciones Este / Oeste (o grid único con filtro)", "numbers5"),
      bullet("Team cards con logo real, nombre, división", "numbers5"),
      body("Arreglar duplicados. Verificar que cada equipo aparece una sola vez. Logos oficiales o CDN confiable."),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 8. ICONOGRAFÍA Y MEDIA ==========
      sectionTitle("8. Iconografía y media"),

      subTitle("8.1 Iconos"),
      body("Usar un set único y consistente (Lucide, Heroicons o Phosphor). Tamaño estándar 16/20px en UI."),
      body("No mezclar estilos de iconos. Preferir outline en nav y UI general; filled solo para estados activos o énfasis."),
      body("Iconos decorativos mínimos. El texto debe bastar en la mayoría de los casos."),

      subTitle("8.2 Logos de equipos"),
      body("Fuente única y confiable (API oficial, CDN de NBA, o pack propio versionado)."),
      body("Tamaños: 24px (tablas), 32–40px (cards), 64px+ (página de equipo)."),
      body("Fondo neutro o transparente. Nunca mostrar el icono genérico de “archivo de imagen”."),

      subTitle("8.3 Fotos de jugadores"),
      body("Cuando no haya foto: avatar con iniciales + color de equipo, o logo del equipo. Nunca imagen rota."),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 9. MOTION ==========
      sectionTitle("9. Motion y feedback"),
      body("Transiciones cortas y funcionales. Nada de animaciones gratuitas."),
      bodyBold("Hover: ", "150–200ms ease."),
      bodyBold("Tabs / chips: ", "cambio de estado inmediato o 100ms."),
      bodyBold("Countdown: ", "update cada segundo sin animación de flip innecesaria (salvo que se diseñe bien)."),
      bodyBold("Loading: ", "skeletons de las cards/tablas, no spinners genéricos en el centro de la página."),
      bodyBold("Preferencia de usuario: ", "respetar prefers-reduced-motion."),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 10. ACCESIBILIDAD ==========
      sectionTitle("10. Accesibilidad y calidad"),
      bullet("Contraste mínimo AA en texto (text sobre bg, text-secondary sobre surface).", "bullets"),
      bullet("Focus visible en todos los interactivos (outline accent o ring).", "bullets"),
      bullet("Targets táctiles ≥ 44px en móvil.", "bullets"),
      bullet("Alt text en logos y fotos relevantes.", "bullets"),
      bullet("Tablas con thead y scope correctos.", "bullets"),
      bullet("No depender solo del color para estados (Live, Final, etc.): usar texto + color).", "bullets"),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 11. CHECKLIST ==========
      sectionTitle("11. Checklist de implementación"),
      body("Usar esta lista al rediseñar cada pestaña:"),
      
      h3("Contenido"),
      bullet("¿El subtítulo aporta información real o es relleno?", "bullets2"),
      bullet("¿Los datos de pretemporada / temporada anterior están claramente etiquetados?", "bullets2"),
      bullet("¿Hay frases de la lista de AI slop?", "bullets2"),
      bullet("¿Existen duplicados de equipos o datos?", "bullets2"),

      h3("Visual"),
      bullet("¿Se usa Inter (o la primaria) en títulos y UI, no mono?", "bullets3"),
      bullet("¿El naranja aparece solo donde debe (activo + CTA)?", "bullets3"),
      bullet("¿Las cards tienen el mismo radius, borde y padding?", "bullets3"),
      bullet("¿Los logos cargan correctamente?", "bullets3"),
      bullet("¿Hay una sola navegación principal (sin fila duplicada)?", "bullets3"),

      h3("Estructura"),
      bullet("¿El page header sigue el patrón breadcrumb → título → subtítulo?", "bullets4"),
      bullet("¿El countdown está solo donde corresponde?", "bullets4"),
      bullet("¿Los filtros son una sola fila clara?", "bullets4"),
      bullet("¿Mobile: todo legible y tappable sin zoom?", "bullets4"),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== 12. TOKENS CSS ==========
      sectionTitle("12. Tokens CSS de referencia"),
      body("Propuesta de variables para implementar en el proyecto:"),
      spacer(80),
      codeLine(":root {"),
      codeLine("  /* Brand */"),
      codeLine("  --hub-accent: #F97316;"),
      codeLine("  --hub-accent-hover: #EA580C;"),
      codeLine("  --hub-accent-soft: #FFF7ED;"),
      codeLine(""),
      codeLine("  /* Text */"),
      codeLine("  --hub-text: #0A0A0A;"),
      codeLine("  --hub-text-secondary: #404040;"),
      codeLine("  --hub-text-muted: #737373;"),
      codeLine(""),
      codeLine("  /* Surfaces */"),
      codeLine("  --hub-bg: #FAFAFA;"),
      codeLine("  --hub-surface: #FFFFFF;"),
      codeLine("  --hub-surface-2: #F5F5F5;"),
      codeLine("  --hub-border: #E5E5E5;"),
      codeLine(""),
      codeLine("  /* Status */"),
      codeLine("  --hub-success: #16A34A;"),
      codeLine("  --hub-danger: #DC2626;"),
      codeLine(""),
      codeLine("  /* Typography */"),
      codeLine("  --font-sans: 'Inter', system-ui, sans-serif;"),
      codeLine("  --font-mono: 'JetBrains Mono', ui-monospace, monospace;"),
      codeLine(""),
      codeLine("  /* Radius */"),
      codeLine("  --radius-sm: 8px;"),
      codeLine("  --radius-md: 10px;"),
      codeLine("  --radius-lg: 14px;"),
      codeLine(""),
      codeLine("  /* Spacing */"),
      codeLine("  --space-1: 4px;"),
      codeLine("  --space-2: 8px;"),
      codeLine("  --space-3: 12px;"),
      codeLine("  --space-4: 16px;"),
      codeLine("  --space-5: 24px;"),
      codeLine("  --space-6: 32px;"),
      codeLine("  --space-8: 48px;"),
      codeLine("}"),

      spacer(300),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 },
        children: [new TextRun({ text: "— Fin del Design System v1.0 —", size: 18, font: "Arial", color: GRAY_500, italics: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80 },
        children: [new TextRun({ text: "Próximo paso recomendado: copy completo reescrito + prioritización de implementación por pestaña.", size: 17, font: "Arial", color: GRAY_500 })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/workdir/artifacts/NBA_HUB_Design_System_v1.docx", buffer);
  console.log("Document created successfully");
});
