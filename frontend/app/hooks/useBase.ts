
import React, { useState } from 'react'

export default function useBase() {
    const [url, setUrl] = useState('http://localhost:3002');

    return url;
}
