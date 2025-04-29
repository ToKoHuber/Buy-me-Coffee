"use client";

export const imageUpload = async (file: File | null) => {
  if (!file) {
    alert("Please select a file");
    return;
  }

  const PRESET_NAME = "buyme-coffee";
  const CLOUDINARY_NAME = "daevsbyyv";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", PRESET_NAME);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    return data.secure_url;
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Failed to upload file");
  }
};
