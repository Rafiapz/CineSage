import * as Yup from 'yup'

export const movieSchema = Yup.object({
    title: Yup.string().trim().required('Required'),
    description: Yup.string().trim().required('Required'),
    duration: Yup.number()
        .required('Duration is required')
        .positive('Duration must be a positive number')
        .integer('Duration must be an integer')
        .min(90, 'Duration must be at least 90 minutes')
        .max(180, 'Duration must be less than 180 minutes'),
    releaseDate: Yup.date()
        .required('Release Date is required')
        .max(new Date(), 'Release Date cannot be in the future'),
    genres: Yup.string()
        .required('Genres are required')
        .matches(
            /^(\s*\w+\s*,)*(\s*\w+\s*)$/,
            'Genres must be a comma-separated list of words'
        )
});
