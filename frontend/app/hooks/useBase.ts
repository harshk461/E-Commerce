
import React, { useState } from 'react'

export default function useBase() {
    const [url, setUrl] = useState(process.env.NEXT_PUBLIC_BASE_URL);

    return url;
}
