import fs from 'fs'
import { mkdir } from 'fs/promises'
import path from 'path'
import { pipeline } from 'stream/promises'
import fetch from 'node-fetch'

/**
 * Downloads an image from a URL and saves it to the specified local path
 * @param url The URL of the image to download
 * @param localPath The local path where the image should be saved
 */
export async function downloadImage(url: string, localPath: string): Promise<void> {
  try {
    // Ensure the directory exists
    await mkdir(path.dirname(localPath), { recursive: true })

    // Download the image
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    if (!response.body) {
      throw new Error('No response body')
    }

    // Create write stream
    const fileStream = fs.createWriteStream(localPath)

    // Use pipeline for proper error handling and cleanup
    await pipeline(response.body, fileStream)
  } catch (error) {
    console.error(`Failed to download image from ${url}:`, error)
    throw error
  }
} 