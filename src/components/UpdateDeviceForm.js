import React, { useState, useEffect } from "react";

const UpdateDeviceForm = (props) => {
  const initialFormState = {
    id: null,
    system_name: "",
    type: "",
    hdd_capacity: "",
  };
  const [device, setDevice] = useState(props.currentDevice ? props.currentDevice : initialFormState);

  useEffect(() => {
    setDevice(props.currentDevice ? props.currentDevice : initialFormState);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setDevice({ ...device, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.currentDevice ? props.updateDevice(device.id, device) : props.addDevice(device);
        !props.currentDevice ?? setDevice(initialFormState);
      }}
    >
      <div className="form-group">
        <h2>{props.currentDevice ? 'Edit Device' : 'Add Device'}</h2>
        <label>System Name</label>
        <input
          type="text"
          name="system_name"
          value={device.system_name}
          onChange={handleInputChange}
          pattern="[a-zA-Z0-9-]+"
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
          pattern="[a-zA-Z]+"
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
          pattern="[0-9-]+"
          required
        />
      </div>
      <button className="modal-button">{props.currentDevice ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default UpdateDeviceForm;
