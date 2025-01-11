import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomButton = () => {
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const handleRoomChange = () => {
        if (room) navigate(`/room/${room}`);
    };
    
    return (
        <div>
        <input
            type="text"
            placeholder="Enter Room Name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={handleRoomChange}>Join/Create Room</button>
        </div>
    );
}

export default RoomButton;