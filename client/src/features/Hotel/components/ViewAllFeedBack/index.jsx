import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ViewAllFeedBack.scss";
import FeedBackItem from "../FeedBackItem";
import PaginationStyled from "../PaginationStyled";
import { Select, Skeleton } from "antd";
import EvaluationForm from "../EvaluationForm";
import { getMessageByScore } from "assets/globaJS";
import { phanHoiApi } from "api/PhanHoiApi";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import { toastSucsess, toastError } from 'utils/notifi';

ViewAllFeedBack.propTypes = {
  setIsVisibleAllFeedBack: PropTypes.func,
  isOwner: PropTypes.bool,
};

ViewAllFeedBack.defaultProps = {
  setIsVisibleAllFeedBack: null,
  isOwner: false,
};

function ViewAllFeedBack(props) {
  const { setIsVisibleAllFeedBack, isOwner } = props;
  const { placeId } = useParams();

  const [viewAllFB, setViewAllFB] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const { user } = useSelector(state => state.auth);


  const [pagination, setPagination] = React.useState({
    _page: 1,
    _limit: 4,
    _totalPage: 3,
  });

  const [orderBy, setOrderBy] = React.useState("latest");

  const [showFeedBackForm, setShowFeedBackForm] = useState(false);
  const [isNewData, setIsNewData] = useState(false);

  console.log({ isOwner })

  const [showForm, setShowForm] = useState(false);


  //fetch all feed back
  React.useEffect(() => {
    const fetchFeedBacks = async () => {
      try {
        const { PhanHois, _totalPage, TongSo, DiemTB } =
          await phanHoiApi.getAll({
            MaKhachSan: placeId,
            _page: pagination._page,
            _limit: pagination._limit,
            orderBy,
          });
        setIsLoading(false);
        setViewAllFB({
          comments: PhanHois,
          totalFeedBack: TongSo,
          mediumScore: DiemTB,
        });
        setPagination((prev) => ({ ...prev, _totalPage }));
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    setIsLoading(true);
    setTimeout(() => {
      fetchFeedBacks();
    }, 2000);
  }, [orderBy, pagination._page, isNewData]);


  const handleSubmitForm = async (values) => {
    console.log(user);

    try {
      const { message } = await phanHoiApi.add({
        MaKhachSan: placeId,
        MaKH: user?._id,
        ...values,
      });
      toastSucsess(message);
      setIsNewData(prev => !prev);
    } catch (error) {
      const errMessage = error.response.data;
      toastError(errMessage.message);
    }
  };

  const handleResponse = async (id, values) => {
    try {
      const { message } = await phanHoiApi.update(id, values);
      toastSucsess(message);
      setIsNewData(prev => !prev);
      setShowForm(false);
    } catch (error) {
      const errMessage = error.response.data;
      toastError(errMessage.message);
    }
  };

  return (
    <div className="viewall-feedback">
      <div className="viewall-feedback__wrapper slide-animate">
        <div className="viewall-feedback__wrapper__top">
          {!isLoading && (
            <div className="viewall-feedback__wrapper__top__left">
              <div className="score custom-score">
                {parseFloat(viewAllFB?.mediumScore || 0).toFixed(1)}
              </div>
              <div className="numVoted">
                <div>{getMessageByScore(viewAllFB?.mediumScore)}</div>
                <span>{viewAllFB?.comments.length || "Ch??a c??"} ????nh gi??</span>
              </div>
              <div className="info">Tr???i nghi???m t??? kh??ch th???t 100% </div>
            </div>
          )}
          {isLoading && (
            <div style={{ display: "flex" }}>
              <Skeleton.Button size="large" active />
              <div style={{ marginLeft: "1rem" }}>
                <Skeleton.Button
                  active
                  style={{ height: "16px", width: "80px" }}
                />
                <br />
                <Skeleton.Input
                  active
                  style={{ height: "16px", width: "100px" }}
                />
              </div>
            </div>
          )}


          {
            user?._id &&
            <a
              className="btn-primary-outline"
              onClick={() => setShowFeedBackForm(!showFeedBackForm)}
            >
              Vi???t ????nh gi??
            </a>
          }
        </div>
        <div className="viewall-feedback__wrapper__main">
          <div className="viewall-feedback__wrapper__main__header">
            <h6>????nh gi?? c???a kh??ch</h6>
            <div className="viewall-feedback__wrapper__main__header__right">
              <span>S???p x???p ????nh gi?? theo:</span>
              <Select
                defaultValue="latest"
                style={{ minWidth: "150px" }}
                onChange={(value) => {
                  setOrderBy(value);
                  setPagination((prev) => ({ ...prev, _page: 1 }));
                }}
              >
                <Select.Option value="latest">M???i nh???t</Select.Option>
                <Select.Option value="oldest">C?? nh???t</Select.Option>
                <Select.Option value="highest-score">
                  {" "}
                  ??i???m cao nh???t
                </Select.Option>
                <Select.Option value="lowest-score">
                  ??i???m th???p nh???t{" "}
                </Select.Option>
              </Select>
            </div>
          </div>

          {/* Show Feedback Form */}
          {showFeedBackForm && (
            <EvaluationForm
              setShowFeedBackForm={setShowFeedBackForm}
              onSubmit={handleSubmitForm}
            />
          )}

          <div className="viewall-feedback__wrapper__main__list-feedback">
            {!isLoading &&
              viewAllFB?.comments.map((fb) => (
                <FeedBackItem setShowForm={setShowForm} showForm={showForm} onFinish={handleResponse} isOwner={isOwner} key={fb._id} fbInfo={fb} />
              ))}
            {isLoading &&
              [1, 2, 3].map((i) => (
                <div key={i} className="feedback-item">
                  <div style={{ flexBasis: "35%" }}>
                    {isLoading && (
                      <div style={{ paddingRight: "1rem" }}>
                        <div style={{ display: "flex" }}>
                          <Skeleton.Avatar size="large" />
                          <div style={{ marginLeft: "0.5rem" }}>
                            <Skeleton.Button
                              style={{ width: "160px", height: "16px" }}
                              active
                            />
                            <br />
                            <Skeleton.Button
                              active
                              style={{ width: "100px", height: "16px" }}
                            />
                          </div>
                        </div>
                        <Skeleton paragraph={{ rows: 3 }} active />
                      </div>
                    )}
                  </div>

                  <div style={{ flexGrow: 1, display: "flex" }}>
                    <Skeleton paragraph={{ rows: 4 }} />
                  </div>
                </div>
              ))}
            <PaginationStyled
              onChange={(value) =>
                setPagination((prev) => ({ ...prev, _page: value }))
              }
              pageSize={1}
              currentPage={pagination._page}
              totalPage={pagination._totalPage}
            />
          </div>
        </div>
        <div
          onClick={() => setIsVisibleAllFeedBack(false)}
          className="viewall-feedback__wrapper__icon-close"
        >
          <i class="bi bi-x" />
        </div>
      </div>
    </div>
  );
}

export default ViewAllFeedBack;
