import apiClient from "./api-client";

export const updateVideo = ({ videoId, title, description, category, thumbnail }) => {
  const formData = new FormData();

  formData.append(
    "videoInfo",
    JSON.stringify({
      title,
      description,
      category,
    })
  );

  if (thumbnail) {
    formData.append("thumbnail", thumbnail);
  }

  return apiClient.put(`/videos/${videoId}`, formData);
};
