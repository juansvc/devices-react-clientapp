import React, { useState, useEffect } from "react";

const EditDeviceForm = (props) => {
  const [device, setDevice] = useState(props.currentDevice);

  useEffect(() => {
    setDevice(props.currentDevice);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setDevice({ ...device, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updateDevice(device.id, device);
      }}
    >
      <div className="form-group">
        <h2>Edit Device</h2>
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
      <button className="modal-button">Update device</button>
    </form>
  );
};

export default EditDeviceForm;
