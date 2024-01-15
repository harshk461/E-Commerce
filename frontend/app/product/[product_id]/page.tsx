'use client'

import { useParams } from 'next/navigation'
import React from 'react'

export default function Page() {
    const { product_id } = useParams();
    return (
        <div>{product_id}</div>
    )
}
