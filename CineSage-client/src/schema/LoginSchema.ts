import * as Yup from 'yup'

export const validationSchema = Yup.object({
    email: Yup.string().trim().email('Invalid email address').required('Required'),
    password: Yup.string().trim().min(6, 'Password must be at least 6 characters long').required('Required'),
});
