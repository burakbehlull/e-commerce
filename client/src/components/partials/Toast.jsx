import { toast } from "react-hot-toast"

export function customize({ message, type, duration, id }) {
    toast[type](message, {
        id: id ? id : "custom-toast",
        duration: duration || 1000
    })
}

export default function showToast({ message, type, duration, id }) {
    customize({ message, type, duration, id })
}