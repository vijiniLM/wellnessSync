import React, { useState, useContext, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import avatar from "../assets/avatar.png";
import { AppContext } from "../Context/AppContext";

const Profile = () => {
  const { userData, updateUserData,changePassword } = useContext(AppContext);

  // Initialize the profile with values from the context (fallback to defaults if necessary)
  const initialProfile = {
    fullName: userData.name || "John Doe",
    email: userData.email || "johndoe@example.com",
    address: userData.address || "123 Main Street, Anytown",
    telephone: userData.phoneNumber || "1234567890",
    profilePhoto: userData.profilePhoto !== "" ? userData.profilePhoto : avatar,
  };

  // Local state for profile data and editing copy
  const [profile, setProfile] = useState(initialProfile);
  const [editProfile, setEditProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Password change state
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Update local profile state if userData changes and the user is not editing.
  useEffect(() => {
    const updatedProfile = {
      fullName: userData.name,
      email: userData.email,
      address: userData.address,
      telephone: userData.phoneNumber,
      profilePhoto: userData.profilePhoto !== "" ? userData.profilePhoto : avatar,
    };
    setProfile(updatedProfile);
    if (!isEditing) {
      setEditProfile(updatedProfile);
    }
  }, [userData, isEditing]);

  // Handler to switch to edit mode; copy the current profile to editProfile state.
  const handleEdit = () => {
    setIsEditing(true);
    setEditProfile(profile);
    setErrors({});
  };

  // Cancel editing and revert changes.
  const handleCancel = () => {
    setIsEditing(false);
    setEditProfile(profile);
    setErrors({});
  };

  // Validate and save the profile changes.
  const handleSave = () => {
    let newErrors = {};
    if (!editProfile.fullName) {
      newErrors.fullName = "Full name is required.";
    }
    if (!editProfile.address) {
      newErrors.address = "Address is required.";
    }
    if (!editProfile.telephone) {
      newErrors.telephone = "Telephone is required.";
    } else if (!/^\d+$/.test(editProfile.telephone)) {
      newErrors.telephone = "Telephone must be numeric.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Optionally, here you would also upload the image if editProfile.avatarFile exists.
    // // For demonstration purposes, we update our local profile state.
    // setProfile({
    //   ...profile,
    //   fullName: editProfile.fullName,
    //   address: editProfile.address,
    //   telephone: editProfile.telephone,
    //   profilePhoto: editProfile.profilePhoto,
    // });
    // updateUserData({
    //   name: editProfile.fullName,
    //   address: editProfile.address,
    //   phoneNumber: editProfile.telephone,
    //   profilePhoto: editProfile.profilePhoto,
    // })
    // Create a FormData instance to include the profile information and the file (if available)
  const formData = new FormData();
  formData.append("userId", localStorage.getItem("userId"));
  formData.append("name", editProfile.fullName);
  formData.append("address", editProfile.address);
  formData.append("phoneNumber", editProfile.telephone);

  // If a new file was selected, append it to the form data.
  if (editProfile.avatarFile) {
    formData.append("profilePhoto", editProfile.avatarFile);
  } else {
    // You may decide to send the current photo URL if no new file was chosen.
    // This depends on your backend implementation.
    formData.append("profilePhoto", editProfile.profilePhoto);
  }

  // Optionally update local state if you want to display the preview immediately.
  setProfile({
    ...profile,
    fullName: editProfile.fullName,
    address: editProfile.address,
    telephone: editProfile.telephone,
    profilePhoto: editProfile.profilePhoto,
  });

  // Call updateUserData with the FormData payload.
  updateUserData(formData);
    setIsEditing(false);
    setErrors({});
  };

  // Handle file selection for the avatar, creating a preview URL.
  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setEditProfile((prev) => ({
        ...prev,
        profilePhoto: previewUrl,
        // Store file if you plan to upload it later.
        avatarFile: file,
      }));
    }
  };

  // Handle change for password fields.
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields((prev) => ({ ...prev, [name]: value }));
  };

  // Validate and process the password change.
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!passwordFields.oldPassword) {
      newErrors.oldPassword = "Old password is required";
    }
    if (!passwordFields.newPassword) {
      newErrors.newPassword = "New password is required";
    }
    if (passwordFields.newPassword !== passwordFields.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call the changePassword method from the context.
    changePassword({
      oldPassword: passwordFields.oldPassword,
      newPassword: passwordFields.newPassword,
    });

    // Clear fields on success.
    setPasswordFields({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-16">
        {/* Profile Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Profile</h2>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
              >
                <FaEdit />
                <span>Edit</span>
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-col items-center">
            {/* Avatar */}
            <div className="relative">
              <img
                className="w-32 h-32 rounded-full object-cover"
                src={
                  isEditing
                    ? editProfile.profilePhoto || avatar
                    : userData.profilePhoto !== ""
                    ? userData.profilePhoto
                    : avatar
                }
                alt="User avatar"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarFileChange}
                  className="mt-2 p-2 border rounded w-64"
                />
              )}
            </div>

            {/* Profile Fields */}
            <div className="mt-4 w-full">
              {/* Full Name */}
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="fullName"
                      value={editProfile.fullName}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          fullName: e.target.value,
                        })
                      }
                      className="mt-1 w-full p-2 border rounded"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm">{errors.fullName}</p>
                    )}
                  </>
                ) : (
                  <p className="mt-1">{profile.fullName}</p>
                )}
              </div>
              {/* Email (Non-editable) */}
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <p className="mt-1">{profile.email}</p>
              </div>
              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="address"
                      value={editProfile.address}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          address: e.target.value,
                        })
                      }
                      className="mt-1 w-full p-2 border rounded"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">{errors.address}</p>
                    )}
                  </>
                ) : (
                  <p className="mt-1">{profile.address}</p>
                )}
              </div>
              {/* Telephone */}
              <div className="mb-4">
                <label className="block text-gray-700">Telephone</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="telephone"
                      value={editProfile.telephone}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          telephone: e.target.value,
                        })
                      }
                      className="mt-1 w-full p-2 border rounded"
                    />
                    {errors.telephone && (
                      <p className="text-red-500 text-sm">{errors.telephone}</p>
                    )}
                  </>
                ) : (
                  <p className="mt-1">{profile.telephone}</p>
                )}
              </div>
              {/* Edit Mode Buttons */}
              {isEditing && (
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 rounded flex items-center space-x-2 hover:bg-gray-400"
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded flex items-center space-x-2 hover:bg-blue-600"
                  >
                    <FaSave />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            {/* Old Password */}
            <div className="mb-4">
              <label className="block text-gray-700">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordFields.oldPassword}
                onChange={handlePasswordChange}
                className="mt-1 w-full p-2 border rounded"
              />
              {passwordErrors.oldPassword && (
                <p className="text-red-500 text-sm">
                  {passwordErrors.oldPassword}
                </p>
              )}
            </div>
            {/* New Password */}
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordFields.newPassword}
                onChange={handlePasswordChange}
                className="mt-1 w-full p-2 border rounded"
              />
              {passwordErrors.newPassword && (
                <p className="text-red-500 text-sm">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>
            {/* Confirm New Password */}
            <div className="mb-4">
              <label className="block text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                value={passwordFields.confirmNewPassword}
                onChange={handlePasswordChange}
                className="mt-1 w-full p-2 border rounded"
              />
              {passwordErrors.confirmNewPassword && (
                <p className="text-red-500 text-sm">
                  {passwordErrors.confirmNewPassword}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
