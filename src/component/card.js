import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from 'react-player/lazy'
import { useDispatch, useSelector } from "react-redux";
import { addToArrData } from "../stores/arrData";
import { increment, setValue } from "../stores/count";

const Card = (id) => {
    const play = useRef(null);
    const dispath = useDispatch();
    const count = useSelector(state => state.count.value);
    const arr = useSelector(state => state.arrData.arrData);
    const [ready, setReady] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [title, setTitle] = useState("");
    useEffect(() => {
        var ytApiKey = "AIzaSyAX_McjRH-qsUgAsC6UgIHfFvog0Bgg-gk";
        fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + id.id + "&key=" + ytApiKey)
            .then(res => res.json())
            .then(res => {
                setTitle(res.items[0].snippet.title)
            })
    }, [id]);

    useEffect(() => {
        if (id.index === count) {
            setPlaying(true)
        }
    }, [count, id, ready])

    useEffect(() => {
        if (arr.length === 5) {
            fetch("https://us-central1-babu-33902.cloudfunctions.net/wallet", {
                method: "POST",
                body: JSON.stringify({
                    uid: "uid", arrData: arr
                })
            })
        }
    }, [arr])

    return (
        <div className="card" style={{ width: "100%" }}>
            <ReactPlayer
                ref={play}
                url={"https://www.youtube.com/watch?v=" + id.id}
                width="auto"
                height="auto"
                playing={playing}
                controls
                onPlay={() => {
                    dispath(setValue(id.index))
                }}
                onPause={() => {
                    play.current.seekTo(30, 'seconds');
                    if (count < id.length) {
                        setPlaying(false)
                        dispath(addToArrData(id.id))
                        dispath(increment());
                    }
                }}
            />
            <div className="card-body">
                <p className="card-text">{JSON.stringify(playing)}{title}</p>
            </div>
        </div>
    )
}

export default Card;