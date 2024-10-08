import { Request, Response } from 'express'
import Users, { IUsers } from '../model/UsersModel'
import { genereateToken } from '../_lib/jwt'
import axios from 'axios'


export const loginController = async (req: Request, res: Response) => {

    try {

        const data = req?.body
        const userData = await Users.findOne({ email: data?.email })

        if (!userData) {
            res.json({ message: 'Invalid username or password' })
        } else {

            if (userData?.role === 'admin' && userData?.password === data?.password) {
                const adminId = await Users.findOne({ email: userData?.email, role: 'admin' })
                const token = genereateToken({ role: 'admin', email: userData?.email, id: adminId })

                res.status(200).json({ status: 'ok', message: 'login success', userData, role: userData?.role, token })
            } else {
                if (userData?.password === data?.password) {
                    const token = genereateToken({ role: 'user', email: userData?.email })

                    res.status(200).json({ status: 'ok', message: 'login success', userData, role: userData?.role, token })
                } else {

                    res.json({ message: 'Invalid username or password' })
                }
            }
        }

    } catch (error: any) {
        console.log(error);
        res.status(error?.status || 400).json({ message: error?.message })
    }
}

export const fetchUserController = async (req: Request, res: Response) => {

    try {

        const data = req?.user
        const userData = await Users.findOne({ email: data?.email })

        res.status(200).json({ status: 'ok', data: userData })


    } catch (error: any) {
        console.log(error)
        res.status(error?.status || 400).json({ message: error?.message })
    }
}

export const signOutController = (req: Request, res: Response) => {

    try {


        res.status(200).json({ status: 'ok', message: 'logout successfull' })


    } catch (error: any) {
        res.status(error?.status || 400).json({ message: error?.message })
    }
}

export const loginWithGoogle = async (req: Request, res: Response) => {

    try {

        const googleAccessToken = req.body.googleAccesToken

        if (googleAccessToken) {

            const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
            const email: string = response.data.email


            const existingUser = await Users?.findOne({ email: email })

            if (existingUser) {

                const token = genereateToken({ id: existingUser._id, email: existingUser?.email })

                res.json({ status: 'ok', userData: existingUser, token }).status(200)

            } else {

                const googleData = response.data

                const userData: IUsers = {
                    email: googleData.email,
                    profilePhoto: googleData.picture,
                    password: googleData.sub,
                    fullName: googleData.name,
                    role: 'user',

                }

                const newUser = await Users.create(userData)

                if (newUser) {

                    const token = genereateToken({ id: newUser._id, email: newUser?.email })

                    res.json({ status: 'ok', userData: newUser, token }).status(200)
                }
            }

        } else {

            throw new Error('Unable to login with google')
        }

    } catch (error: any) {
        console.log(error)
        res.status(error?.status || 400).json({ message: error?.message })
    }
}