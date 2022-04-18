import React from "react";
import PropTypes from "prop-types";
import "./FeedBack.scss";
import { getMessageByScore, ScrollToView } from "assets/globaJS";
import Carousel from "../Carousel";
import HightLightComments from "../HightLightComments";
import { Skeleton } from "antd";

FeedBack.propTypes = {
  setIsVisibleAllFeedBack: PropTypes.func,
  feedBack: PropTypes.object,
<<<<<<< HEAD
  isLoadingFeedBack: PropTypes.bool,
=======
  isLoading: PropTypes.bool,
>>>>>>> abdf29cef5493a39b6a47803e716290ed020a369
};

FeedBack.defaultProps = {
  setIsVisibleAllFeedBack: null,
  feedBack: { comments: [], totalFeedBack: null, mediumScore: null },
  isLoadingFeedBack: false,
};

function FeedBack(props) {
<<<<<<< HEAD
  const { setIsVisibleAllFeedBack, feedBack, isLoadingFeedBack } = props;
=======
  const { setIsVisibleAllFeedBack, feedBack, isLoading } = props;
>>>>>>> abdf29cef5493a39b6a47803e716290ed020a369

  const [topFeedBack, setTopFeedBack] = React.useState([]);

  const [content, setContent] = React.useState();

  React.useEffect(() => {
    const newTopFeedBack = feedBack?.comments.sort((a, b) => b - a);
    setTopFeedBack(newTopFeedBack);
  }, [feedBack.comments]);

  React.useEffect(() => {
    const newContent = topFeedBack.map((fb) => (
      <HightLightComments key={fb._id} feedBack={fb} />
    ));
    setContent(newContent);
  }, [topFeedBack]);

  return (
    <div className="feedback" id="feedback">
      <div className="feedback__header">
        <div className="feedback__header__title">Đánh giá của khách</div>
        <a className="btn-primary" onClick={() => ScrollToView("empty-room")}>
          Xem phòng trống
        </a>
      </div>

      {!isLoading && (
        <div className="feedback__score-wrapper">
          <div className="score">
            {parseFloat(feedBack?.mediumScore).toFixed(1)}
          </div>
          <div className="feedback__score-wrapper__message">
            {getMessageByScore(feedBack?.mediumScore)}
          </div>
          <div className="feedback__score-wrapper__numVoted">
            {feedBack.totalFeedBack} đánh giá
          </div>
          <div
            onClick={() => setIsVisibleAllFeedBack(true)}
            className="feedback__score-wrapper__readAll"
          >
            Đọc tất cả đánh giá
          </div>
        </div>
      )}

<<<<<<< HEAD
      {isLoadingFeedBack && (
=======
      {isLoading && (
>>>>>>> abdf29cef5493a39b6a47803e716290ed020a369
        <Skeleton.Input active style={{ width: "400px", height: "28px" }} />
      )}

      <div className="wrapperSlider">
        <div className="wrapperSlider__title">
          Đọc xem khách yêu thích điều gì nhất:
        </div>
<<<<<<< HEAD
        {!isLoadingFeedBack && <Carousel isPadding={true} childrens={content} showNum={3} />}
        {isLoadingFeedBack && (
=======
        {!isLoading && (
          <Carousel isPadding={true} childrens={content} showNum={3} />
        )}
        {isLoading && (
>>>>>>> abdf29cef5493a39b6a47803e716290ed020a369
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: "370px",
                  height: "210px",
                  padding: "1rem",
                  border: "1px solid #eee",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Skeleton.Avatar size="large" />
                  <div style={{ marginLeft: "0.5rem" }}>
                    <Skeleton.Button
                      style={{ height: "1rem", width: "180px" }}
                    />
                    <br />
                    <Skeleton.Button
                      style={{ height: "1rem", width: "100px" }}
                    />
                  </div>
                </div>

                <Skeleton paragraph={{ rows: 3 }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedBack;
