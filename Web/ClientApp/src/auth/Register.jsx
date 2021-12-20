import * as React from 'react'
import AuthTemplate from './AuthTemplate'

export default function Register({ validateUser }) {
    return (
        <AuthTemplate 
            title="User Registration"
            validateUser={validateUser}
        />
    )
};
