import React, { useEffect, useState } from "react";
import styles from "./ObjectTable.module.css";
import { user } from "./TableData";
import { TableHeading } from "./TableData";

export const ObjectTable = () => {
  const [ColumnLength, setColumnLength] = useState(5);
  const [rows, setRows] = useState([]);

  const handleClick = () => {
    setColumnLength((prev) => prev + 2);
  };

  useEffect(() => {
    const logKeyTypes = (obj, depth) => {
      let arr = [];
      const helper = (currentObj, currentDepth) => {
        if (currentDepth <= depth) {
          Object.keys(currentObj).forEach((key) => {
            const value = currentObj[key];
            if (Array.isArray(value)) {
              helper(value, currentDepth + 1);
            } else if (typeof value === "object" && value !== null) {
              helper(value, currentDepth + 1);
            } else if (currentDepth <= depth) {
              arr.push(value);
            }
          });
        }
      };
      helper(obj, 1);
      return arr;
    };

    const updatedRows = user.map((item) => logKeyTypes(item, ColumnLength - 1));
    setRows(updatedRows);
  }, [ColumnLength]);

  return (
    <div id={styles.table_container}>
      <table>
        <caption>
          <h1>USER DETAILS</h1>
        </caption>
        <thead>
          <tr>
            {TableHeading.slice(0, ColumnLength).map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.slice(0, ColumnLength).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button id={styles.button} onClick={handleClick}>
          +
        </button>
      </div>
    </div>
  );
};
