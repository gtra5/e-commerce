import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut, updateEmail } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Layout from "../result";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  LogOut,
  ShoppingBag,
  Heart,
  Settings,
} from "lucide-react";

const Profile = ({ cartItemCount }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const getFriendlyErrorMessage = (error) => {
    switch (error.code) {
      case "auth/requires-recent-login":
        return "Please sign in again to update your email.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      default:
        return error.message || "An error occurred.";
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        try {
          const userDoc = await getDoc(doc(db, "users", authUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setFormData({
              name: data.name || "",
              email: data.email || authUser.email || "",
              phone: data.phone || "",
              address: data.address || "",
            });
          } else {
            const defaultData = {
              name: authUser.displayName || "",
              email: authUser.email || "",
              phone: "",
              address: "",
              createdAt: new Date(),
              provider: authUser.providerData[0]?.providerId || "unknown",
            };
            await setDoc(doc(db, "users", authUser.uid), defaultData);
            setUserData(defaultData);
            setFormData(defaultData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to load user data");
        }
      } else {
        navigate("/signIn");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      setError(getFriendlyErrorMessage(error));
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setSaving(false);
      return;
    }

    if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone)) {
      setError("Please enter a valid phone number");
      setSaving(false);
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        updatedAt: new Date(),
      });

      if (formData.email !== user.email) {
        await updateEmail(user, formData.email);
      }

      setUserData({
        ...userData,
        ...formData,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(getFriendlyErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userData?.name || "",
      email: userData?.email || user?.email || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
    });
    setIsEditing(false);
    setError("");
  };

  if (loading) {
    return (
      <Layout cartItemCount={cartItemCount}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout cartItemCount={cartItemCount}>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-2xl">
                    {userData?.name?.charAt(0).toUpperCase() ||
                      user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {userData?.name || "User Profile"}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
                    aria-label="Edit profile"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm sm:text-base"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Profile Information
                </h2>

                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm sm:text-base">
                        {userData?.name || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm sm:text-base">
                        {userData?.email || user.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm sm:text-base">
                        {userData?.phone || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        rows={3}
                        className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                        placeholder="Enter your address"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm sm:text-base">
                        {userData?.address || "Not provided"}
                      </p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center justify-center space-x-2 px-4 py-2 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm sm:text-base"
                        aria-label="Save profile changes"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? "Saving..." : "Save Changes"}</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center justify-center space-x-2 px-4 py-2 sm:py-3 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm sm:text-base"
                        aria-label="Cancel editing"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <button
                    onClick={() => navigate("/cart")}
                    className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base"
                    aria-label="View cart"
                  >
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>My Orders</span>
                  </button>
                  <button
                    onClick={() => navigate("/favorites")}
                    className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base"
                    aria-label="View favorites"
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Favorites</span>
                  </button>
                  <button
                    onClick={() => navigate("/settings")}
                    className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base"
                    aria-label="View settings"
                  >
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Account Stats
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">Member Since</span>
                    <span className="text-gray-900 font-medium text-sm sm:text-base">
                      {user.metadata?.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">Last Sign In</span>
                    <span className="text-gray-900 font-medium text-sm sm:text-base">
                      {user.metadata?.lastSignInTime
                        ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;