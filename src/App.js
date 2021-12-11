import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DevicesTable from "./components/DevicesTable";
import UpdateDeviceForm from "./components/UpdateDeviceForm";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import useModal from "./hooks/useModal";
import axios from "axios";

const App = () => {
  const [devices, setDevices] = useState([]);
  const [editing, setEditing] = useState(false);
  const initialFormState = {
    id: null,
    system_name: "",
    type: "",
    hdd_capacity: "",
  };
  const [currentDevice, setCurrentDevice] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(1);
  const [devicesPerPage] = useState(5);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    axios("http://localhost:3000/devices")
      .then((response) =>
        response.data.map((device) => ({
          id: device.id,
          system_name: device.system_name,
          type: device.type,
          hdd_capacity: device.hdd_capacity,
        }))
      )
      .then((data) => {
        setDevices(data);
      });
  }, []);

  // incrementing ids + adding placeholder image manually
  // TODO: update id and image handling when tying this to a database
  const addDevice = (device) => {
    toggle();
    device.id = devices.length + 1;
    setDevices([device, ...devices]);
  };

  const editDevice = (device) => {
    setEditing(true);
    toggle();
    setCurrentDevice({
      id: device.id,
      system_name: device.system_name,
      type: device.type,
      hdd_capacity: device.hdd_capacity,
    });
  };

  const updateDevice = (id, updatedDevice) => {
    setEditing(false);
    setDevices(devices.map((device) => (device.id === id ? updatedDevice : device)));
    toggle();
  };

  const deleteDevice = (id) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  // pagination
  const indexOfLastDevice = currentPage * devicesPerPage;
  const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
  const currentDevices = devices.slice(indexOfFirstDevice, indexOfLastDevice);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className="container">
        <button className="button-add" onClick={toggle}>
          Add Device
        </button>
      </div>
      {editing ? (
        <Modal
          isShowing={isShowing}
          hide={toggle}
          content={
            <UpdateDeviceForm
              setEditing={setEditing}
              currentDevice={currentDevice}
              updateDevice={updateDevice}
            />
          }
        />
      ) : (
        <Modal
          isShowing={isShowing}
          hide={toggle}
          content={<UpdateDeviceForm addDevice={addDevice} />}
        />
      )}
      <DevicesTable
        devices={currentDevices}
        editDevice={editDevice}
        deleteDevice={deleteDevice}
      />
      <Pagination
        devicesPerPage={devicesPerPage}
        totalDevices={devices.length}
        paginate={paginate}
      />
    </>
  );
};

export default App;
