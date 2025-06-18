import { useState } from "react"

export default function Box({ index, content }: { index: number, content: string }) {

    return (
        <div id={`box-${index + 1}`} className="border border-red-500" >{content}</div>
    )
}