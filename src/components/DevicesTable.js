import React, { useState, useMemo } from "react";
import SearchBox from "./SearchBox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useSortableData = (devices, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedDevices = useMemo(() => {
    let sortableDevices = [...devices];
    if (sortConfig !== null) {
      sortableDevices.sort((a, b) => {
        if (sortConfig.number === true){
          a = Number(a);
          b = Number(b);
          if (a.length === b.length) {
            return a > b ? 1 : -1;
          }
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableDevices;
  }, [devices, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    let number = false;
    if (key === "hdd_capacity"){
      number = true;
    }
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction, number });
  };

  return { devices: sortedDevices, requestSort, sortConfig };
};

const DevicesTable = (props) => {
  const { devices, requestSort, sortConfig } = useSortableData(props.devices);
  const { editDevice, deleteDevice } = props;
  const [searchValue, setSearchValue] = useState("");
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  let updateDevices = devices.filter((device) => {
    return Object.keys(device).some((key) =>
      device[key]
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  });

  return (
    <>
      <div className="container">
        <SearchBox searchHandler={searchHandler} />
        <table>
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("system_name")}
                  className={getClassNamesFor("system_name")}
                >
                  System Name
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("type")}
                  className={getClassNamesFor("type")}
                >
                  Type
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("hdd_capacity")}
                  className={getClassNamesFor("hdd_capacity")}
                >
                  HDD Capacity
                </button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {updateDevices.length > 0 ? (
              updateDevices.map((device) => (
                <tr key={device.id}>
                  <td>{device.system_name}</td>
                  <td>{device.type}</td>
                  <td>{device.hdd_capacity} GB</td>
                  <td>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        editDevice(device);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteDevice(device.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Devices</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DevicesTable;
