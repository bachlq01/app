import React, { useEffect, useState } from "react";
import Card from "../component/card";

const VideoList = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getListId();
    }, [])
    const getListId = async () => {
        try {
            const res = await fetch("https://us-central1-babu-33902.cloudfunctions.net/listId").then(res => res.json());
            setData(res.message);
        } catch {
        }
    }

    return (
        <div style={{ margin: 20 }}>
            {data.map((e, i) => (
                <Card key={e.id} id={e.id} index={i} length={data.length} />
            ))}
        </div>
    )
}

export default VideoList;
// AIzaSyAX_McjRH-qsUgAsC6UgIHfFvog0Bgg-gk