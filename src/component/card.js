import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from 'react-player/lazy'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToArrData, removeArr } from "../stores/arrData";
import { increment, setValue } from "../stores/count";
import { setLoad } from "../stores/loadVideo";

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
                setTitle(res.items[0].snippet.title);
            })
    }, [id]);

    useEffect(() => {
        if (id.index === count) {
            setPlaying(true);
        }
    }, [count, id, ready])

    useEffect(() => {
        if (arr.length === 5) {
            fetch("https://us-central1-babu-33902.cloudfunctions.net/wallet", {
                method: "POST",
                body: JSON.stringify({
                    uid: "uid", arrData: arr
                })
            }).then(res => {res.json();dispath(removeArr())}).then(res => {
                console.log(res)
                dispath(removeArr())
            })
        }
    }, [arr]);

    return (
        <div className="card" style={{ width: "100%" }}>
            <ReactPlayer
                ref={play}
                url={"http://www.youtube.com/embed/" + id.id}
                width="auto"
                height="auto"
                playing={playing}
                controls
                onPlay={() => {
                    let iter = setInterval(() => {
                        if (play.current.getCurrentTime() >= 30) {
                            setPlaying(false);
                            clearInterval(iter);
                        }
                    }, 15000);
                }}
                onPause={() => {
                    dispath(addToArrData(id.id))
                    dispath(increment());
                }}
            />
            <div className="card-body">
                <p className="card-text">{title}</p>
            </div>
        </div>
    )
}

export default Card;