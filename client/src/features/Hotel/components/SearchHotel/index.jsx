import React from "react";
import PropTypes from "prop-types";

import "./SearchHotel.scss";
import InputField from "custom-fields/InputField";
import { Link, useNavigate } from "react-router-dom";
import { ConsoleSqlOutlined, SearchOutlined } from "@ant-design/icons";
import { ICONS } from "constants";
import { debounce } from "lodash";
import { Spin, Form } from "antd";
import { choNghiApi } from "api/ChoNghiApi";
import { useDispatch, useSelector } from "react-redux";
import {
  chooseDate,
  choosePlace,
  saveSearchValue,
} from "features/Hotel/HotelSlice";

SearchHotel.propTypes = {};

function SearchHotel(props) {
  const { searchValue, placeChoosen } = useSelector(
    (state) => state.hotelInfo.homePage
  );

  const [places, setPlaces] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);

  const [validate, setValidate] = React.useState(false);

  const debounceTimeout = React.useRef(null);

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const handleSearch = () => {
    placeChoosen._id ? navigate("/search") : setValidate(true);
  };

  //handle onchange search value
  const handleOnChange = (value) => {
    if (!value) {
      dispatch(saveSearchValue(value));
      dispatch(
        choosePlace({
          _id: null,
          placeName: null,
          _idCity: null,
          cityName: null,
        })
      );
      return;
    }
    setValidate(false);
    //fetch data using method debounce
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      dispatch(saveSearchValue(value));
      fetchPlaces(value);
    }, 1000);
  };

  const fetchPlaces = async (value) => {
    try {
      setIsFetching(true);
      console.log({ value });
      const { ChoNghis } = await choNghiApi.getAll({ search: value });
      const data = ChoNghis.map((ChoNghi) => ({
        icon: ICONS.LOCATION,
        name: ChoNghi.TenChoNghi,
        location: "Vi???t Nam",
        city: ChoNghi.ThanhPho[0].TenThanhPho,
        address: ChoNghi.DiaChi,
        _id: ChoNghi._id,
        _idCity: ChoNghi.ThanhPho[0]._id,
      }));

      setIsFetching(false);
      setPlaces(data);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };
  return (
    <div>
      <div className="search-hotel">
        <div className="search-hotel__main">
          <div className="search-hotel__main__title">
            T??m ch??? ngh??? ti???p theo
          </div>
          <div className="search-hotel__main__description">
            T??m ??u ????i Genius ?????c bi???t t???i kh???p n??i tr??n th??? gi???i!
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
                    placeholder="B???n mu???n ?????n ????u"
                  />
                  {validate && (
                    <div className="alertPlaceNull">
                      Vui l??ng nh???p ??i???m ?????n ????? b???t ?????u t??m ki???m.
                    </div>
                  )}
                </>

                {!placeChoosen._id && searchValue ? (
                  <div className="form-search-tips">
                    {/* <p>??i???m ?????n ???????c ??a th??ch g???n ????y</p> */}
                    {isFetching ? (
                      <Spin size="small" style={{ marginRight: "1rem" }} />
                    ) : (
                      <ul>
                        {places.map((place, index) => (
                          <li
                            key={index}
                            className="place"
                            onClick={() => {
                              form.setFieldsValue({
                                searchValue: `${place.name}, ${place.city}, ${place.location}`,
                              });
                              dispatch(
                                choosePlace({
                                  _id: place._id,
                                  placeName: place.name,
                                  _idCity: place._idCity,
                                  cityName: place.city,
                                })
                              );
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
                placeholder="Nh???n ph??ng"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onChange={({ target }) =>
                  dispatch(
                    chooseDate({
                      type: "receiveDate",
                      receiveDate: target.value,
                    })
                  )
                }
              />
              <span className="split"></span>
              <input
                type="text"
                placeholder="Tr??? ph??ng"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onChange={({ target }) =>
                  dispatch(
                    chooseDate({ type: "returnDate", returnDate: target.value })
                  )
                }
              />
            </div>
            <div className="btnSearch">
              <a to="" onClick={() => handleSearch()} className="btn-primary">
                T??m
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SearchHotel;
