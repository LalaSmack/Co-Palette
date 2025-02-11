import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomButton = () => {
    const [roomID, setRoom] = useState("");
    const navigate = useNavigate();

    const handleRoomChange = () => {
        if (roomID) navigate(`/room/${roomID}`);
    };
    
    return (
        <div>
        <input
            type="text"
            placeholder="Enter Room Name"
            value={roomID}
            onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={handleRoomChange}>Join/Create Room</button>
        </div>
    );
}

export default RoomButton;