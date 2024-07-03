import { jsonConfig, multiPartConfig } from "../utils/apiUtils"
import apiClient from "../utils/axios"

export const addMovie = async (form: any) => {
    return await apiClient.post('/movies/add-movie', form, multiPartConfig)
}

export const fetchMovies = async () => {
    return await apiClient.get('/movies/fetch-movies')
}

export const fetchMovieDetailsApi = async (id: any) => {
    return await apiClient.get(`/movies/fetch-movie-details/${id}`)
}

export const submitReview = async (form: any) => {
    return await apiClient.post('/reviews/submit-review', form, jsonConfig)
}

