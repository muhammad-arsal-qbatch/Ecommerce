import CustomInput from '../inputField';

const AddPersonRows = (props) => {
  const { deliveryAddressData, setDeliveryAddressData } = props || {};
  const { addPersonMappedRows } = props;

  const handleUpdate = (e, col) => {
    console.log({ VAL: col.field });
    setDeliveryAddressData({
      ...deliveryAddressData,
      [`${col.field}`]: e.target.value
    });
  };

  return addPersonMappedRows.map((row, index) => (
    <div key={index} className="row">
      {row.map((col, index) => (
        <div key={index} className="col">
          <CustomInput
            key={index}
            defaultValue={col.state}
            onChange={(e) => handleUpdate(e, col)}
            label={col.field}
            placeholder={col.field}
          ></CustomInput>
        </div>
      ))}
    </div>
  ));
};
export default AddPersonRows;
