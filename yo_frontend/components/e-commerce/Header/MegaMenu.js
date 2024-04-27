import React, { useEffect, useState } from "react";
import s from "./Header.module.scss";
import axios from "axios";

const MegaMenu = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categories/"
        );
        setCategories(response.data.rows);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Toggle the active category state
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <li className={` ${s.mega_menu}`}>
      <div
        className={`${s.mega_menu_wrapper} ${
          mobileMenuVisible ? "slideInUp" : ""
        }`}
      >
        <div className={`${s.mega_menu_col}`}>
          <h5>Menu block 1</h5>

          {categories.map((category) => (
            <div className={`${s.mega_menu_col}`} key={category.id}>
              <h5>
                {/* Show '+' or '-' based on the active state */}
                <a
                  href="#"
                  onClick={() => handleCategoryClick(category.id)}
                  style={{marginTop:'20px'}}
                >
                  {category.title} {activeCategory === category.id ? "-" : "+"}
                </a>
              </h5>
              {/* Render sub menu only if the category is active */}
              {activeCategory === category.id && (
                <ul className={`${s.mega_sub_menu}`}>
                  {/* You can replace the following list items with your actual data */}
                  <li>data</li>
                  <li>data</li>
                  <li>data</li>
                  <li>data</li>
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className={`${s.mega_menu_col}`}>
          <h5>Menu block 1</h5>

          {categories.map((e) => (
            <ul className={`${s.mega_sub_menu}`}>
              <li>
                <a href="#">{e.title}</a>
              </li>
            </ul>
          ))}
        </div>
        <div className={s.mega_menu_col}>
          <h5>Menu block 1</h5>

          {categories.map((e) => (
            <ul className={`${s.mega_sub_menu}`}>
              <li>
                <a href="#">{e.title}</a>
              </li>
            </ul>
          ))}
        </div>
        <div className={s.mega_menu_col}>
          <h5>Menu block 1</h5>

          {categories.map((e) => (
            <ul className={`${s.mega_sub_menu}`}>
              <li>
                <a href="#">{e.title}</a>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </li>
  );
};

export default MegaMenu;
