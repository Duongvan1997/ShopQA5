
import { Link } from "react-router-dom";
import "./Sale.css"
import { useEffect, useState } from "react";
import axios from 'axios';

function Sale() {

    const [products, setProducts] = useState([]);
    const [typeFilter, setTypeFilter] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);
    const [sizeFilter, setSizeFilter] = useState([]);

    const fetchData = () => {
        axios.get('http://localhost:8080/api/v1/productTypes/full')
            .then(response => {

                let formattedType = response.data.map((_type) => {
                    return ({
                        ..._type,
                        selected: false
                    })
                })

                formattedType.unshift({
                    id: -1,
                    name: "Tất cả",
                    selected: true
                });

                setTypeFilter(formattedType);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios.get('http://localhost:8080/api/v1/products/allcolor')
            .then(response => {

                let formattedColor = response.data.map(color => ({ name: color, selected: false }));

                formattedColor.unshift({
                    name: "Tất cả",
                    selected: true
                });

                setColorFilter(formattedColor);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios.get('http://localhost:8080/api/v1/products/allsize')
            .then(response => {

                let formattedSize = response.data.map(Size => ({ name: Size, selected: false }));

                formattedSize.unshift({
                    name: "Tất cả",
                    selected: true
                });

                setSizeFilter(formattedSize);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const handleChangeTypeFilter = (_id) => {
        const newTypeFilter = typeFilter.map(_type => {
            if (_type.id === _id) {
                return ({
                    ..._type,
                    selected: true
                })
            } else {
                return ({
                    ..._type,
                    selected: false
                })
            };
        })

        setTypeFilter(newTypeFilter);
    }

    const handleChangeColorFilter = (_name) => {
        const newColorFilter = colorFilter.map(_Color => {
            if (_Color.name === _name) {
                return ({
                    ..._Color,
                    selected: true
                })
            } else {
                return ({
                    ..._Color,
                    selected: false
                })
            };
        })

        setColorFilter(newColorFilter);
    }

    const handleChangeSizeFilter = (_name) => {
        const newSizeFilter = sizeFilter.map(_Size => {
            if (_Size.name === _name) {
                return ({
                    ..._Size,
                    selected: true
                })
            } else {
                return ({
                    ..._Size,
                    selected: false
                })
            };
        })

        setSizeFilter(newSizeFilter);
    }

    useEffect(() => {

        const selectedType = typeFilter.filter((_type) => { return _type.selected === true })[0];
        const selectedColor = colorFilter.filter((_color) => { return _color.selected === true })[0];
        const selectedSize = sizeFilter.filter((_size) => { return _size.selected === true })[0];

        let dataFilterForColor = ""
        let dataFilterForSize = ""
        let dataFilterForType = ""

        if (selectedColor && selectedColor.name !== "Tất cả") {
            dataFilterForColor = "color=" + selectedColor.name
        }

        if (selectedSize && selectedSize.name !== "Tất cả") {
            dataFilterForSize = "size=" + selectedSize.name
        }

        if (selectedType && selectedType.name !== "Tất cả") {
            dataFilterForType = "type_id=" + selectedType.id
        }

        axios.get(`http://localhost:8080/api/v1/products/filter?${dataFilterForColor}&${dataFilterForSize}&${dataFilterForType}`)
            .then(response => {
                // console.log(response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [typeFilter, colorFilter, sizeFilter])

    useEffect(() => {
        window.scrollTo(0, 0);

        fetchData();

        axios.get('http://localhost:8080/api/v1/products/full')
            .then(response => {
                // console.log(response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    return (
        <div className="Shop">
            <div className="Shop_left">
                <div className="filter_type">
                    <span>LOẠI</span>
                    <div>
                        {
                            typeFilter?.map((_type) => {
                                return (
                                    <button className={_type.selected ? "active_filter" : ""} key={_type.id} onClick={() => handleChangeTypeFilter(_type.id)}>{_type.name}</button>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="filter_color">
                    <span>MÀU SẮC</span>
                    <div>
                        {
                            colorFilter?.map((color, index) => {
                                return (
                                    color.name !== "Tất cả" ?
                                        <button className={color.selected ? "active_filter" : ""} style={{ backgroundColor: `${color.name}` }} key={index} onClick={() => { handleChangeColorFilter(color.name) }}></button>
                                        : <button className={color.selected ? "active_filter" : ""} key={index} onClick={() => { handleChangeColorFilter(color.name) }}>All</button>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="filter_size">
                    <span>SIZE</span>
                    <div>
                        {
                            sizeFilter?.map((size, index) => {
                                return (
                                    size.name !== "Tất cả" ?
                                        <button className={size.selected ? "active_filter" : ""} style={{ backgroundsize: `${size.name}` }} key={index} onClick={() => { handleChangeSizeFilter(size.name) }}>{size.name}</button>
                                        : <button className={size.selected ? "active_filter" : ""} key={index} onClick={() => { handleChangeSizeFilter(size.name) }}>All</button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="Shop_right">
                {
                    products.length !== 0 ?
                    
                        products.map((shoes, index) => {
                            return (
                                <Link className="Shop_right_shoes" key={index} to={`/product/${shoes.id}`}>
                                    <div className="shoes_top">
                                        <div className="shoes_top_img">
                                            {shoes.sale_percent !== 0 && <span className="shoes_tags">-{shoes.sale_percent}%</span>}
                                            <img src={shoes.image_url} alt="" lazy="true" />
                                        </div>
                                        <div className="shoes_top_info">
                                            <h3>{shoes.name}</h3>
                                            <span>{shoes.type_name.toUpperCase()}</span>
                                        </div>

                                    </div>
                                    <div className="shoes_bottom">
                                        <h4>{shoes.price} Vnđ</h4>
                                        {/* <span> {(shoes.price * (1 - shoes.sale_percent / 100)).toFixed(2)}Vnđ</span> */}
                                    </div>
                                </Link>
                            )
                        })

                    : <p>Không tìm thấy sản phẩm phù hợp</p>
                }
            </div>
        </div>
    )
}

export default Sale;