import axios from "axios";
import { useEffect, useState } from "react";

export default function Address() {
  const [pujaData, setPujaData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if updating
  const [formData, setFormData] = useState({
    type: "add_address",
    id: "", // Only needed for updates
    phone_no: "9876543210",
    name: "UpenUser",
    email: "upen@gmail.com",
    state_id: "33",
    city_id: "3378",
    pincode: "302012",
    address: "jaipur",
  });

  const header = {
    language: "en",
    userId: "2",
    user_type: "user",
    Device_id: "upen",
    Longitude: JSON.parse(localStorage.getItem("formData") || "{}").Longitude,
    Latitude: JSON.parse(localStorage.getItem("formData") || "{}").Latitude,
    Ip_address: JSON.parse(localStorage.getItem("formData") || "{}").Ip_address,
    web_token: localStorage.getItem("authToken"),
  };

  useEffect(() => {
    fetchPujaData();
  }, []);

  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "address_list");

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/address",
        formData,
        { headers: header }
      );

      console.log("Puja API Response:", response.data);
      setPujaData(response.data.data);
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formDataToSend = new FormData();
      Object.keys(formData).forEach((key) =>
        formDataToSend.append(key, formData[key])
      );

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/address",
        formDataToSend,
        { headers: header }
      );

      console.log(isEditing ? "Address Updated Response:" : "Address Added Response:", response.data);
      alert(isEditing ? "Address updated successfully!" : "Address added successfully!");
      fetchPujaData(); // Refresh the list after action
      setShowForm(false);
      setIsEditing(false);
      resetForm();
    } catch (error) {
      console.error("Error saving address:", error);
      alert(isEditing ? "Failed to update address" : "Failed to add address");
    }
  };

  const handleEdit = (address) => {
    setFormData({
      ...address,
      type: "update_address", // Change API type
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      type: "add_address",
      address_id: "",
      phone_no: "9876543210",
      name: "UpenUser",
      email: "upen@gmail.com",
      state_id: "33",
      city_id: "3378",
      pincode: "302012",
      address: "jaipur",
      set_default:"1"
    });
  };

  return (
    <>
      <section className="mb-4 border bg-neutral-100 p-4 rounded-lg max-w-full">
        <div className="mx-auto">
          {/* Add / Edit Form Toggle */}
          <div className="mb-4">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setIsEditing(false);
                resetForm();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {showForm ? "Hide Form" : "Add New Address"}
            </button>
          </div>

          {/* Address Form */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mb-4 p-4 border rounded-lg shadow-lg bg-white"
            >
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block mb-2">
                Phone No:
                <input
                  type="text"
                  value={formData.phone_no}
                  onChange={(e) => setFormData({ ...formData, phone_no: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block mb-2">
                Address:
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block mb-2">
                City ID:
                <input
                  type="text"
                  value={formData.city_id}
                  onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block mb-2">
                State ID:
                <input
                  type="text"
                  value={formData.state_id}
                  onChange={(e) => setFormData({ ...formData, state_id: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block mb-2">
                Pincode:
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </label>

              <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md">
                {isEditing ? "Update Address" : "Submit"}
              </button>
            </form>
          )}

          {/* Address List */}
          {pujaData?.address_list?.length > 0 ? (
            pujaData.address_list.map((address) => (
              <div key={address.id} className="card md:flex max-w-lg mb-4 p-4 border rounded-lg shadow-lg bg-white">
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">{address.name}</h3>
                  <p className="text-sm text-gray-700">
                    📍 {address.address}, {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-sm text-gray-700">📞 {address.phone_no}</p>
                  <p className="text-sm text-gray-700">✉️ {address.email}</p>
                </div>
                <button onClick={() => handleEdit(address)} className="ml-4 px-3 py-1 bg-yellow-500 text-white rounded-md">
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No address found.</p>
          )}
        </div>
      </section>
    </>
  );
}
