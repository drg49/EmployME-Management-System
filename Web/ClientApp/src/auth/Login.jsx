import * as React from 'react'
import AuthTemplate from './AuthTemplate'

export default function LogIn({ validateUser }) {
    return (
        <AuthTemplate 
            title="Login"
            validateUser={validateUser}
        />
    )
};
