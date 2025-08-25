import supabase from "./supabaseClient";

const TABLE = "items"; // 👈 make sure this matches your Supabase table name

export const api = {
  async update(id, fields) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(fields)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      alert("Failed to update item");
      return null;
    }

    return data;
  },

  async add(item) {
    const { data, error } = await supabase.from(TABLE).insert([item]).select();
    if (error) {
      console.error("Add error:", error);
      alert("Failed to add item");
      return null;
    }
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete item");
    }
  },

  async click(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .update({ clicks: supabase.rpc("increment_clicks", { row_id: id }) }) // optional if you have RPC
      .eq("id", id);
    if (error) console.error("Click error:", error);
    return data;
  },
};
