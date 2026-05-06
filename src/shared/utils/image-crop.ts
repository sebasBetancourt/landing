/**
 * Image Crop Utilities
 * 
 * Helper functions for cropping and processing images
 */

export interface Area {
  x: number
  y: number
  width: number
  height: number
}

/**
 * Check if image has transparency
 */
function hasTransparency(canvas: HTMLCanvasElement): boolean {
  const ctx = canvas.getContext('2d')
  if (!ctx) return false

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Check alpha channel (every 4th value)
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) {
      return true // Found transparent or semi-transparent pixel
    }
  }
  return false
}

/**
 * Creates a cropped image from the source image and crop area
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<Blob> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const rotRad = getRadianAngle(rotation)

  // Calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  )

  // Set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // Translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  // Draw rotated image
  ctx.drawImage(image, 0, 0)

  // Extract the cropped area
  const croppedCanvas = document.createElement('canvas')
  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    throw new Error('No 2d context')
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // Detect transparency and use appropriate format
  const hasAlpha = hasTransparency(croppedCanvas)
  const mimeType = hasAlpha ? 'image/png' : 'image/jpeg'
  const quality = hasAlpha ? undefined : 0.92 // High quality JPEG

  console.log(`📸 Image ${hasAlpha ? 'has' : 'does not have'} transparency, using ${mimeType}`)

  // Return as blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'))
        return
      }
      resolve(blob)
    }, mimeType, quality)
  })
}

/**
 * Creates an image element from a URL
 */
export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })
}

/**
 * Converts degrees to radians
 */
export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

/**
 * Converts a File to a data URL
 */
export function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result as string), false)
    reader.readAsDataURL(file)
  })
}

