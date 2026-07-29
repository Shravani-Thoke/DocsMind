const supabase = require("../config/supabase");

const uploadPdfToSupabase = async (file, userId) => {
  const fileName = `${userId}/${Date.now()}-${file.originalname}`;

  const { error } = await supabase.storage
    .from("documents")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("documents")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

module.exports = {
  uploadPdfToSupabase,
};