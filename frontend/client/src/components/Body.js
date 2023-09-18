import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Body.css'


function TableRow({ id, color, brightness, latestAction, isChecked, onRowCheckboxClick }) {
  console.log("11111111")
  console.log(latestAction)
  const [currentColor, setCurrentColor] = useState(color);
  const [currentBrightness, setCurrentBrightness] = useState(brightness);
  const [currentChecked, setCurrentChecked] = useState(isChecked);

  const handleColorChange = (event) => {
    setCurrentColor(event.target.value);
  };

  const handleBrightnessChange = (e) => {
    setCurrentBrightness(e.target.value);
  };

  const handleRowCheckboxClick = (e) =>{
    setCurrentChecked(e.target.checked)
    onRowCheckboxClick()
  }

  return (
    <tr className={isChecked ? 'active' : ''}>
      <th scope="row">
        <label className="control control--checkbox">
          <input type="checkbox" checked={currentChecked} onChange={handleRowCheckboxClick} />
          <div className="control__indicator">
            {isChecked && <i className="fas fa-check"></i>}
          </div>
        </label>
      </th>
      <td>{id}</td>
      <td>
        <input type="color" id="head" name="head" value={currentColor} onChange={handleColorChange} />
      </td>
      {/* <td>
        {latestAction}
        <small className="d-block"></small>
      </td> */}
      <td>
        <input type="number" value={currentBrightness} onChange={handleBrightnessChange} />
      </td>
      <td>
        <SaveButton id={id} brightness={currentBrightness} color={currentColor} isChecked={currentChecked} />
      </td>
    </tr>
  );
}

function handleSave(i, brightness, color, isChecked, latestAction) {
  console.log(i);
  console.log(brightness);
  console.log(color);
  console.log(isChecked);

  // Create an object with the data to be saved
  const dataToSave = {
    i,
    brightness,
    color,
    isChecked,
    latestAction, 
  };
  console.log(dataToSave)
  // Make a POST request to your Express server
  axios.post('http://localhost:3001/api/save', dataToSave) // Use /api/save
  .then((response) => {
    console.log('Data saved successfully');
  })
  .catch((error) => {
    console.error('Error saving data:', error);
  });

}

function SaveButton({ id, brightness, color, isChecked, latestAction }) {
  return (
    <button className="save-button" onClick={() => { handleSave(id, brightness, color, isChecked, latestAction) }}>
      Save
    </button>
  );
}


function Body() {
  const [checkAll, setCheckAll] = useState(false);
  const [data, setData] = useState([]);

  const fetchAll = async () => {
    try {
      const response = await fetch('http://localhost:3001');
      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw the error to propagate it
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialData = await fetchAll();
        // Now you can use initialData here
        console.log("AAAA")
        console.log(initialData[0]);

        const dataAsArray = Object.keys(initialData[0]).map((id) => ({
          id,
          brightness: initialData[0][id].brightness,
          color: initialData[0][id].color,
          isChecked: initialData[0][id].personDetected,
          latestAction:initialData[0][id].latestAction,
          save: <SaveButton id={id} brightness={initialData[0][id].brightness} color={initialData[0][id].color} isChecked={initialData[0][id].personDetected} latestAction={initialData[0][id].latestAction} />,
        }));

        setData(dataAsArray);
        console.log(dataAsArray);
      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Error fetching initial data:", error);
      }
    };

    fetchData();
  }, []); // The empty array means this effect runs once, similar to componentDidMount

  

  // const initialData = {
  //   1391: { color: '#2321', brightness: 100, isChecked: false, latestAction: "John In" },
  //   // Add more entries here as needed
  // };


    



  const toggleCheckAll = () => {
    const newData = data.map((item) => ({ ...item, isChecked: !checkAll }));
    setData(newData);
    setCheckAll(!checkAll);
  };

  const handleRowCheckboxClick = (id) => {
    const newData = [...data];
    const itemIndex = newData.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      newData[itemIndex].isChecked = !newData[itemIndex].isChecked;
      setData(newData);
    }
  };

  useEffect(() => {
    // Fetch data from your Node.js backend
    console.log('ajsnvsbscbsibsibsisbvisbisvvisb')

    axios.get('http://localhost:3001/api/data') // Replace with your backend URL
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="table-responsive custom-table-responsive">
          <table className="table custom-table">
            <thead>
              <tr>
                <th scope="col">
                  On
                  <label className="control control--checkbox">
                    <input
                      type="checkbox"
                      className="js-check-all"
                      checked={checkAll}
                      onChange={toggleCheckAll}
                    />
                    <div className="control__indicator">
                      {checkAll && <i className="fas fa-check"></i>}
                    </div>
                  </label>
                </th>
                <th scope="col">ID</th>
                <th scope="col">Color</th>
                {/* <th scope="col">Latest Action</th> */}
                <th scope="col">Brightness</th>
                <th scope="col">Save</th>
              </tr>
            </thead>
            <tbody>
              {data.map((rowData) => (
                <TableRow
                  key={rowData.id}
                  {...rowData}
                  isChecked={rowData.isChecked}
                  // latestAction={rowData.latestAction}
                  onRowCheckboxClick={() => handleRowCheckboxClick(rowData.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



export default Body;
