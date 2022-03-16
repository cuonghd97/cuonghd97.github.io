import * as React from 'react'
import { NavBar } from '../components/navbar/NavBar'
import { Posts } from '../components/posts/Posts'

export const HomePage = () => {
    return (
        <div>
            <NavBar />
            <Posts />
        </div>
    )
}
