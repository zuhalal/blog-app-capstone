import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import * as moment from 'moment'

@Injectable()
export class UtilsService {
  capitalizeWord = (sentence: string, splitter?: RegExp | string) => {
    const words = sentence.split(splitter ?? ' ')

    const res = words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1).toLowerCase()
      })
      .join(' ')
    return res
  }

  getDateFromDateTime(date: Date | string | undefined | moment.Moment) {
    return moment(date).locale('id').toISOString().split('T')[0]
  }

  getTimeFromActualDate(date: Date | string | undefined | moment.Moment) {
    return moment(this.getDateFromDateTime(date)).toDate().getTime()
  }

  async catchError(error: { code: string }, response: Response) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return response.status(500).json({
          status: false,
          message:
            'There is a unique constraint violation, operation cannot be done',
          data: null,
        })
      } else if (error.code === 'P2025') {
        return response.status(500).json({
          status: false,
          message: 'Record does not exist.',
          data: null,
        })
      }
    } else if (typeof error == 'string') {
      return response.status(400).json({
        status: false,
        message: error,
        data: null,
      })
    }
    return response.status(500).json({
      status: false,
      message: 'Something went wrong on the server',
      data: null,
    })
  }
}
