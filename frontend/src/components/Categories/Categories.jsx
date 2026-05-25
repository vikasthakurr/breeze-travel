import { useEffect, useState } from "react";
import { useCategory, useFilter } from "../../context";
import Carousel from "react-elastic-carousel";
import { api } from "../../services";
import "./Categories.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { hotelCategory, setHotelCategory } = useCategory();
  const { filterDispatch } = useFilter();

  const handleFilterClick = () => {
    filterDispatch({ type: "SHOW_FILTER_MODAL" });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/category");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    setHotelCategory(category);
  };

  return (
    <section className="categories d-flex align-center gap-large">
      <div className="flex-grow">
        <Carousel itemsToShow={9} itemsToScroll={6} pagination={false}>
          {categories?.map(({ _id, category }) => (
            <button
              key={_id}
              type="button"
              onClick={() => handleCategoryClick(category)}
              className={`item ${
                category === hotelCategory ? "category-color" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </Carousel>
      </div>

      <button
        type="button"
        className="button btn-filter"
        onClick={handleFilterClick}
      >
        <span className="material-icons-outlined">filter_alt</span>
        <span>Filter</span>
      </button>
    </section>
  );
};
