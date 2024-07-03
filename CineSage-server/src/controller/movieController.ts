import { Request, Response } from 'express'
import Movies from '../model/MoviesModel'

export const addMovieController = async (req: Request, res: Response) => {

    try {

        let data = req?.body
        data.rating = 0
        data.poster = `${process?.env.BACK_END_URL}/image/posters/${req?.file?.filename}`

        await Movies.create(data)

        res.status(200).json({ status: 'ok', message: "success" })


    } catch (error: any) {
        console.log(error)
        res.status(error?.status || 400).json({ message: error?.message })
    }
}

export const fetchMoviesController = async (req: Request, res: Response) => {

    try {

        const movies = await Movies.find({})

        res.status(200).json({ status: 'ok', data: movies })

    } catch (error: any) {
        res.status(error?.status || 400).json({ message: error?.message })
    }
}

export const fetchMovieDetailsController = async (req: Request, res: Response) => {

    try {

        const id = req?.params?.id


        const details = await Movies.findOne({ _id: id })



        res.status(200).json({ status: 'ok', data: details })

    } catch (error: any) {
        res.status(error?.status || 400).json({ message: error?.message })
    }
}