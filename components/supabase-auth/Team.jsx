import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Oval } from "react-loader-spinner";

export default function Team({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [driver1, setDriver1] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("teams")
        .select(`driver_1`)
        .eq("user_id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setDriver1(data.driver_1);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.user_id,
        driver_1: driver1,

        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("teams").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget px-4 py-6 border rounded">
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Driver 1
        </label>
        <input
          id="driver1"
          type="text"
          value={driver1 || ""}
          onChange={(e) => setDriver1(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="website"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Website
        </label>
        <input
          id="website"
          type="website"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex gap-2">
        <button
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
        <button
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 px-4 py-2"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          <span>
            {loading ? (
              <Oval
                height={20}
                width={20}
                color="#ffffff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#2a2b2a"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : (
              "Update"
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
