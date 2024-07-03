import * as Yup from 'yup'

export const reviewSchema = Yup.object({
    rating: Yup.number().required('Required'),
    password: Yup.string().trim().min(6, 'Password must be at least 6 characters long').required('Required'),
});
