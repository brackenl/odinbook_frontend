import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";

const UserAvatar = ({ user }) => {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    if (user) {
      setInitials(`${user.first_name[0]} ${user.last_name[0]}`);
    }
  }, [user]);

  return (
    <Avatar
      alt={`${user.first_name} ${user.last_name}`}
      src={user.profilePicUrl ? user.profilePicUrl : ""}
    >
      {user.profilePicUrl ? null : initials}
    </Avatar>
  );
};

export default UserAvatar;
