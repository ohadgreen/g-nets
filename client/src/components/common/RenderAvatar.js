import React from "react";
import "./Avatar.css";

export const RenderAvatar = user => {
  const { username, avatar } = user.user;
  let playerAvatar = (
    <div className="avatar-main">
      <div className="avatar-img">
      {getAvatarImage(avatar)}
      </div>
      <div className="avatar-name">{username}</div>
    </div>
  );
  return playerAvatar;
};

export const RenderAvatarImageOnly = avatar => {
  return (
    <div className="avatar-img-only">{getAvatarImage(avatar.avatar)}</div>
  )
};

function getAvatarImage(avatarName) {
  return (
    <img
      src={require("../../resources/images/avatars/" + avatarName + ".jpg")}
      alt={avatarName}
    />
  );
}
