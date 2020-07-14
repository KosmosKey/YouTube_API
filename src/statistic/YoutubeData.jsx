import React, { useEffect, useState } from "react";
import SetLoading from "./SetLoading";
import config from "./config";
import numeral from "numeral";
import ProfilePicture from "./image/ProfilePicture.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPoll } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function YoutubeData() {
  const [counter, setCounter] = useState();
  const [views, setViews] = useState();
  const [videoCount, setVideoCount] = useState();
  const [arrayId, setArrayId] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { channel_id, api_key } = config;
    const apiCall = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel_id}&key=${api_key}`;

    fetch(apiCall)
      .then((result) => result.json())
      .then((data) => {
        const api_key_count = numeral(
          data.items[0].statistics.subscriberCount
        ).format("0,0");
        const api_key_viewCount = numeral(
          data.items[0].statistics.viewCount
        ).format("0,0");
        const api_key_videoCount = numeral(
          data.items[0].statistics.videoCount
        ).format("0,0");
        setVideoCount(api_key_videoCount);
        setViews(api_key_viewCount);
        setCounter(api_key_count);
        console.log(data);
      }, []);
  }, []);

  useEffect(() => {
    const { channel_id, api_key } = config;
    const apiCallIVidoes = `https://www.googleapis.com/youtube/v3/search?key=${api_key}&channelId=${channel_id}&part=snippet,id&order=date&maxResults=20`;
    fetch(apiCallIVidoes)
      .then((res) => res.json())
      .then((data) => {
        const dataMap = data.items.map((item) => item.id.videoId);
        setArrayId(dataMap);
      });
  }, []);

  useEffect(() => {
    const { api_key } = config;
    const apiCallVideoId = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${arrayId}&key=${api_key}`;
    fetch(apiCallVideoId)
      .then((res) => res.json())
      .then((data) => {
        const newArrayVid = data.items.map((item) => item.statistics.likeCount);
        const likeCountTotal = newArrayVid.reduce(
          (aculumuator, currentvalue) => {
            return aculumuator + parseInt(currentvalue, 10);
          },
          0
        );
        setNewArray(likeCountTotal);
        if (likeCountTotal > 0) {
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      });
  }, [arrayId]);

  return (
    <div className="conatiner">
      {isLoading && <SetLoading loading={isLoading} />}
      <div className="Api_Container">
        <div className="subscriber_container">
          <img className="profile_image" src={ProfilePicture} alt="filip pfp" />
          <div className="name_visit_container">
            <div className="name">
              <h1>Filip Grębowski</h1>
            </div>
            <div className="visit_channel">
              <span>
                Visit
                <FontAwesomeIcon
                  className="arrow_icon"
                  icon={faArrowCircleRight}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="cl">
          <div className="subscriber_total_container">
            <div className="user_icon">
              <FontAwesomeIcon className="user_fa" icon={faUsers} />
            </div>
            <div className="total_subs">
              <h1> {counter} </h1>
              <span>Subscribers</span>
            </div>
          </div>
          <div className="likesCount">
            <div className="icons_title">
              <FontAwesomeIcon className="user_likes" icon={faThumbsUp} />
            </div>
            <div className="amount">
              <h1>{newArray}</h1>
              <span>Total&nbsp;Likes</span>
            </div>
          </div>
          <div className="viewCounter_container">
            <div className="icons_title">
              <FontAwesomeIcon icon={faEye} className="fa_eye" alt="eye" />
            </div>
            <div className="amount">
              <h1>{views}</h1>
              <span>Total views</span>
            </div>
          </div>
          <div className="viewCounter_container">
            <div className="icons_title">
              <FontAwesomeIcon icon={faPoll} className="fa_eye" alt="eye" />
            </div>
            <div className="amount">
              <h1>{videoCount}</h1>
              <span>Videos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubeData;
