'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function OrderPage() {
    const navigate = useRouter();
    useEffect(() => {
        navigate.replace("/user/orders");
    }, [])
    return (
        <div>OrderPage</div>
    )
}
