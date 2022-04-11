import React from "react";
import PropTypes from "prop-types";

import "./SearchHotel.scss";
import InputField from "custom-fields/InputField";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { ICONS } from "constants";
import { debounce } from "lodash";
import { Spin, Form } from "antd";
import { choNghiApi } from "api/ChoNghiApi";

SearchHotel.propTypes = {};

function SearchHotel(props) {
  const [searchValue, setSearchValue] = React.useState("");
  const [receiveDate, setReceiveDate] = React.useState();
  const [returnDate, setReturnDate] = React.useState();

  const [places, setPlaces] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);

  const [validate, setValidate] = React.useState(false);
  const [placeChoosen, setPlaceChoosen] = React.useState(null);

  const debounceTimeout = React.useRef(null);

  const navigate = useNavigate();

  const [form] = Form.useForm();

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


  //handle onchange search value
  const handleOnChange = value => {

    setSearchValue(value);
    setValidate(false);
    setPlaces([]);
    !value && setPlaceChoosen(null);

    //when value is empty
    if (!value) return;

    //fetch data using method debounce 
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchPlaces(value);
    }, 800);

  }


  const fetchPlaces = async (value) => {
    try {
      setIsFetching(true);
      console.log({ value });
      const { ChoNghis } = await choNghiApi.getAll({ search: value })
      const data = ChoNghis.map(ChoNghi => ({
        icon: ICONS.LOCATION,
        name: ChoNghi.TenChoNghi,
        location: "Việt Nam",
        city: ChoNghi.ThanhPho[0].TenThanhPho,
        address: ChoNghi.DiaChi,
        _id: ChoNghi._id,
        _idCity: ChoNghi.ThanhPho[0]._id
      }));

      console.log({ data });
      setIsFetching(false);
      setPlaces(data);

    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };
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
                    onChange={({ target }) => handleOnChange(target.value)}
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
                              form.setFieldsValue({ searchValue: `${place.name}, ${place.city}, ${place.location}    ` });
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
