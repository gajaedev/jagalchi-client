export type CanvasImageFormat = 'png' | 'jpg' | 'svg';

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

/**
 * DOM 노드를 이미지(PNG/JPG/SVG) 로 export.
 * html-to-image 는 export 시점에만 필요하므로 dynamic import 로 분리한다.
 */
export async function exportCanvasAsImage(
  element: HTMLElement,
  format: CanvasImageFormat,
  filename: string,
) {
  const { toPng, toJpeg, toSvg } = await import('html-to-image');
  if (format === 'png') {
    const dataUrl = await toPng(element, { cacheBust: true });
    downloadDataUrl(dataUrl, filename);
    return;
  }
  if (format === 'jpg') {
    const dataUrl = await toJpeg(element, { cacheBust: true, quality: 0.95 });
    downloadDataUrl(dataUrl, filename);
    return;
  }
  const dataUrl = await toSvg(element, { cacheBust: true });
  downloadDataUrl(dataUrl, filename);
}

/**
 * DOM 노드를 PDF 로 export. jspdf 는 dynamic import.
 */
export async function exportCanvasAsPdf(element: HTMLElement, filename: string) {
  const [{ toPng }, { jsPDF }] = await Promise.all([import('html-to-image'), import('jspdf')]);

  const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 });
  const img = new Image();
  img.src = dataUrl;
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });

  const isLandscape = img.width > img.height;
  const pdf = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'px',
    format: [img.width, img.height],
  });
  pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
  pdf.save(filename);
}
