import React from "react";

const VkVideo = () => {
  return (
    <div className="flex justify-center">
      <iframe
        src="https://vk.com/video_ext.php?oid=-157043765&id=456243392&hash=334f63b8829166dc&autoplay=1"
        width={426}
        height={240}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock"
        frameBorder={0} // JSX uses camelCase
        allowFullScreen
        className="rounded-lg shadow-lg"
        title="VK Video"
      ></iframe>
    </div>
  );
};

export default VkVideo;
