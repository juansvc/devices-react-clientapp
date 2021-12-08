import React, { useState } from "react";

const AddDeviceForm = (props) => {
  const initialFormState = {
    id: null,
    system_name: "",
    type: "",
    hdd_capacity: "",
  };
  const [device, setDevice] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setDevice({ ...device, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!device.system_name || !device.type) return;

        props.addDevice(device);
        setDevice(initialFormState);
      }}
    >
      <h2>Add Device</h2>
      <div className="form-group">
        <label>System Name</label>
        <input
          type="text"
          name="system_name"
          value={device.system_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Type</label>
        <input
          type="text"
          name="type"
          value={device.type}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>HDD Capacity</label>
        <input
          type="number"
          name="hdd_capacity"
          value={device.hdd_capacity}
          onChange={handleInputChange}
          required
        />
      </div>
      <button className="modal-button">Add</button>
    </form>
  );
};

export default AddDeviceForm;
