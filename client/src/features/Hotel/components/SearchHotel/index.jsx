import React from "react";
import PropTypes from "prop-types";

import "./SearchHotel.scss";
import InputField from "custom-fields/InputField";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { ICONS } from "constants";
import { debounce } from "lodash";
import { Spin, Form } from "antd";

SearchHotel.propTypes = {};

function SearchHotel(props) {
  const [searchValue, setSearchValue] = React.useState("");
  const [receiveDate, setReceiveDate] = React.useState();
  const [returnDate, setReturnDate] = React.useState();

  const [places, setPlaces] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);

  const [validate, setValidate] = React.useState(false);
  const [placeChoosen, setPlaceChoosen] = React.useState(null);

  const navigate = useNavigate();

  const handleSearch = () => {
    placeChoosen
      ? navigate("/search", {
          state: {
            roadmap: [placeChoosen.city],
            searchValue: {
              name: placeChoosen.name,
              city: placeChoosen.city,
            },
            receiveDate,
            returnDate,
          },
        })
      : setValidate(true);
  };

  const [form] = Form.useForm();

  React.useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);
      setPlaces([]);

      setTimeout(() => {
        setIsFetching(false);
        setPlaces([
          {
            icon: ICONS.LOCATION,
            name: "Pull man Vũng Tàu",
            location: "Việt Nam",
            city: "Vũng tàu",
          },
          {
            icon: ICONS.LOCATION,
            name: "Dusit Princess",
            location: "Việt Nam",
            city: "Bình Phước",
          },
          {
            icon: ICONS.LOCATION,
            name: "Vung Tau Melody Apartment",
            location: "Việt Nam",
            city: "Bình Thuận",
          },
          {
            icon: ICONS.LOCATION,
            name: "The Shells Resort & Spa Phu Quoc",
            location: "Việt Nam",
            city: "Phú Quốc",
          },
          {
            icon: ICONS.LOCATION,
            name: "La Veranda Resort Phu Quoc - MGallery",
            location: "Việt Nam",
            city: "Phú Quốc",
          },
        ]);
      }, 1000);
    };
    searchValue ? fetchPlaces() : setPlaces([]);
  }, [searchValue]);
  return (
    <div style={{ position: "sticky", top: "-12px", zIndex: 99 }}>
      <div className="search-hotel">
        <div className="search-hotel__main">
          <div className="search-hotel__main__title">
            Tìm chỗ nghỉ tiếp theo
          </div>
          <div className="search-hotel__main__description">
            Tìm ưu đãi Genius đặc biệt tại khắp nơi trên thế giới!
          </div>
          <Form
            autoComplete="off"
            initialValues={{ searchValue: "" }}
            form={form}
            className="search-hotel__main__form"
          >
            <div className="search-hotel__main__form__item form-search">
              <SearchOutlined style={{ color: "#666" }} />
              <>
                <>
                  <InputField
                    allowClear={true}
                    name="searchValue"
                    onChange={({ target }) => {
                      setSearchValue(target.value);
                      setValidate(false);
                      !target.value && setPlaceChoosen(null);
                    }}
                    placeholder="Bạn muốn đến đâu"
                  />
                  {validate && (
                    <div className="alertPlaceNull">
                      Vui lòng nhập điểm đến để bắt đầu tìm kiếm.
                    </div>
                  )}
                </>

                {searchValue && !placeChoosen ? (
                  <div className="form-search-tips">
                    {/* <p>Điểm đến được ưa thích gần đây</p> */}
                    {isFetching ? (
                      <Spin size="small" style={{ marginRight: "1rem" }} />
                    ) : (
                      <ul>
                        {places.map((place, index) => (
                          <li
                            key={index}
                            className="place"
                            onClick={() => {
                              form.setFieldsValue({ searchValue: place.name });
                              setPlaceChoosen((prev) => ({
                                ...prev,
                                name: place.name,
                                city: place.city,
                              }));
                            }}
                          >
                            <div className="icon">{place.icon}</div>
                            <div>
                              <div className="place-name">{place.name}</div>
                              <span>
                                {place.city} , {place.location}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </>
            </div>
            <div className="search-hotel__main__form__item date">
              <input
                type="text"
                placeholder="Nhận phòng"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onChange={({ target }) => setReceiveDate(target.value)}
              />
              <span className="split"></span>
              <input
                type="text"
                placeholder="Trả phòng"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onChange={({ target }) => setReturnDate(target.value)}
              />
            </div>
            <div className="btnSearch">
              <a to="" onClick={() => handleSearch()} className="btn-primary">
                Tìm
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SearchHotel;
