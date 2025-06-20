import React, { Suspense } from 'react'
import OTPVerification from './otpverificationclient'

export default function OtpVerificationPage() {
    return (
        <Suspense fallback={<div></div>}>
            <OTPVerification />
        </Suspense>)
}
