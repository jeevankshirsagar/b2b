import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Loader from "components/admin/Loader";
import InputFormItem from "components/admin/FormItems/items/InputFormItem";
import DatePickerFormItem from "components/admin/FormItems/items/DatePickerFormItem";
import Widget from "components/admin/Widget";

import feedbackFields from "components/admin/CRUD/Feedback/feedbackFields";
import IniValues from "components/admin/FormItems/iniValues";
import PreparedValues from "components/admin/FormItems/preparedValues";
import FormValidations from "components/admin/FormItems/formValidations";
import Dropdown from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import { useRouter } from "next/router";

const FeedbackForm = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const router = useRouter();

  const iniValues = () => {
    return IniValues(feedbackFields, props.record || {});
  };

  const formValidations = () => {
    return FormValidations(feedbackFields, props.record || {});
  };

  const handleSubmit = async (values) => {
    const { id, ...data } = PreparedValues(feedbackFields, values || {});
  
    try {
      const response = await fetch("http://localhost:8080/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          title: selectedProduct, // Include the selected product value
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error while saving feedback");
      }
  
      console.log("Feedback saved successfully");
      
      // Redirect to /admin/feedbacks upon successful submission
      router.push("/admin/feedback");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const title = () => {
    if (props.isProfile) {
      return "Edit My Profile";
    }

    return props.isEditing ? "Edit feedback" : "Add feedback";
  };
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const responseData = await response.json();

      // Check if the 'rows' property is an array
      if (Array.isArray(responseData.rows)) {
        console.log("Products data:", responseData.rows);

        setProducts(responseData.rows);

        if (responseData.rows.length > 0) {
          console.log("First Product Title:", responseData.rows[0].title);
        }
      } else {
        console.error("Products data is not an array:", responseData);
        // Set a default value or handle the error appropriately
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Widget title={<h4>{title()}</h4>} collapse close>
      <Formik
        onSubmit={handleSubmit}
        initialValues={iniValues()}
        validationSchema={formValidations()}
        render={(form) => (
          <form onSubmit={form.handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <InputFormItem name={"name"} schema={feedbackFields} />
              <InputFormItem name={"contact"} schema={feedbackFields} />
              <InputFormItem name={"email"} schema={feedbackFields} />
              <Dropdown
                options={products.map((product) => ({
                  label: (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={product.imageUrl} alt={product.title} style={{ marginRight: '8px', width: '24px', height: '24px' }} />
                      <span>{product.title}</span>
                    </div>
                  ),
                  value: product.title
                }))}
                value={selectedProduct}
                onChange={(selectedValues) => setSelectedProduct(selectedValues)}
              />
              <InputFormItem name={"unit"} schema={feedbackFields} />
              
            </div>
            <div>
            <InputFormItem name={"bname"} schema={feedbackFields} />
              <InputFormItem name={"bgst"} schema={feedbackFields} />
              <InputFormItem name={"address"} schema={feedbackFields} />
              <InputFormItem name={"status"} schema={feedbackFields} />
              <DatePickerFormItem
                name={"enquiry_date"}
                schema={feedbackFields}
                showTimeInput
              />
            </div>
            <div className="form-buttons" style={{ gridColumn: '1 / -1' }}>
              <button
                className="btn btn-primary"
                disabled={form.isSubmitting}
                type="submit"
              >
                Save
              </button>{" "}
              <button
                className="btn btn-light"
                type="button"
                disabled={form.isSubmitting}
                onClick={form.handleReset}
              >
                Reset
              </button>{" "}
              <button
                className="btn btn-light"
                type="button"
                disabled={form.isSubmitting}
                onClick={() => props.onCancel()}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      />
    </Widget>
  );
};

export default FeedbackForm;