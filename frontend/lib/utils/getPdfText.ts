export async function extractTextFromPDF(file: File): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const lines: { y: number; text: string }[] = [];

    for (const item of content.items as any[]) {
      if (!item.str?.trim()) continue;

      // transform[5] is the Y position on the page
      const y = Math.round(item.transform[5]);
      const existing = lines.find((l) => Math.abs(l.y - y) < 3);

      if (existing) {
        existing.text += " " + item.str;
      } else {
        lines.push({ y, text: item.str });
      }
    }

    // Sort top-to-bottom (PDF Y axis is bottom-up, so sort descending)
    lines.sort((a, b) => b.y - a.y);

    pages.push(lines.map((l) => l.text.trim()).join("\n"));
  }

  return pages.join("\n\n");
}