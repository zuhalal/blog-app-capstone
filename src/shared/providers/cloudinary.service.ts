import { Injectable } from '@nestjs/common'
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary'
import toStream = require('buffer-to-stream')

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  async uploadFile(
    file: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )
      toStream(file.buffer).pipe(upload)
    })
  }

  async uploadBuffer(
    buffer: Buffer
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )
      toStream(buffer).pipe(upload)
    })
  }

  async destroyFile(publicId: string) {
    const { result } = await cloudinary.uploader.destroy(
      publicId,
      (result) => result
    )
    return result
  }
}
