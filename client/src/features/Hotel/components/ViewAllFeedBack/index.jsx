import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ViewAllFeedBack.scss";
import FeedBackItem from "../FeedBackItem";
import PaginationStyled from "../PaginationStyled";
import { Select } from "antd";
import EvaluationForm from "../EvaluationForm";
import { getMessageByScore } from "assets/globaJS";
import { phanHoiApi } from "api/PhanHoiApi";
import { useParams } from "react-router-dom";
ViewAllFeedBack.propTypes = {
  setIsVisibleAllFeedBack: PropTypes.func,
};

ViewAllFeedBack.defaultProps = {
  setIsVisibleAllFeedBack: null,
};

function ViewAllFeedBack(props) {
  const { setIsVisibleAllFeedBack } = props;
  const { placeId } = useParams();

  const [viewAllFB, setViewAllFB] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const [pagination, setPagination] = React.useState({ _page: 1, _limit: 4, _totalPage: 3 });

  const [orderBy, setOrderBy] = React.useState("latest");

  const [showFeedBackForm, setShowFeedBackForm] = useState(false);

  //fetch all feed back 
  React.useEffect(() => {
    const fetchFeedBacks = async () => {
      try {
        const { PhanHois, _totalPage, TongSo, DiemTB } = await phanHoiApi.getAll({ MaKhachSan: placeId, _page: pagination._page, _limit: pagination._limit, orderBy });
        setIsLoading(false);
        setViewAllFB({ comments: PhanHois, totalFeedBack: TongSo, mediumScore: DiemTB });
        setPagination(prev => ({ ...prev, _totalPage }))
      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      fetchFeedBacks();
    }, 2000);
  }, [orderBy, pagination._page]);

  React.useEffect(() => {
    console.log({ viewAllFB })
  }, [viewAllFB])


  return (
    <div className="viewall-feedback">
      <div className="viewall-feedback__wrapper slide-animate">
        <div className="viewall-feedback__wrapper__top">
          <div className="viewall-feedback__wrapper__top__left">
            <div className="score custom-score">{viewAllFB?.mediumScore}</div>
            <div className="numVoted">
              <div>{getMessageByScore(viewAllFB?.mediumScore)}</div>
              <span>{viewAllFB?.comments.length} đánh giá</span>
            </div>
            <div className="info">Trải nghiệm từ khách thật 100% </div>
          </div>
          <a
            className="btn-primary-outline"
            onClick={() => setShowFeedBackForm(!showFeedBackForm)}>
            Viết đánh giá
          </a>
        </div>
        <div className="viewall-feedback__wrapper__main">
          <div className="viewall-feedback__wrapper__main__header">
            <h6>Đánh giá của khách</h6>
            <div className="viewall-feedback__wrapper__main__header__right">
              <span>Sắp xếp đánh giá theo:</span>
              <Select
                defaultValue="latest"
                style={{ minWidth: "150px" }}
                onChange={(value) => { setOrderBy(value); setPagination(prev => ({ ...prev, _page: 1 })) }}>
                <Select.Option value="latest">Mới nhất</Select.Option>
                <Select.Option value="oldest">Cũ nhất</Select.Option>
                <Select.Option value="highest-score"> Điểm cao nhất</Select.Option>
                <Select.Option value="lowest-score">Điểm thấp nhất </Select.Option>
              </Select>
            </div>
          </div>

          {/* Show Feedback Form */}
          {showFeedBackForm && (
            <EvaluationForm setShowFeedBackForm={setShowFeedBackForm} />
          )}

          <div className="viewall-feedback__wrapper__main__list-feedback">
            {
              viewAllFB?.comments.map(fb => <FeedBackItem key={fb._id} fbInfo={fb} />)
            }
            <PaginationStyled onChange={(value) => setPagination(prev => ({ ...prev, _page: value }))} pageSize={1} currentPage={pagination._page} totalPage={pagination._totalPage} />
          </div>
        </div>
        <div
          onClick={() => setIsVisibleAllFeedBack(false)}
          className="viewall-feedback__wrapper__icon-close" >
          <i class="bi bi-x" />
        </div>
      </div>
    </div>
  );
}

export default ViewAllFeedBack;
