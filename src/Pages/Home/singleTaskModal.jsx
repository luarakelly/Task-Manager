import {useState} from "react";

export default function SingleTaskModal() {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <p>I am a modal</p>
        </div>
    );
}