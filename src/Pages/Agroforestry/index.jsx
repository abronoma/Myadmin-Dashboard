// src/pages/AgroForestry.js
import React, { useState, useEffect } from 'react';


const AgroForestry = () => {
  const [formData, setFormData] = useState([]);

  const options = [
    {
      name: "Socialization",
      weight: 20,
      defaultDescriptions: ["Community Meeting", "Interested Farmers"],
    },
    {
      name: "Pre-registry",
      weight: 30,
      defaultDescriptions: ["Registration", "Documentation"],
    },
    {
      name: "Data Cleaning",
      weight: 20,
      defaultDescriptions: ["Data Validation", "Data Verification"],
    },
    {
      name: "Plant and Maintenance Training |",
      weight: 20,
      defaultDescriptions: ["Data Validation", "Data Verification"],
    },
    {
      name: "Plant and Maintenance Training ||",
      weight: 20,
      defaultDescriptions: ["Data Validation", "Data Verification"],
    },
    {
      name: "Delivery and Distribution",
      weight: 10,
      defaultDescriptions: ["Product Delivery", "Distribution Logistics"],
    },
    {
      name: "Post-planting Monitoring",
      weight: 10,
      defaultDescriptions: ["Monitoring", "Evaluation"],
    },
    {
      name: "Replanting",
      weight: 10,
      defaultDescriptions: ["Replanting Process", "Seedling Selection"],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getAllCategories();
      setFormData(categories);
    };
    fetchData();
  }, []);

  const handleAddRow = async () => {
    const newCategory = {
      mainCategory: "",
      weight: "",
      descriptions: [
        {
          weight: "",
          description: "",
          target: "",
          actual: "",
          percentageAchieved: "",
          prePercentageCalculated: "",
          startDate: "",
          endDate: "",
        },
      ],
    };
    const addedCategory = await createCategory(newCategory);
    setFormData([...formData, addedCategory]);
  };

  const handleChange = (e, mainCategoryId, descriptionId, field) => {
    const { value } = e.target;
    const updatedFormData = formData.map((mainCategory) => {
      if (mainCategory.id === mainCategoryId) {
        const updatedDescriptions = mainCategory.descriptions.map(
          (description) => {
            if (description.id === descriptionId) {
              return { ...description, [field]: value };
            }
            return description;
          }
        );
        const totalWeight = updatedDescriptions.reduce(
          (acc, desc) => acc + parseInt(desc.weight || 0),
          0
        );
        return {
          ...mainCategory,
          descriptions: updatedDescriptions,
          weight: totalWeight,
        };
      }
      return mainCategory;
    });
    setFormData(updatedFormData);
  };

  const handleMainCategoryChange = async (e, mainCategoryId) => {
    const { value } = e.target;
    const selectedOption = options.find((option) => option.name === value);
    if (selectedOption) {
      const defaultDescriptions = selectedOption.defaultDescriptions;
      const totalWeight = selectedOption.weight;
      const updatedFormData = formData.map((mainCategory) => {
        if (mainCategory.id === mainCategoryId) {
          return {
            ...mainCategory,
            mainCategory: value,
            weight: totalWeight,
            descriptions: defaultDescriptions.map((description, index) => ({
              id: index + 1,
              weight: Math.floor(
                (totalWeight / 100) * (100 / defaultDescriptions.length)
              ),
              description: description,
              target: `${(index + 1) * 1000}`,
              actual: "",
              percentageAchieved: "",
              prePercentageCalculated: "",
              startDate: "",
              endDate: "",
            })),
          };
        }
        return mainCategory;
      });
      setFormData(updatedFormData);
      const updatedCategory = updatedFormData.find(category => category.id === mainCategoryId);
      await updateCategory(mainCategoryId, updatedCategory);
    }
  };

  const handleRemoveRow = async (mainCategoryId) => {
    await deleteCategory(mainCategoryId);
    const updatedFormData = formData.filter(
      (mainCategory) => mainCategory.id !== mainCategoryId
    );
    setFormData(updatedFormData);
  };

  const handleAddButtonClicked = () => {
    const updatedFormData = formData.map((mainCategory) => {
      const updatedDescriptions = mainCategory.descriptions.map(
        (description) => {
          const percentageAchieved =
            description.actual && description.target
              ? (parseFloat(description.actual) /
                  parseFloat(description.target)) *
                  100 +
                "%"
              : "";

          const prePercentageCalculated =
            description.actual && description.target
              ? (parseFloat(description.actual) /
                  parseFloat(description.target)) *
                  100 *
                  (parseFloat(description.weight) /
                    parseFloat(mainCategory.weight)) +
                "%"
              : "";

          return {
            ...description,
            percentageAchieved,
            prePercentageCalculated,
          };
        }
      );
      return {
        ...mainCategory,
        descriptions: updatedDescriptions,
      };
    });
    setFormData(updatedFormData);
  };

  return (
    <div className="form-container">
      <h3 className="main-category">Agroforestry</h3>
      <div className="category">
        {formData.map((mainCategory) => (
          <div key={mainCategory.id}>
            <div className="add-main-category">
              <select
                value={mainCategory.mainCategory}
                onChange={(e) => handleMainCategoryChange(e, mainCategory.id)}
              >
                <option value="">Select Main Category</option>
                {options.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="weight-container">
                <span>Main Category Weight: {mainCategory.weight}</span>
                <span>
                  Total Percentage Achieved:{" "}
                  {mainCategory.descriptions.reduce(
                    (acc, desc) =>
                      acc + parseFloat(desc.prePercentageCalculated || 0),
                    0
                  )}
                  %
                </span>
              </div>
              <button onClick={() => handleRemoveRow(mainCategory.id)}>
                Remove Main Category
              </button>
            </div>
            <h4>Description</h4>
            <table className="description-table">
              <thead>
                <tr>
                  <th>Weight</th>
                  <th>Description</th>
                  <th>Target</th>
                  <th>Actual</th>
                  <th>Percentage Achieved</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mainCategory.descriptions.map((description) => (
                  <tr key={description.id}>
                    <td>
                      <span>{description.weight}</span>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={description.description}
                        onChange={(e) =>
                          handleChange(
                            e,
                            mainCategory.id,
                            description.id,
                            "description"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={description.target}
                        onChange={(e) =>
                          handleChange(
                            e,
                            mainCategory.id,
                            description.id,
                            "target"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={description.actual}
                        onChange={(e) =>
                          handleChange(
                            e,
                            mainCategory.id,
                            description.id,
                            "actual"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={description.percentageAchieved}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={description.startDate}
                        onChange={(e) =>
                          handleChange(
                            e,
                            mainCategory.id,
                            description.id,
                            "startDate"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={description.endDate}
                        onChange={(e) =>
                          handleChange(
                            e,
                            mainCategory.id,
                            description.id,
                            "endDate"
                          )
                        }
                      />
                    </td>
                    <td className="action-buttons">
                      <div className="add-button">
                        <button onClick={handleAddButtonClicked}>Add</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <button className="add-row" onClick={handleAddRow}>
        Add Main Category
      </button>
    </div>
  );
};

export default AgroForestry;